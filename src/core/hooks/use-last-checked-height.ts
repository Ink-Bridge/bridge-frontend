import { useState, useEffect } from 'react';

export const useLastCheckedHeight = (): { checkedHeight: number } => {
  let [ checkedHeight, setCheckedHeight ] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCheckedHeight(h => h + 1);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return {
    checkedHeight,
  }
};