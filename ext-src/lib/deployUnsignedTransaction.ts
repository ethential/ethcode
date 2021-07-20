import { sha3 } from '../hash/sha3';
import { clientCallClient } from './proto';
import { SendTxRequest, BuildTxRequest } from '../services/ethereum_pb';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EthereumTx = require('ethereumjs-tx').Transaction;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { formatters } = require('web3-core-helpers');

// sign raw transaction and deploy
export function deployUnsignedTx(meta: any, tx: string, privateKey: string, testnetId: number) {
  try {
    // eslint-disable-next-line no-param-reassign
    tx = JSON.parse(tx);
    const txData = formatters.inputTransactionFormatter(tx);
    const chainId = Number(testnetId);
    const unsignedTransaction = new EthereumTx(
      {
        from: txData.from || '0x',
        nonce: txData.nonce || '0x',
        gasPrice: txData.gasPrice,
        gas: txData.gas || '0x',
        to: txData.to || '0x',
        value: txData.value || '0x',
        data: txData.data || '0x',
      },
      { chain: chainId }
    );
    const pvtk = Buffer.from(privateKey, 'hex');
    unsignedTransaction.sign(pvtk);
    const rlpEncoded = unsignedTransaction.serialize().toString('hex');
    const rawTransaction = `0x${rlpEncoded}`;
    const transactionHash = sha3(rawTransaction);
    // @ts-ignore
    process.send({ responses: transactionHash });
    const c = new SendTxRequest();
    c.setNetworkid(testnetId);
    c.setTx(rawTransaction);
    const call = clientCallClient.SendRawTransactions(c.toObject(), meta, (err: any) => {
      if (err) {
        console.error(err);
      }
    });

    call.on('data', (data: any) => {
      // @ts-ignore
      process.send({ transactionResult: data.result });
    });
    call.on('error', (err: Error) => {
      // @ts-ignore
      process.send({ error: err });
    });
  } catch (error) {
    console.log(error);
    // @ts-ignore
    process.send({ error: error.message });
  }
}

// deploy to ganache network
export function deployGanacheTx(meta: any, tx: any) {
  const { from, abi, bytecode, params, gas } = tx;
  const c = new BuildTxRequest();
  c.setNetworkid(0);
  c.setAbi(JSON.stringify(abi));
  c.setBytecode(bytecode);
  c.setParams(JSON.stringify(params));
  c.setFromaddress(from);
  c.setGas(gas);
  c.setValue(0);
  const call = clientCallClient.Transact(c.toObject(), meta, (err: any, response: any) => {
    if (err) {
      // @ts-ignore
      process.send({ error: err });
    } else {
      // @ts-ignore
      process.send({ response });
    }
  });
  call.on('data', (data: any) => {
    // @ts-ignore
    process.send({ deployedResult: data.result });
  });
  call.on('end', () => {
    process.exit(0);
  });
  call.on('error', (err: Error) => {
    // @ts-ignore
    process.send({ error: err });
  });
}
