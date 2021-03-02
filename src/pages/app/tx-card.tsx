import { Tx, TxStatus } from '@core';
import React, { FC, ReactElement } from 'react';
import Box from '@material-ui/core/Box';

export const TxCard: FC<Tx> = ({ status, hash, requirer }): ReactElement => {
  return (
    <Box width="220px" height="100px" padding="0px 20px">
      <h3 style={{ padding: '0.3em 0em', margin: '0px', fontSize: '1em' }}>收到交易验证请求</h3>
      <Box display="flex" justifyContent="space-between">
        <span>交易hash</span>
        <span>{ hash }</span>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <span>请求人</span>
        <span>{ requirer }</span>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <span>请求状态</span>
        {
          status === TxStatus.success ?
            <span style={{ color:"green" }}>success</span>
          : <span style={{ color:"red" }}>fail</span>
        }
      </Box>
    </Box>
  )
};