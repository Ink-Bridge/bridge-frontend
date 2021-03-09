import { useState, useEffect } from 'react';

export const useLastCheckedHeight = (): { checkedHeight: number } => {
  let [ checkedHeight, setCheckedHeight ] = useState<number>(0);

  useEffect(() => {
    
  }, []);

  return {
    checkedHeight,
  }
};