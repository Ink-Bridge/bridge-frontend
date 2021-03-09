import { Block } from '@core/types';
import { useState, useEffect } from 'react';
import { useContractQuery } from './useContractQuery';
import { useAppContract } from './use-app-contract';

export const useBlockList = (): { list: Block[], isLoading: boolean } => {
  const { contract } = useAppContract();
  const [ list, setList ] = useState<Block[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const { read } = useContractQuery({ contract, method: 'latestBlockList' });

  useEffect(() => {
    setIsLoading(true);
    
    read()
      .then((_list: any) => {
        setList(_list);
      })
      .catch(e => {
        console.log(e, 'total error');
        setList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { list: list, isLoading };
};