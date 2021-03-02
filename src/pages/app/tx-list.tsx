import { Paper, Table, TableBody, TableRow, TableContainer, TableHead, TableCell } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { Tx, TxStatus } from '@core';

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
            <TableRow key={row.hash}>
              <TableCell component="th" scope="row">
                {row.hash}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.blockNumber}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.requirer}
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