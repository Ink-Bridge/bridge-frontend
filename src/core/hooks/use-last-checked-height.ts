import { useState } from 'react';

export const useLastCheckedHeight = (): { checkedHeight: number } => {
  let [ checkedHeight, setCheckedHeight ] = useState<number>(0);

  setTimeout(() => {
    setInterval(() => {
      setCheckedHeight(checkedHeight + 1);
    }, 6000);
  }, 4000);

  return {
    checkedHeight,
  }
};