export enum TxStatus {
  success = 'true',
  fail = 'false',
};

export interface Tx {
  hash: string;
  requirer: string;
  status: TxStatus;
  blockNumber: number;
}