import { Block } from '@core';
import { Box } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { TxCardList } from './tx-card-list';

interface IProps extends Block{
  isTail?: boolean;
  left: boolean;
}

export const BlockInfo: FC<IProps> = ({
  isTail = false,
  height,
  from,
  txs,
  left,
}): ReactElement => {
  return (
    <Box width="300px">
      { !isTail && <Box height="50px">
          <div style={{ margin: '0 auto', height: '100%', width: '2px', background: 'black' }}></div>
        </Box>
      }
      <Box position="relative" height="80px" textAlign="center" border="1px solid rgb(238, 238, 238)" bgcolor="rgb(248, 248, 248)">
        <TxCardList left={left} txs={txs}></TxCardList>
        <Box
          position="relative"
          fontWeight='500'
          height='2.5em'
          lineHeight='2.5em'
          bgcolor='rgb(200, 200, 200)'>
            <Box>
              block height: {height}
            </Box>
            <span style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
                color: 'green',
              fontWeight: 'bolder',
              paddingRight: '0.5em'
            }}>12</span>
        </Box>
        <Box>
          relayer: {from}
        </Box>
      </Box>
    </Box>
  );
};