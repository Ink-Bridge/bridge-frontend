import { Tx } from './tx';

export interface Block {
  hash: string;
  height: number;
  relayer: string;
  txs: Tx[];
}