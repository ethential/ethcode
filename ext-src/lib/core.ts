import { window, ExtensionContext, InputBoxOptions } from 'vscode';

import Logger from '../utils/logger';
import {
  StandardJSONOutput,
  IStandardJSONContractsQP,
  StandardCompiledContract,
  isStdContract,
  CombinedJSONOutput,
  isComContract,
  ICombinedJSONContractsQP,
  CombinedCompiledContract,
  ConstructorInputValue,
} from '../types';
import { createWorker, createAccWorker } from './workerCreator';

// Create logger
const logger = new Logger();
const pwdInpOpt: InputBoxOptions = {
  ignoreFocusOut: true,
  password: true,
  placeHolder: 'Password',
};

// Parse Standard JSON payload
export function parseJSONPayload(context: ExtensionContext, _jsonPayload: any): void {
  try {
    const { contracts }: StandardJSONOutput = JSON.parse(_jsonPayload);
    const quickPick = window.createQuickPick<IStandardJSONContractsQP>();
    quickPick.items = Object.keys(contracts).map((contract) => ({ label: contract, contractKey: contract }));
    quickPick.placeholder = 'Select contract file';
    quickPick.onDidChangeActive((selection: Array<IStandardJSONContractsQP>) => {
      quickPick.value = selection[0].label;
    });
    quickPick.onDidChangeSelection((selection: Array<IStandardJSONContractsQP>) => {
      if (selection[0]) {
        const contractFileName = selection[0].contractKey;
        const contractFile = contracts[contractFileName];
        if (!isStdContract(contractFile)) {
          const contractQp = window.createQuickPick<IStandardJSONContractsQP>();
          contractQp.items = Object.keys(contractFile).map((contract) => ({
            label: contract,
            contractKey: contract,
          }));
          contractQp.placeholder = 'Select contract';
          contractQp.onDidChangeActive((selection: Array<IStandardJSONContractsQP>) => {
            contractQp.value = selection[0].label;
          });
          contractQp.onDidChangeSelection((selection: Array<IStandardJSONContractsQP>) => {
            if (selection[0]) {
              const contract: StandardCompiledContract = contracts[contractFileName][selection[0].contractKey];
              if (isStdContract(contract)) {
                context.workspaceState.update('contract', contract);
                logger.log('Contract loaded!');
              } else {
                logger.error(Error('Could not parse contract.'));
              }
              contractQp.dispose();
            }
          });
          contractQp.onDidHide(() => contractQp.dispose());
          contractQp.show();
        } else {
          logger.error(Error('Could not parse contract.'));
        }
        quickPick.dispose();
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  } catch (error) {
    logger.error(
      Error(
        'Could not load JSON file. Make sure it follows Solidity output description. Know more: https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description.'
      )
    );
  }
}

// Parse Combined JSON payload
export function parseCombinedJSONPayload(context: ExtensionContext, _jsonPayload: any): void {
  if (_jsonPayload) {
    const { contracts }: CombinedJSONOutput = JSON.parse(_jsonPayload);
    const quickPick = window.createQuickPick<ICombinedJSONContractsQP>();
    quickPick.items = Object.keys(contracts).map((contract) => ({ label: contract, contractKey: contract }));
    quickPick.placeholder = 'Select contract';
    quickPick.onDidChangeActive((selection: Array<ICombinedJSONContractsQP>) => {
      quickPick.value = selection[0].label;
    });
    quickPick.onDidChangeSelection((selection: Array<ICombinedJSONContractsQP>) => {
      if (selection[0]) {
        const contract: CombinedCompiledContract = contracts[selection[0].contractKey];
        if (isComContract(contract)) {
          context.workspaceState.update('contract', contract);
          logger.log('Contract loaded!');
        } else {
          logger.error(Error('Could not parse contract.'));
        }
        quickPick.dispose();
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  } else {
    logger.error(
      Error(
        'Could not load JSON file. Make sure it follows Solidity output description. Know more: https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description.'
      )
    );
  }
}

// Estimate Transaction Gas
export function estimateTransactionGas(context: ExtensionContext): Promise<number> {
  return new Promise((resolve, reject) => {
    const networkId = context.workspaceState.get('networkId');
    const account: string | undefined = context.workspaceState.get('account');
    const contract = context.workspaceState.get('contract');
    const params: Array<ConstructorInputValue> | undefined = context.workspaceState.get('constructor-inputs');
    let payload = {};
    if (isComContract(contract)) {
      const { abi, bin } = contract;
      payload = {
        abi,
        bytecode: bin,
        params: params || [],
        from: account,
      };
    } else if (isStdContract(contract)) {
      const { abi, evm } = contract;
      payload = {
        abi,
        bytecode: evm.bytecode.object,
        params: params || [],
        from: account,
      };
    }
    const txWorker = createWorker();
    txWorker.on('message', (m: any) => {
      if (m.error) {
        logger.error(m.error);
        reject(m.error);
      } else {
        context.workspaceState.update('gasEstimate', m.gasEstimate);
        logger.log(m.gasEstimate);
        resolve(m.gasEstimate);
      }
    });
    logger.log('Transaction payload');
    logger.log(JSON.stringify(payload, null, 2));
    txWorker.send({
      command: 'get-gas-estimate',
      payload,
      testnetId: networkId,
    });
  });
}

// Ganache deploy
export function ganacheDeploy(context: ExtensionContext): Promise<any> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const testNetId = context.workspaceState.get('networkId');
        const account = context.workspaceState.get('account');
        const contract = context.workspaceState.get('contract');
        const params: Array<ConstructorInputValue> | undefined = context.workspaceState.get('constructor-inputs');
        const gas: number | undefined = context.workspaceState.get('gasEstimate');
        let payload = {};
        if (isComContract(contract)) {
          const { abi, bin } = contract;
          payload = {
            abi,
            bytecode: bin,
            params: params || [],
            from: account,
            gas,
          };
        } else if (isStdContract(contract)) {
          const { abi, evm } = contract;
          payload = {
            abi,
            bytecode: evm.bytecode.object,
            params: params || [],
            from: account,
            gas,
          };
        }
        const deployWorker = createWorker();
        deployWorker.on('message', (m: any) => {
          logger.log(`SignDeploy worker message: ${JSON.stringify(m)}`);
          if (m.error) {
            logger.error(m.error);
          } else if (m.transactionResult) {
            logger.log('Contract transaction submitted!');
            resolve(m.transactionResult);
          }
        });

        deployWorker.send({
          command: 'deploy-contract',
          payload,
          testnetId: testNetId,
        });
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    })();
  });
}

export function signDeploy(context: ExtensionContext): Promise<any> {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const testNetId = context.workspaceState.get('networkId');
        const account = context.workspaceState.get('account');
        const unsignedTx = context.workspaceState.get('unsignedTx');
        const password = await window.showInputBox(pwdInpOpt);
        const accWorker = createAccWorker();
        const signedDeployWorker = createWorker();
        accWorker.on('message', (m: any) => {
          if (m.privateKey) {
            const { privateKey } = m;
            signedDeployWorker.on('message', (m: any) => {
              logger.log(`SignDeploy worker message: ${JSON.stringify(m)}`);
              if (m.error) {
                logger.error(m.error);
                reject(m.error);
              } else if (m.transactionResult) {
                logger.success('Contract transaction submitted!');
                resolve(m.transactionResult);
              }
            });
            signedDeployWorker.send({
              command: 'sign-deploy',
              payload: {
                unsignedTx,
                pvtKey: privateKey,
              },
              testnetId: testNetId,
            });
          } else if (m.error) {
            logger.error(m.error);
            reject(m.error);
          }
        });
        accWorker.send({
          command: 'extract-privateKey',
          address: account,
          keyStorePath: context.extensionPath,
          password: password || '',
        });
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    })();
  });
}
