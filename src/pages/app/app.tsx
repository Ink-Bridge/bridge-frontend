import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import './app.css';
import { BlockInfo } from './block-info';
import { Box } from '@material-ui/core';
import { useCheckedHeightAndTxs as useData } from '../../core';
import { useApi } from '../../core/hooks/use-api';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LogoSvg from "../../assets/logo.svg";
import { BlockBirth } from './block-birth';

const Main: FC = (): ReactElement => {
  const { checkedHeight, txs, blockList } = useData();
  const [ prevAvailable, setPrevAvailable ] = useState<boolean>(false);
  const [ nextAvailable, setNextAvailable ] = useState<boolean>(true);
  const [ pushing, setPushing ] = useState<boolean>(false);
  const [ right, setRight ] = useState<number>(0);
  const content = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const delay = 1000;

  const unCheckedBlockList = useMemo(() => {
    const index = blockList.findIndex(block => checkedHeight >= block.height);
    return blockList.slice(0, index).reverse();
  }, [blockList, checkedHeight]);

  const checkedBlockList = useMemo(() => {
    const list = blockList.slice(0, 20);
    const index = list.findIndex(block => checkedHeight >= block.height);
    return list.slice(index).reverse();
  }, [blockList, checkedHeight]);

  const handleNext = () => {
    if (!nextAvailable || !content.current || !container.current) {
      return;
    }
    //  0 ~ + content.current.clientWidth - container.current.clientWidth
    let right = parseFloat(content.current?.style.right || '0');
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    if (right + 300 > 0) {
      right = 0;
      // setNextAvailable(false);
    } else {
      right += 300;
    }
    // console.log('min', min, 'right', right);
    setRight(right);
  };

  const handlePrev = () => {
    if (!prevAvailable || !content.current || !container.current) {
      return;
    }
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    let right = parseFloat(content.current?.style.right || '0');
    if (right - 300 < min) {
      right = min;
    } else {
      right -= 300;
    }
    // console.log('min', min, 'right', right);
    setRight(right);
  };

  const gotoRight = () => {
    if (!content.current || !container.current) {
      return;
    }
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    // console.log('goto right', min);
    setRight(0);
  };

  useMemo(() => {
    if (!content.current || !container.current) {
      return;
    }
    // container.current.clientWidth - content.current.clientWidth = min
    // min ~ 0
    // rightmax  - leftmax
    let min = container.current.clientWidth - content.current.clientWidth;
    console.log('min', min, 'right', right);
    if (min < 0 && right > min) {
      setPrevAvailable(true);
    } else {
      setPrevAvailable(false);
    }
    if (min < 0 && right < 0) {
      setNextAvailable(true);
    } else {
      setNextAvailable(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [right, blockList]);

  useEffect(() => {
    if (!blockList || !blockList.length ) {
      return;
    }
    gotoRight();
    setPushing(true);
    const timer = setTimeout(() => {
      setPushing(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [blockList]);

  return (
    <div className="App" style={{ height: '100%', background: 'white' }}>
      <Box textAlign='left' lineHeight='8rem' fontSize='4rem' marginLeft='4.2rem' height='8rem' color='#111' fontWeight='600' bgcolor='white'display="flex" flexDirection="column" justifyContent="center">
        <img src={LogoSvg} alt="" style={{ width: '18rem' }} />
      </Box>
      <div ref={container} style={{ width: "100%", overflow: "hidden", position: "absolute", top: "8rem", bottom: "10rem", background: 'rgb(239, 239, 239)' }}>
        <div ref={content} style={{ height: "100%", padding: "4.8rem", position: "absolute", right: right, top: "0px" }}>
          <Box zIndex="2" bgcolor="rgba(0, 0, 0, 0)" position="relative" top="15px" display="inline-flex">
            { blockList.slice(0, blockList.length - 1).map((block, index) => <BlockInfo showProgress={!!index} checked={true} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) }
            {
              pushing && blockList[blockList.length - 1] && <BlockBirth delay={delay} block={blockList[blockList.length - 1]} />
            }
            { !pushing && blockList[blockList.length - 1] && <BlockInfo checked={true} key={blockList[blockList.length - 1].hash} blockData={blockList[blockList.length - 1]} txs={txs[blockList[blockList.length - 1].height] || []}></BlockInfo> }
          </Box>
        </div>
      </div>
      <Box height="10rem" width="100%" justifyContent="space-between" display="flex" position="absolute" bottom="0px" bgcolor='rgb(239, 239, 239)'>
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
