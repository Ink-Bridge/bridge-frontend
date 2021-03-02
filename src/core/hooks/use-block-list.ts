import { Block, TxStatus } from '@core';
import { useEffect, useState } from 'react';

export const useBlockList = (signal: number): { list: Block[] } => {
  const [ list, setList ] = useState<Block[]>([]);

  useEffect(() => {
    const _list: Block[] = (new Array(10)).fill(1)
      .map((_, i) => {
        signal ++;
        return {
          height: signal,
          from: i % 2 ? 'relayerA' : 'relayerB',
          txs: [
            {
              hash: 'asdfasdasdfas',
              requirer: 'sdf23123423ss',
              status: (i % 2) ? TxStatus.fail : TxStatus.success,
              blockNumber: signal,
            }
          ],
        };
      });
    setList(_list);
    console.log(_list, 'block list')
  }, [signal]);

  return { list };
};