import { Tx, TxStatus } from '@core/types';
import { useEffect, useState } from 'react';

export const useTxList = (signal: number): { list: Tx[] } => {
  const [ list, setList ] = useState<Tx[]>([]);

  useEffect(() => {
    const _list: Tx[] = (new Array(10)).fill(1).map((_, i) => ({ 
      hash: 'asdfasdasdfas',
      requirer: 'sdf23123423ss',
      status: (i % 2) ? TxStatus.fail : TxStatus.success,
      blockNumber: signal ++,
     }));
    setList(_list);
    console.log(_list, 'tx list')
  }, [signal]);

  return { list };
};