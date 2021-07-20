// package: protoeth
// file: services/ethereum.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GetAccountsReq extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountsReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountsReq): GetAccountsReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountsReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountsReq;
  static deserializeBinaryFromReader(message: GetAccountsReq, reader: jspb.BinaryReader): GetAccountsReq;
}

export namespace GetAccountsReq {
  export type AsObject = {
  }
}

export class TestnetReq extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestnetReq.AsObject;
  static toObject(includeInstance: boolean, msg: TestnetReq): TestnetReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestnetReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestnetReq;
  static deserializeBinaryFromReader(message: TestnetReq, reader: jspb.BinaryReader): TestnetReq;
}

export namespace TestnetReq {
  export type AsObject = {
    id: number,
  }
}

export class HashStringOrNumber extends jspb.Message {
  getReqstring(): string;
  setReqstring(value: string): void;

  getReqnum(): number;
  setReqnum(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HashStringOrNumber.AsObject;
  static toObject(includeInstance: boolean, msg: HashStringOrNumber): HashStringOrNumber.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HashStringOrNumber, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HashStringOrNumber;
  static deserializeBinaryFromReader(message: HashStringOrNumber, reader: jspb.BinaryReader): HashStringOrNumber;
}

export namespace HashStringOrNumber {
  export type AsObject = {
    reqstring: string,
    reqnum: number,
  }
}

export class InfoWithIndex extends jspb.Message {
  hasReq(): boolean;
  clearReq(): void;
  getReq(): HashStringOrNumber | undefined;
  setReq(value?: HashStringOrNumber): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InfoWithIndex.AsObject;
  static toObject(includeInstance: boolean, msg: InfoWithIndex): InfoWithIndex.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InfoWithIndex, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InfoWithIndex;
  static deserializeBinaryFromReader(message: InfoWithIndex, reader: jspb.BinaryReader): InfoWithIndex;
}

export namespace InfoWithIndex {
  export type AsObject = {
    req?: HashStringOrNumber.AsObject,
    index: number,
  }
}

export class CountResp extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountResp.AsObject;
  static toObject(includeInstance: boolean, msg: CountResp): CountResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountResp;
  static deserializeBinaryFromReader(message: CountResp, reader: jspb.BinaryReader): CountResp;
}

export namespace CountResp {
  export type AsObject = {
    count: number,
  }
}

export class ObjResp extends jspb.Message {
  getRespobj(): string;
  setRespobj(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ObjResp.AsObject;
  static toObject(includeInstance: boolean, msg: ObjResp): ObjResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ObjResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ObjResp;
  static deserializeBinaryFromReader(message: ObjResp, reader: jspb.BinaryReader): ObjResp;
}

export namespace ObjResp {
  export type AsObject = {
    respobj: string,
  }
}

export class GetBalanceReq extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBalanceReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetBalanceReq): GetBalanceReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBalanceReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBalanceReq;
  static deserializeBinaryFromReader(message: GetBalanceReq, reader: jspb.BinaryReader): GetBalanceReq;
}

export namespace GetBalanceReq {
  export type AsObject = {
    networkid: number,
    address: string,
  }
}

export class GetBalanceResp extends jspb.Message {
  getBalance(): string;
  setBalance(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBalanceResp.AsObject;
  static toObject(includeInstance: boolean, msg: GetBalanceResp): GetBalanceResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBalanceResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBalanceResp;
  static deserializeBinaryFromReader(message: GetBalanceResp, reader: jspb.BinaryReader): GetBalanceResp;
}

export namespace GetBalanceResp {
  export type AsObject = {
    balance: string,
  }
}

export class CreateRawTransactionReq extends jspb.Message {
  getTo(): string;
  setTo(value: string): void;

  getData(): string;
  setData(value: string): void;

  getGas(): number;
  setGas(value: number): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRawTransactionReq.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRawTransactionReq): CreateRawTransactionReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRawTransactionReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRawTransactionReq;
  static deserializeBinaryFromReader(message: CreateRawTransactionReq, reader: jspb.BinaryReader): CreateRawTransactionReq;
}

export namespace CreateRawTransactionReq {
  export type AsObject = {
    to: string,
    data: string,
    gas: number,
    value: number,
  }
}

export class CreateRawTransactionResp extends jspb.Message {
  getRawtx(): string;
  setRawtx(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRawTransactionResp.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRawTransactionResp): CreateRawTransactionResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRawTransactionResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRawTransactionResp;
  static deserializeBinaryFromReader(message: CreateRawTransactionResp, reader: jspb.BinaryReader): CreateRawTransactionResp;
}

