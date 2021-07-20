import * as fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import { ABIParameter } from '../types';
import { EstimateGasReq, BuildTxRequest } from '../services/ethereum_pb';
import { clientCallClient } from './proto';
import { deployUnsignedTx, deployGanacheTx } from './deployUnsignedTransaction';

// create constructor input file
function writeConstrucor(path: string, inputs: Array<ABIParameter>) {
  fs.writeFileSync(`${path}/constructor-input.json`, JSON.stringify(inputs, null, 2));
}

process.on('message', async (m) => {
  const meta = new grpc.Metadata();
  // Fetch accounts and balance
  if (m.command === 'get-accounts') {
    const c = {
      networkid: m.testnetId,
    };
    clientCallClient.GetGanacheAccounts(c, meta, (err: any, response: any) => {
      if (err) {
        console.log('err', err);
        // @ts-ignore
        process.send({ error: err });
      } else {
        // @ts-ignore
        process.send({ accounts: response.accounts, balance: response.balance });
      }
    });
  }
  // send wei value to address in other testnets
  if (m.command === 'send-ether-signed') {
    const { transactionInfo, pvtKey } = m.payload;
    const c = {
      callInterface: {
        command: 'build-raw-eth-tx',
        payload: JSON.stringify(transactionInfo),
        testnetId: m.testnetId,
      },
    };
    const call = clientCallClient.RunDeploy(c, meta, (err: any) => {
      if (err) {
        console.error('err', err);
        // @ts-ignore
        process.send({ error: err });
        // @ts-ignore
        process.exit(1);
      }
    });
    call.on('data', (data: any) => {
      // @ts-ignore
      process.send({ unsignedTx: data.result });
      deployUnsignedTx(meta, data.result, pvtKey, m.testnetId);
    });
    call.on('error', (err: Error) => {
      // @ts-ignore
      process.send({ error: err });
      // @ts-ignore
      process.exit(1);
    });
  }
  // send wei_value to a address
  if (m.command === 'send-ether') {
    const { transactionInfo } = m;
    const c = {
      callInterface: {
        command: 'send-ether',
        payload: JSON.stringify(transactionInfo),
        testnetId: m.testnetId,
      },
    };
    const call = clientCallClient.RunDeploy(c, meta, (err: any, response: any) => {
      if (err) {
        // @ts-ignore
        process.send({ error: err });
        // @ts-ignore
        process.exit(1);
      } else {
        // @ts-ignore
        process.send({ response });
      }
    });
    call.on('data', (data: any) => {
      // @ts-ignore
      process.send({ transactionResult: data.result });
    });
  }
  // fetch balance of an account
  if (m.command === 'get-balance') {
    const hashAddr = m.account;
    const c = {
      networkid: m.testnetId,
      address: hashAddr,
    };
    clientCallClient.GetBalance(c, meta, (err: any, response: any) => {
      if (err) {
        // @ts-ignore
        process.send({ error: err });
      } else {
        // @ts-ignore
        process.send({ balance: response.balance });
      }
    });
  }
  // Method call
  if (m.command === 'ganache-contract-method-call') {
    const { from, abi, address, methodName, params, gasSupply, deployAccount, value } = m.payload;
    const inp = {
      from,
      abi,
      address,
      methodName,
      params,
      gasSupply: typeof gasSupply === 'string' ? parseInt(gasSupply, 10) : gasSupply,
      deployAccount,
      value,
    };
    const c = {
      callInterface: {
        command: 'ganache-contract-method-call',
        payload: JSON.stringify(inp),
        testnetId: m.testnetId,
      },
    };
    const call = clientCallClient.RunDeploy(c, meta, (err: any, response: any) => {
      if (err) {
        console.log('err', err);
      } else {
        // @ts-ignore
        process.send({ response });
      }
    });
    call.on('data', (data: any) => {
      // @ts-ignore
      process.send({ callResult: data.result });
    });
    call.on('end', () => {
      process.exit(0);
    });
    call.on('error', (err: Error) => {
      // @ts-ignore
      process.send({ error: err });
    });
  }

  // testnet method call
  if (m.command === 'contract-method-call') {
    const { from, abi, address, methodName, params, gasSupply, value } = m.payload;
    const inp = {
      from,
      abi,
      address,
      methodName,
      params,
      gasSupply: typeof gasSupply === 'string' ? parseInt(gasSupply, 10) : gasSupply,
      value,
    };
    const c = {
      callInterface: {
        command: 'contract-method-call',
        payload: JSON.stringify(inp),
        testnetId: m.testnetId,
      },
    };
    const call = clientCallClient.RunDeploy(c, meta, (err: any) => {
      if (err) {
        // @ts-ignore
        process.send({ error: err });
      }
    });
    call.on('data', (data: any) => {
      // @ts-ignore
      process.send({ callResult: data.result });
      // TODO: only send to unsignedTx is data.result is a transaction
      // @ts-ignore
      process.send({ unsignedTx: data.result });
    });
    call.on('end', () => {
      process.exit(0);
    });
    call.on('error', (err: Error) => {
      // @ts-ignore
      process.send({ error: err });
    });
  }
  // Gas Estimate
  if (m.command === 'get-gas-estimate') {
    const { abi, bytecode, params, from } = m.payload;
    const c = new EstimateGasReq();
    c.setNetworkid(m.testnetId);
    c.setAbi(JSON.stringify(abi));
    c.setBytecode(bytecode);
    c.setParams(JSON.stringify(params));
    c.setFromaddress(from);
    c.setValue(0);
    console.log(c.toObject());
    clientCallClient.EstimateGas(c.toObject(), meta, (err: any, response: any) => {
      if (err) {
        // @ts-ignore
        process.send({ error: err });
      } else {
        // @ts-ignore
        process.send({ gasEstimate: response.result });
      }
    });
  }
  // Build raw transaction for contract creation
  if (m.command === 'build-rawtx') {
    const { abi, bytecode, params, gasSupply, from } = m.payload;
    const c = new BuildTxRequest();
    c.setNetworkid(m.testnetId);
    c.setAbi(JSON.stringify(abi));
    c.setBytecode(bytecode);
    c.setParams(JSON.stringify(params));
    c.setFromaddress(from);
    c.setGas(gasSupply);
    c.setValue(0);
    clientCallClient.BuildRawTransaction(c.toObject(), meta, (err: any, response: any) => {
      if (err) {
        console.error('err', err);
        // @ts-ignore
        process.send({ error: err });
      } else {
        // @ts-ignore
        process.send({ buildTxResult: response.transaction });
      }
    });
  }
  // sign and deploy unsigned transaction
  if (m.command === 'sign-deploy') {
    const { unsignedTx, pvtKey } = m.payload;
    deployUnsignedTx(meta, unsignedTx, pvtKey, m.testnetId);
  }
  // Deploy
  if (m.command === 'deploy-contract') {
    deployGanacheTx(meta, m.payload);
  }
  if (m.command === 'create-input-file') {
    const { inputs, path } = m.payload;
    writeConstrucor(path, inputs);
  }
});
