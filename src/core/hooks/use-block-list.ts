import { Block } from '@core';
import { useEffect, useState } from 'react';

export const useBlockList = (signal: number): { list: Block[] } => {
  const [ list, setList ] = useState<Block[]>([]);

  useEffect(() => {
    const _list: Block[] = (new Array(10)).fill(1).map((_, i) => ({ height: signal ++, from: i % 2 ? 'relayerA' : 'relayerB' }));
    setList(_list);
    console.log(_list, 'block list')
  }, [signal]);

  return { list };
};