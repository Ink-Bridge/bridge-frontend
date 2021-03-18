import { useBridgeContract } from './use-bridge-contract';
import { useState, useEffect, useRef } from 'react';
import { useApi } from './use-api';
import { useContractQuery } from './use-contract-query';
import { BridgeAddr } from '../contracts/contract-address';
import { useAppContract } from './use-app-contract';
import { Block, Tx } from '../types';

interface TxMap {
  [key: number]: Tx[];
}

const deDuplicate = (txs: Tx[]) => {
  const map: { [key: string ]: Tx } = {};
  txs.forEach(tx => map[tx.tx_hash] = tx);
  return Object.keys(map).map(hash => map[hash]);
};

export const useCheckedHeightAndTxs = (): {
  checkedHeight: number,
  txs: TxMap,
  blockList: Block[],
} => {
  const { api } = useApi();
  const { contract: bridgeContract } = useBridgeContract();
  const { contract: appContract } = useAppContract();
  const { read: readConfirmedIndex } = useContractQuery({ contract: bridgeContract, method: 'confirmedIndex' });
  const { read: readTxs } = useContractQuery({ contract: appContract, method: 'validateTransactionList' });
  const { read: readBlockList } = useContractQuery({ contract: appContract, method: 'latestBlockList' });
  const [ checkedHeight, setCheckedHeight ] = useState<number>(0);
  const [ txs, setTxs ] = useState<TxMap>({});
  const [ blockList, setBlockList ] = useState<Block[]>([]);
  const blockListRef = useRef<Block[]>([]);

  useEffect(() => {
    readConfirmedIndex().then(confirmedIndex =>
      setCheckedHeight((confirmedIndex || { height: 0 } as any).height)
    );
    readTxs().then((_txs: any) => {
      _txs = deDuplicate(_txs || []);
      setTxs(_txs as any);
    });
    readBlockList().then(blockList => {
      blockListRef.current = ((blockList as any) || []).reverse();
      setBlockList(blockListRef.current);
    }
    );
  }, [readConfirmedIndex, readTxs, readBlockList]);

  useEffect(() => {
    api.query.contracts.contractInfoOf(BridgeAddr, () => {
      console.log('api contract');
      
      readConfirmedIndex().then(confirmedIndex => {
        console.log(confirmedIndex, 'confirmedIndex');
        confirmedIndex = confirmedIndex || { height: 0 };
        setCheckedHeight((confirmedIndex as any).height);
      });
      readTxs().then((_txs: any) => {
        const map: TxMap = {};
        _txs = _txs || []
        _txs = deDuplicate(_txs);
        (_txs as Tx[]).forEach(tx => {
          if (!map[tx.height]) {
            map[tx.height] = [];
          }
          map[tx.height].push(tx);
        });
        setTxs(map);
        console.log('map', map);
      });
      readBlockList().then((list: any) => {
        const newBlockList: Block[] = list || [];
        const oldList = [...blockListRef.current];
        const duplicateIndex = oldList.findIndex(block => block.hash === newBlockList[newBlockList.length - 1].hash);
        const result = oldList.slice(0, duplicateIndex).concat(newBlockList.reverse());
        console.log('newBlockList', newBlockList, 'oldList', oldList, 'duplicateIndex', duplicateIndex, 'result', result);
        blockListRef.current = result.slice(0, 40);
        setBlockList(blockListRef.current);
      });
    });
  }, [api, readBlockList, readConfirmedIndex, readTxs]);

  return {
    checkedHeight,
    txs,
    blockList,
  }
};
