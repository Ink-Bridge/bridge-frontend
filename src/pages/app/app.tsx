import { Tx, useBlockList } from '@core';
import React, { useMemo } from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { TxList } from './tx-list';

function App() {
  const { list: blockList } = useBlockList();
  const txList = useMemo(
    () => {
      // console.log('list', blockList)
      return blockList.reduce((list: Tx[], current) => list.concat(current.txs), []);
    },
    [blockList],
  );

  return (
    <div className="App">
      <Box padding="20px" display="flex" justifyContent="left">
        <Box width="500px">
          <h2> Checked Transactions </h2>
          <TxList list={txList}></TxList>
        </Box>
        <Box marginLeft="350px">
          { blockList.map((block, index) => <BlockInfo left={!!(index % 2)} txs={block.txs} from={ block.from } height={block.height} isTail={ !index }></BlockInfo>) }
        </Box>
      </Box>
    </div>
  );
}

export default App;
