/* eslint no-unused-vars: 0 */

import { createContext } from 'react';
import { CompilationResult, GroupedSelectorAccounts, TransactionResult, CompiledContract, ABIParameter } from './types';

interface ContextInterface {
  unsignedTx: string | undefined;
  setUnsgTxn: (_value: string | undefined) => void;
  pvtKey: string | undefined;
  setPvtKey: (_value: string | undefined) => void;
  currAccount: string | undefined;
  setAccount: (_value: string | undefined) => void;
  accountBalance: number;
  setAccountBalance: (_value: number) => void;
  accounts: Array<GroupedSelectorAccounts> | undefined;
  setSelectorAccounts: (_value: Array<GroupedSelectorAccounts> | undefined) => void;
  compiledJSON: CompilationResult | undefined;
  setCompiledJSON: (_value: CompilationResult | undefined) => void;
  contract: CompiledContract | undefined;
  setCompiledContract: (_value: CompiledContract | undefined) => void;
  constructorInputs: Array<ABIParameter> | undefined;
  setConstructorInputs: (_value: Array<ABIParameter> | undefined) => void;
  activeFileName: string;
  setActiveFileName: (_value: string) => void;
  testNetID: string;
  setTestNetID: (_value: string) => void;
  callResult: { [key: string]: string } | undefined;
  setCallResult: (_value: { [key: string]: string } | undefined) => void;
  deployedResult: TransactionResult | undefined;
  setDeployedResult: (_value: TransactionResult | undefined) => void;
  error: Error | undefined;
  setError: (_value: Error | undefined) => void;
}
export const AppContext = createContext<ContextInterface>({
  unsignedTx: undefined,
  setUnsgTxn: (_value: string | undefined) => {},
  pvtKey: undefined,
  setPvtKey: (_value: string | undefined) => {},
  currAccount: undefined,
  setAccount: (_value: string | undefined) => {},
  accountBalance: 0,
  setAccountBalance: (_value: number) => {},
  accounts: [],
  setSelectorAccounts: (_value: Array<GroupedSelectorAccounts> | undefined) => {},
  compiledJSON: undefined,
  setCompiledJSON: (_value: CompilationResult | undefined) => {},
  contract: undefined,
  setCompiledContract: (_value: CompiledContract | undefined) => {},
  constructorInputs: undefined,
  setConstructorInputs: (_value: Array<ABIParameter> | undefined) => {},
  activeFileName: '',
  setActiveFileName: (_value: string) => {},
  testNetID: 'ganache',
  setTestNetID: (_value: string) => {},
  callResult: {},
  setCallResult: (_value: { [key: string]: string } | undefined) => {},
  deployedResult: undefined,
  setDeployedResult: (_value: TransactionResult | undefined) => {},
  error: undefined,
  setError: (_value: Error | undefined) => {},
});
