import { Paper, Table, TableBody, TableRow, TableContainer, TableHead, TableCell } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { Tx, TxStatus } from '../../core';

export const TxList: FC<{list: Tx[]}> = ({ list }): ReactElement => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tx Hash</TableCell>
            <TableCell>Block Number</TableCell>
            <TableCell>Requirer</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.tx_hash}>
              <TableCell component="th" scope="row">
                {row.tx_hash}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.height}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.requester}
              </TableCell>
              <TableCell component="th" scope="row">
                {
                  row.status === TxStatus.success ?
                    <span style={{ color:"green" }}>success</span>
                  : <span style={{ color:"red" }}>fail</span>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};