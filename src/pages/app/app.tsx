import React, { FC, ReactElement, useMemo, useRef, useState } from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { useCheckedHeightAndTxs as useData } from '../../core';
import { useApi } from '../../core/hooks/useApi';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Main: FC = (): ReactElement => {
  const { checkedHeight, txs, blockList } = useData();
  const [ prevAvailable, setPrevAvailable ] = useState<boolean>(false);
  const [ nextAvailable, setNextAvailable ] = useState<boolean>(true);
  const filteredBlockList = useMemo(() => blockList.slice(-20), [blockList]);
  const content = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (!content.current || !container.current) {
      return;
    }
    let left = parseFloat(content.current?.style.left || '0');
    const min = container.current.clientWidth - content.current.clientWidth;
    if (left - 200 < min) {
      left = min;
      setNextAvailable(false);
    } else {
      left -= 200;
    }
    console.log('min', min, 'left', left);
        
    if (left === 0) {
      setPrevAvailable(false);
    } else {
      setPrevAvailable(true);
    }
    if (left === min) {
      setNextAvailable(false);
    } else {
      setNextAvailable(true);
    }

    content.current && (content.current.style.left = `${left}px`);
  };
  const handlePrev = () => {
    if (!content.current || !container.current) {
      return;
    }
    const min = container.current.clientWidth - content.current.clientWidth;
    let left = parseFloat(content.current?.style.left || '0');
    if (left + 200 > 0) {
      left = 0;
    } else {
      left += 200;
    }
    console.log('min', min, 'left', left);
    
    if (left === 0) {
      setPrevAvailable(false);
    } else {
      setPrevAvailable(true);
    }
    if (left === min) {
      setNextAvailable(false);
    } else {
      setNextAvailable(true);
    }

    content.current && (content.current.style.left = `${left}px`);
  };

  return (
    <div className="App" style={{ height: '100%', background: 'rgb(239, 239, 239)' }}>
      <Box>
        <h1 style={{ textAlign: 'left', lineHeight: '8rem', fontSize: '4rem', marginLeft: '4.2rem', height: '8rem', color: '#111', fontWeight: 600 }}>InkBridge</h1>
      </Box>
      <div ref={container} style={{ width: "100%", overflow: "hidden", position: "absolute", top: "8rem", bottom: "10rem" }}>
        <div ref={content} style={{ height: "100%", padding: "4.8rem", position: "absolute", left: "0px", top: "0px" }}>
          <Box zIndex="1" height="40px" padding="18px 0px">
            <Box borderTop="4px dashed #E7D5C0"></Box>
          </Box>
          <Box zIndex="2" bgcolor="rgba(0, 0, 0, 0)" position="relative" top="15px" display="inline-flex">
            { filteredBlockList[0] && <BlockInfo checked={checkedHeight >= filteredBlockList[0].height} key={filteredBlockList[0].hash} blockData={filteredBlockList[0]} txs={txs[478562] || []}></BlockInfo> }
            { filteredBlockList.slice(1).map(block => <BlockInfo checked={checkedHeight >= block.height} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) }
          </Box>
        </div>
      </div>
      <Box height="10rem" width="100%" justifyContent="space-between" display="flex" position="absolute" bottom="0px">
        <Box style={{ height: '10rem', width: '8rem', background: prevAvailable ? '#F7931A' : '#D2D2D2', color: prevAvailable ? 'white' : 'rgb(232, 232, 232)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
          <Box style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%' }} onClick={handlePrev}>
            <ArrowBackIosIcon style={{ fontSize: '4rem' }}/>
          </Box>
        </Box>
        <Box style={{ height: '10rem', width: '8rem', background: nextAvailable ? '#F7931A' : '#D2D2D2', color: nextAvailable ? 'white' : 'rgb(232, 232, 232)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Box style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%' }} onClick={handleNext}>
            <ArrowForwardIosIcon style={{ fontSize: '4rem' }}/>
          </Box>
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
