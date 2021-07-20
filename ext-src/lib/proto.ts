// @ts-ignore
import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = [path.join(__dirname, '../../services/ethereum.proto')];
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// client-call grpc
const clientCallPB = protoDescriptor.protoeth;
export const clientCallClient = new clientCallPB.ProtoEthService(
  // 'cc.ethcode.dev:50053',
  'localhost:50054',
  grpc.credentials.createInsecure()
);
