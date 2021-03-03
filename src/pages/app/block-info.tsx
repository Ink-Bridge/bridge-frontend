import { Block } from '@core';
import { CircularProgress, Box } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { TxCardList } from './tx-card-list';

interface IProps extends Block{
  isTail?: boolean;
  left: boolean;
  checked?: boolean;
}

export const BlockInfo: FC<IProps> = ({
  isTail = false,
  height,
  from,
  txs,
  left,
  checked = false,
}): ReactElement => {
  return (
    <Box width="300px">
      { !isTail && <Box height="50px">
          <div style={{ margin: '0 auto', height: '100%', width: '2px', background: 'black' }}></div>
        </Box>
      }
      <Box position="relative" height="80px" textAlign="center" border="1px solid rgb(238, 238, 238)" bgcolor="rgb(248, 248, 248)">
        {
          checked && <TxCardList left={left} txs={txs}></TxCardList>
        }
        <Box
          position="relative"
          fontWeight='500'
          height='2.5em'
          lineHeight='2.5em'
          bgcolor='rgb(200, 200, 200)'>
            {
              !checked && 
                <Box
                  padding="0.3em 0.8em"
                  position='absolute'
                  top='0px'
                  left='0px'>
                    <CircularProgress size="1.4em"/>
                </Box>
            }
            <Box>
              block height: {height}
            </Box>
            <span style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              color: 'green',
              fontWeight: 'bolder',
              paddingRight: '0.8em'
            }}>12</span>
        </Box>
        <Box height="2em" lineHeight="2em">
          relayer: {from}
        </Box>
      </Box>
    </Box>
  );
};