export namespace CreateRawTransactionResp {
  export type AsObject = {
    rawtx: string,
  }
}

export class DeploySignedTransactionReq extends jspb.Message {
  getSignedtx(): string;
  setSignedtx(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeploySignedTransactionReq.AsObject;
  static toObject(includeInstance: boolean, msg: DeploySignedTransactionReq): DeploySignedTransactionReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeploySignedTransactionReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeploySignedTransactionReq;
  static deserializeBinaryFromReader(message: DeploySignedTransactionReq, reader: jspb.BinaryReader): DeploySignedTransactionReq;
}

export namespace DeploySignedTransactionReq {
  export type AsObject = {
    signedtx: string,
  }
}

export class DeploySignedTransactionResp extends jspb.Message {
  getTxreciept(): string;
  setTxreciept(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeploySignedTransactionResp.AsObject;
  static toObject(includeInstance: boolean, msg: DeploySignedTransactionResp): DeploySignedTransactionResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeploySignedTransactionResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeploySignedTransactionResp;
  static deserializeBinaryFromReader(message: DeploySignedTransactionResp, reader: jspb.BinaryReader): DeploySignedTransactionResp;
}

export namespace DeploySignedTransactionResp {
  export type AsObject = {
    txreciept: string,
  }
}

export class BuildTxRequest extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getAbi(): string;
  setAbi(value: string): void;

  getBytecode(): string;
  setBytecode(value: string): void;

  getParams(): string;
  setParams(value: string): void;

  getFromaddress(): string;
  setFromaddress(value: string): void;

  getGas(): number;
  setGas(value: number): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BuildTxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BuildTxRequest): BuildTxRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BuildTxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BuildTxRequest;
  static deserializeBinaryFromReader(message: BuildTxRequest, reader: jspb.BinaryReader): BuildTxRequest;
}

export namespace BuildTxRequest {
  export type AsObject = {
    networkid: number,
    abi: string,
    bytecode: string,
    params: string,
    fromaddress: string,
    gas: number,
    value: number,
  }
}

export class SendTxRequest extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getTx(): string;
  setTx(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendTxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendTxRequest): SendTxRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendTxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendTxRequest;
  static deserializeBinaryFromReader(message: SendTxRequest, reader: jspb.BinaryReader): SendTxRequest;
}

export namespace SendTxRequest {
  export type AsObject = {
    networkid: number,
    tx: string,
  }
}

export class RawTransaction extends jspb.Message {
  getTransaction(): string;
  setTransaction(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RawTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: RawTransaction): RawTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RawTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RawTransaction;
  static deserializeBinaryFromReader(message: RawTransaction, reader: jspb.BinaryReader): RawTransaction;
}

export namespace RawTransaction {
  export type AsObject = {
    transaction: string,
  }
}

export class TxHash extends jspb.Message {
  getTxhash(): string;
  setTxhash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxHash.AsObject;
  static toObject(includeInstance: boolean, msg: TxHash): TxHash.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxHash, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxHash;
  static deserializeBinaryFromReader(message: TxHash, reader: jspb.BinaryReader): TxHash;
}

export namespace TxHash {
  export type AsObject = {
    txhash: string,
  }
}

export class TransactionInfo extends jspb.Message {
  getTransaction(): string;
  setTransaction(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionInfo): TransactionInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionInfo;
  static deserializeBinaryFromReader(message: TransactionInfo, reader: jspb.BinaryReader): TransactionInfo;
}

export namespace TransactionInfo {
  export type AsObject = {
    transaction: string,
  }
}

