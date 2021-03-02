import { Block, TxStatus } from '@core/types';
import { useState, useEffect, useRef, useReducer } from 'react';


const initialList: Block[] = (new Array(3)).fill(1)
  .map((_, i) => {
    return {
      height: i + 1,
      from: i % 2 ? 'relayer A' : 'relayer B',
      txs: [
        {
          hash: `${Math.random()}`,
          requirer: (i % 2) ? 'ASDFA23234XC23' : 'HLFKLD823J12HSD',
          status: (i % 2) ? TxStatus.fail : TxStatus.success,
          blockNumber: i + 1,
        }
      ],
    };
  });

interface State {
  list: Block[];
  blockNumber: number;
}

const reducer = (state: State, action: string): State => {
  switch (action) {
    case 'increase':
      return {
        list: [...state.list, {
          height: state.blockNumber,
          from: state.blockNumber % 2 ? 'relayer A' : 'relayer B',
          txs: [
            {
              hash: `${Math.random()}`,
              requirer: state.blockNumber % 2 ?  'ASDFA23234XC23' : 'HLFKLD823J12HSD',
              status: state.blockNumber % 2 ? TxStatus.fail : TxStatus.success,
              blockNumber: state.blockNumber,
            }
          ],
        }],
        blockNumber: state.blockNumber + 1,
      };
    default:
      return state;
  }
};

export const useBlockList = (): { list: Block[] } => {
  const [ state, dispatch ] = useReducer<(state: State, action: string) => State>(reducer, { list: initialList, blockNumber: 4 });

  useEffect(() => {
    const timer = setInterval(() => dispatch('increase'), 6000);
    return () => clearInterval(timer);
  }, []);

  return { list: state.list };
};