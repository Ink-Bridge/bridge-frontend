export enum TxStatus {
  success = 'true',
  fail = 'false',
};

export interface Tx {
  tx_hash: string;
  height: number;
  status: TxStatus;
  requester: string;
}