export class TxReceipt extends jspb.Message {
  getTxreceipt(): string;
  setTxreceipt(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxReceipt.AsObject;
  static toObject(includeInstance: boolean, msg: TxReceipt): TxReceipt.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxReceipt, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxReceipt;
  static deserializeBinaryFromReader(message: TxReceipt, reader: jspb.BinaryReader): TxReceipt;
}

export namespace TxReceipt {
  export type AsObject = {
    txreceipt: string,
  }
}

export class BlockNumber extends jspb.Message {
  getBlocknum(): number;
  setBlocknum(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockNumber.AsObject;
  static toObject(includeInstance: boolean, msg: BlockNumber): BlockNumber.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockNumber, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockNumber;
  static deserializeBinaryFromReader(message: BlockNumber, reader: jspb.BinaryReader): BlockNumber;
}

export namespace BlockNumber {
  export type AsObject = {
    blocknum: number,
  }
}

export class TxResponse extends jspb.Message {
  getTxdata(): string;
  setTxdata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TxResponse): TxResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxResponse;
  static deserializeBinaryFromReader(message: TxResponse, reader: jspb.BinaryReader): TxResponse;
}

export namespace TxResponse {
  export type AsObject = {
    txdata: string,
  }
}

export class NumResult extends jspb.Message {
  getResultnum(): number;
  setResultnum(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NumResult.AsObject;
  static toObject(includeInstance: boolean, msg: NumResult): NumResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NumResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NumResult;
  static deserializeBinaryFromReader(message: NumResult, reader: jspb.BinaryReader): NumResult;
}

export namespace NumResult {
  export type AsObject = {
    resultnum: number,
  }
}

export class GetTxReq extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getTxhash(): string;
  setTxhash(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTxReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetTxReq): GetTxReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTxReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTxReq;
  static deserializeBinaryFromReader(message: GetTxReq, reader: jspb.BinaryReader): GetTxReq;
}

export namespace GetTxReq {
  export type AsObject = {
    networkid: number,
    txhash: string,
  }
}

export class CallRequest extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getFn(): string;
  setFn(value: string): void;

  getParams(): string;
  setParams(value: string): void;

  getAbi(): string;
  setAbi(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getFromAddress(): string;
  setFromAddress(value: string): void;

  getValue(): number;
  setValue(value: number): void;

  getGas(): number;
  setGas(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CallRequest): CallRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallRequest;
  static deserializeBinaryFromReader(message: CallRequest, reader: jspb.BinaryReader): CallRequest;
}

export namespace CallRequest {
  export type AsObject = {
    networkid: number,
    fn: string,
    params: string,
    abi: string,
    address: string,
    fromAddress: string,
    value: number,
    gas: number,
  }
}

export class CallResponse extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CallResponse): CallResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallResponse;
  static deserializeBinaryFromReader(message: CallResponse, reader: jspb.BinaryReader): CallResponse;
}

export namespace CallResponse {
  export type AsObject = {
    result: string,
  }
}

export class EstimateGasReq extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  getAbi(): string;
  setAbi(value: string): void;

  getBytecode(): string;
  setBytecode(value: string): void;

  getParams(): string;
  setParams(value: string): void;

  getFromaddress(): string;
  setFromaddress(value: string): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimateGasReq.AsObject;
  static toObject(includeInstance: boolean, msg: EstimateGasReq): EstimateGasReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EstimateGasReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimateGasReq;
  static deserializeBinaryFromReader(message: EstimateGasReq, reader: jspb.BinaryReader): EstimateGasReq;
}

export namespace EstimateGasReq {
  export type AsObject = {
    networkid: number,
    abi: string,
    bytecode: string,
    params: string,
    fromaddress: string,
    value: number,
  }
}

export class EstimateGasResp extends jspb.Message {
  getResult(): string;
  setResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimateGasResp.AsObject;
  static toObject(includeInstance: boolean, msg: EstimateGasResp): EstimateGasResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EstimateGasResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimateGasResp;
  static deserializeBinaryFromReader(message: EstimateGasResp, reader: jspb.BinaryReader): EstimateGasResp;
}

export namespace EstimateGasResp {
  export type AsObject = {
    result: string,
  }
}

export class GanacheAccReq extends jspb.Message {
  getNetworkid(): number;
  setNetworkid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GanacheAccReq.AsObject;
  static toObject(includeInstance: boolean, msg: GanacheAccReq): GanacheAccReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GanacheAccReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GanacheAccReq;
  static deserializeBinaryFromReader(message: GanacheAccReq, reader: jspb.BinaryReader): GanacheAccReq;
}

export namespace GanacheAccReq {
  export type AsObject = {
    networkid: number,
  }
}

export class GanacheAccRsp extends jspb.Message {
  clearAccountsList(): void;
  getAccountsList(): Array<string>;
  setAccountsList(value: Array<string>): void;
  addAccounts(value: string, index?: number): string;

  getBalance(): string;
  setBalance(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GanacheAccRsp.AsObject;
  static toObject(includeInstance: boolean, msg: GanacheAccRsp): GanacheAccRsp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GanacheAccRsp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GanacheAccRsp;
  static deserializeBinaryFromReader(message: GanacheAccRsp, reader: jspb.BinaryReader): GanacheAccRsp;
}

export namespace GanacheAccRsp {
  export type AsObject = {
    accountsList: Array<string>,
    balance: string,
  }
}

