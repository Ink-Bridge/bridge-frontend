import { useBridgeContract } from './use-bridge-contract';
import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { useContractQuery } from './useContractQuery';
import { BridgeAddr } from '../contracts/contract-address';
import { useAppContract } from './use-app-contract';
import { Tx } from '../types';

export const useCheckedHeightAndTxs = (): { checkedHeight: number, txs: Tx[] } => {
  const { api } = useApi();
  const { contract: bridgeContract } = useBridgeContract();
  const { contract: appContract } = useAppContract();
  const { read: readConfirmedIndex } = useContractQuery({ contract: bridgeContract, method: 'confirmedIndex' });
  const { read: readTxs } = useContractQuery({ contract: appContract, method: 'validateTransactionList' });
  const [ checkedHeight, setCheckedHeight ] = useState<number>(0);
  const [ txs, setTxs ] = useState<Tx[]>([]);
  
  useEffect(() => {
    readConfirmedIndex().then(confirmedIndex => {
      setCheckedHeight((confirmedIndex as any).height);
    });
    readTxs().then(confirmedIndex => {
      setCheckedHeight((confirmedIndex as any).height);
    });
  }, [readConfirmedIndex, readTxs]);
  useEffect(() => {
    api.query.contracts.contractInfoOf(BridgeAddr, () => {
      console.log('subscribe query');
      readConfirmedIndex().then(confirmedIndex => setCheckedHeight((confirmedIndex as any).height));
      readTxs().then(_txs => setTxs(_txs as any));
    });
  }, [api, readConfirmedIndex, readTxs]);

  return {
    checkedHeight,
    txs,
  }
};