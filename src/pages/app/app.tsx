import { Tx, useBlockList, useLastCheckedHeight } from '@core';
import React, { useMemo } from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { TxList } from './tx-list';

function App() {
  const { list: originBlockList } = useBlockList();
  const filteredBlockList = useMemo(() => originBlockList.slice(-10), [originBlockList]);
  const { checkedHeight } = useLastCheckedHeight();

  const txList = useMemo(
    () => originBlockList.filter(b => b.height <= checkedHeight)
      .reduce((list: Tx[], current) => list.concat(current.txs), []),
    [originBlockList, checkedHeight],
  );

  return (
    <div className="App">
      <Box padding="20px" display="flex" justifyContent="left">
        <Box width="600px">
          checked height: {checkedHeight}
          <h2> Checked Transactions </h2>
          <TxList list={txList}></TxList>
        </Box>
        <Box marginLeft="350px">
          {
            filteredBlockList.map(
              (block, index) =>
                <BlockInfo
                  checked={block.height <= checkedHeight}
                  left={!!(index % 2)}
                  txs={block.txs}
                  from={ block.from }
                  height={block.height}
                  isTail={ !index }>
                </BlockInfo>
            )
          }
        </Box>
      </Box>
    </div>
  );
}

export default App;
