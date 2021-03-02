import { Tx } from './tx';

export interface Block {
  height: number;
  from: string;
  txs: Tx[];
}