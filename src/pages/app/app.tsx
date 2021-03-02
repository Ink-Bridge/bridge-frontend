import { TxCard } from './tx-card';
import { TxStatus, useBlockList, useTxList } from '@core';
import React from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { TxList } from './tx-list';

function App() {
  const { list: blockList } = useBlockList(1);
  const { list: txList } = useTxList(20);

  return (
    <div className="App">
      <Box display="flex" justifyContent="left">
        <Box width="500px">
          <TxList list={txList}></TxList>
        </Box>
        <Box marginLeft="100px">
          { blockList.map((block, index) => <BlockInfo from={ block.from } height={block.height} isTail={ !index }></BlockInfo>) }
        </Box>
      </Box>
      {/* <TxCard status={ TxStatus.success } requirer="xxx" hash="asdfasd"></TxCard> */}
    </div>
  );
}

export default App;
