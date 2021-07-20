import { QuickPickItem } from 'vscode';
import { StandardCompiledContract, CombinedCompiledContract, ABIParameter, StandardJSONOutput } from './output';

export interface ISource {
  content: string | undefined;
}

export interface ISources {
  [key: string]: ISource;
}

export interface IAccount {
  label: string;
  value: string;
  pubAddr?: string;
  checksumAddr?: string;
}

export interface Account {
  pubAddr: string;
  checksumAddr: string;
}

export type LocalAddressType = {
  pubAddress: string;
  checksumAddress: string;
};

export type GanacheAddressType = [string];

export interface TokenData {
  appId?: string;
  token?: string;
  email?: string;
}

export interface ICompilationResult {
  source: {
    target: string;
    sources: ISources;
  };
  data: any;
}

export interface INetworkQP extends QuickPickItem {
  networkId: number | string;
}

export interface IAccountQP extends QuickPickItem {
  checksumAddr: string;
}

export interface ICombinedJSONContractsQP extends QuickPickItem {
  contractKey: string;
}

export interface IStandardJSONContractsQP extends QuickPickItem {
  contractKey: string;
}

export interface ConstructorInputValue extends ABIParameter {
  value: string;
}

// Typeguard

export function isStdContract(obj: any): obj is StandardCompiledContract {
  return obj.abi !== undefined && obj.evm !== undefined;
}

export function isComContract(obj: any): obj is CombinedCompiledContract {
  return obj.abi !== undefined && obj.bin !== undefined;
}

export function isConstructorInputValue(obj: any): obj is ConstructorInputValue {
  return obj.value !== undefined;
}

export function isStdJSONOutput(obj: any): obj is StandardJSONOutput {
  return obj.contracts !== undefined;
}
