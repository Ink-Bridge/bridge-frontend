import { Block } from '@core';
import { Box } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';

interface IProps extends Block{
  isTail?: boolean;
}

export const BlockInfo: FC<IProps> = ({
  isTail = false,
  height,
  from,
}): ReactElement => {
  return (
    <Box width="300px">
      { !isTail && <Box height="50px">
          <div style={{ margin: '0 auto', height: '100%', width: '2px', background: 'black' }}></div>
        </Box>
      }
      <Box height="80px" textAlign="center" border="1px solid black" bgcolor="gray">
        <Box>
          relayer: {from}
        </Box>
        <Box>
          block height: {height}
        </Box>
      </Box>
    </Box>
  );
};