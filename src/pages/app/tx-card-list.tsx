import { FC, ReactElement } from 'react';
import { Box } from '@material-ui/core';
import { TxCard } from './tx-card';
import { Tx } from '@core';

export const TxCardList: FC<{txs: Tx[], left: boolean}> = ({ txs, left }): ReactElement => {
  return (txs && txs.length) ?
    <Box bgcolor="wheat" position="absolute" left={ left ? '-300px' : '340px'} top="0px" border="1px solid gray">
      <div style={{
        height: '1px',
        background: 'rgb(189, 180,180)',
        position: 'absolute',
        top: '4px',
        left: left ? '264px' : '-36px',
        width: '30px',
      }}></div>
      <TxCard blockNumber={txs[0].blockNumber} status={txs[0].status} requirer={txs[0].requirer} hash={txs[0].hash}></TxCard>
      <Box height="2em" lineHeight="2em" textAlign="center">more</Box>
    </Box>
    :
    <Box></Box>
};