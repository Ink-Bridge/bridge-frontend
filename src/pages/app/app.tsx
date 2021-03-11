import React, { FC, ReactElement, useMemo } from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { TxList } from './tx-list';
import { Tx, useBlockList, useCheckedHeightAndTxs } from '../../core';
import { useApi } from '../../core/hooks/useApi';

const Main: FC = (): ReactElement => {
  const { list: originBlockList } = useBlockList();
  const filteredBlockList = useMemo(() => originBlockList.slice(-10), [originBlockList]);
  const { checkedHeight, txs } = useCheckedHeightAndTxs();

  useMemo(() => console.log('h, txs', checkedHeight, txs), [checkedHeight, txs]);
  // const txList = useMemo(
  //   () => originBlockList.filter(b => b.height <= checkedHeight)
  //     .reduce((list: Tx[], current) => list.concat(current.txs), []),
  //   [originBlockList, checkedHeight],
  // );

  return (
    <div className="App">
      <Box padding="20px" display="flex" justifyContent="left">
        <Box width="600px">
          checked height: {checkedHeight}
          <h2> Checked Transactions </h2>
          {/* <TxList list={txList}></TxList> */}
        </Box>
        <Box marginLeft="350px">
          {
            // filteredBlockList.map(
            //   (block, index) =>
            //     <BlockInfo
            //       hash={block.hash}
            //       checked={block.height <= checkedHeight}
            //       left={!!(index % 2)}
            //       txs={block.txs}
            //       relayer={ block.relayer }
            //       height={block.height}
            //       isTail={ !index }>
            //     </BlockInfo>
            // )
          }
        </Box>
      </Box>
    </div>
  );
};

function App() {
  const { isApiReady } = useApi();
  if (!isApiReady) {
    return <div>Connecting....</div>;
  }

  return (
    <Main></Main>
  );
}

export default App;
