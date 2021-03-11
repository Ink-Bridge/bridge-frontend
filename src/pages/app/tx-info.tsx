import React, { FC, ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import { Tx } from '../../core';

export const TxInfo: FC<{tx: Tx}> = ({ tx }): ReactElement => {
  return (
    <Box marginBottom="1.8rem" bgcolor="#FFF7F7">
      <h3 style={{ height: '3.5rem', lineHeight: '3.5rem', padding: '0rem 2.2rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', background: tx.status ? '#20CB97' : '#E55151'}}>
        { tx.status ? '验证成功' : '验证失败' }
      </h3>
      <Box height="3rem" lineHeight="3rem" padding="0rem 2.2rem" display="flex" justifyContent="space-between">
        <span style={{ fontWeight: 600 }}>Tx Hash:</span>
        <span>{ tx.tx_hash.slice(0, 7) }</span>
      </Box>
      <div style={{height: '3rem', lineHeight: '3rem', padding: "0rem 2.2rem", display: "flex", justifyContent: "space-between", borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
        <span style={{ fontWeight: 600 }}>Requirer:</span>
        <span>{ tx.requester.slice(0, 7) }</span>
      </div>
    </Box>
  )
};