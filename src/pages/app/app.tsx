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
  const [ left, setLeft ] = useState<number>(0);
  // const [ spaceWidth, setSpaceWidth ] = useState<number>(0);
  const content = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  // const space = useRef<HTMLDivElement>(null);

  const unCheckedBlockList = useMemo(() => {
    const index = blockList.findIndex(block => checkedHeight >= block.height);
    return blockList.slice(0, index).reverse();
  }, [blockList, checkedHeight]);

  const checkedBlockList = useMemo(() => {
    console.log('blocklsit', blockList, 'checked h', checkedHeight);
    const list = blockList.slice(0, 20);
    const index = list.findIndex(block => checkedHeight >= block.height);
    return list.slice(index).reverse();
  }, [blockList, checkedHeight]);

  const gotoRight = () => {
    if (!content.current || !container.current) {
      return;
    }
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    setLeft(min);
  };

  // useEffect(() => {
  //   const listener = () => {
  //     if (!container.current || !space.current) {
  //       return;
  //     }
  //     console.log('container.current.clientWidth', container.current.clientWidth);
  //     const width = pushing ? container.current.clientWidth - 854 : container.current.clientWidth - 462
  //     setSpaceWidth(width);
  //     // space.current.style.width = `${container.current.clientWidth - 462}px`
  //   };
  //   listener();
  //   window.addEventListener('resize', listener, false )
  //   return () => window.removeEventListener('resize', listener);
  // }, [pushing]);

  // useMemo(gotoRight, [blockList]);

  useMemo(() => {
    if (!content.current || !container.current) {
      return;
    }
    let min = container.current.clientWidth - content.current.clientWidth;
    if (min < 0 && left < 0) {
      setPrevAvailable(true);
    } else {
      setPrevAvailable(false);
    }
    if (min < 0 && left > min) {
      setNextAvailable(true);
    } else {
      setNextAvailable(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const handleNext = () => {
    if (!nextAvailable || !content.current || !container.current) {
      return;
    }
    let left = parseFloat(content.current?.style.left || '0');
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    if (left - 300 < min) {
      left = min;
      setNextAvailable(false);
    } else {
      left -= 300;
    }
    console.log('min', min, 'left', left);
    setLeft(left);
  };

  const handlePrev = () => {
    if (!prevAvailable || !content.current || !container.current) {
      return;
    }
    let min = container.current.clientWidth - content.current.clientWidth;
    min = min > 0 ? 0 : min;
    let left = parseFloat(content.current?.style.left || '0');
    if (left + 300 > 0) {
      left = 0;
    } else {
      left += 300;
    }
    console.log('min', min, 'left', left);
    setLeft(left);
  };

  useEffect(() => {
    if (!blockList || !blockList.length ) {
      return;
    }
    setPushing(true);
    // const timer = setInterval(() => {
    //   const opacityStep = (1 - firstBlockStyle.opacity) / (10000 / 60);
    //   const widthStep = (37 - firstBlockStyle.width) / (10000 / 60);
    //   let newOpacity = firstBlockStyle.opacity + opacityStep;
    //   let newWidth = firstBlockStyle.width + widthStep;
    //   if (newOpacity >= 1) {
    //     newOpacity = 1;
    //   }
    //   if (newWidth >= 37) {
    //     newWidth = 37;
    //   }
    //   setFirstBlockStyle({
    //     opacity: newOpacity,
    //     width: newWidth,
    //   });
    //   if (newOpacity === 1 && newWidth === 37) {
    //     clearInterval(timer);
    //     setPushing(false);
    //   }
    // }, 60);
    const timer = setTimeout(() => {
      setPushing(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [blockList]);

  return (
    <div className="App" style={{ height: '100%', background: 'white' }}>
      
      <Box textAlign='left' lineHeight='8rem' fontSize='4rem' marginLeft='4.2rem' height='8rem' color='#111' fontWeight='600' bgcolor='white'display="flex" flexDirection="column" justifyContent="center">
        <img src={LogoSvg} alt="" style={{ width: '18rem' }} />
      </Box>
      <div ref={container} style={{ width: "100%", overflow: "hidden", position: "absolute", top: "8rem", bottom: "10rem", background: 'rgb(239, 239, 239)' }}>
        <div ref={content} style={{ height: "100%", padding: "4.8rem", position: "absolute", left, top: "0px" }}>
          <Box zIndex="2" bgcolor="rgba(0, 0, 0, 0)" position="relative" top="15px" display="inline-flex">
            {/* { unCheckedBlockList.map(block => <BlockInfo checked={false} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) }
            { checkedBlockList[0] && <BlockInfo first={true} checked={true} key={checkedBlockList[0].hash} blockData={checkedBlockList[0]} txs={txs[checkedBlockList[0].height] || []}></BlockInfo> }
            { checkedBlockList.slice(1).map(block => <BlockInfo checked={true} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) } */}
            
            {/* { unCheckedBlockList.map(block => <BlockInfo checked={false} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) } */}
            {/* { checkedBlockList[0] && <BlockInfo first={true} checked={true} key={checkedBlockList[0].hash} blockData={checkedBlockList[0]} txs={txs[checkedBlockList[0].height] || []}></BlockInfo> } */}
            
            {/* { blockList[blockList.length - 1] && <BlockInfo first={true} checked={true} key={ blockList[blockList.length - 1].hash} blockData={blockList[blockList.length - 1]} txs={txs[blockList[blockList.length - 1].height] || []}></BlockInfo> }
            { [...blockList].reverse().slice(1).map(block => <BlockInfo checked={true} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) } */}

            {/* { blockList[blockList.length - 1] && <BlockInfo first={true} checked={true} key={ blockList[blockList.length - 1].hash} blockData={blockList[blockList.length - 1]} txs={txs[blockList[blockList.length - 1].height] || []}></BlockInfo> }
            {
              [...blockList]
                .reverse()
                .slice(1, pushing ? blockList.length - 1 : blockList.length)
                .map(block =>
                  <BlockInfo checked={true} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>
                )
            }
            {
              blockList[0] && pushing ?
                <BlockInfo checked={true} key={blockList[0].hash} blockData={blockList[0]} txs={txs[blockList[0].height] || []}></BlockInfo>
                :
                ''
            } */}
            {
              pushing && blockList[0] && <BlockBirth delay={1000} block={blockList[0]} />
            }
            { !pushing && blockList[0] && <BlockInfo first={true} checked={true} key={blockList[0].hash} blockData={blockList[0]} txs={txs[blockList[0].height] || []}></BlockInfo> }
            { blockList.slice(1).map(block => <BlockInfo checked={true} key={block.hash} blockData={block} txs={txs[block.height] || []}></BlockInfo>) }

            {/* <div ref={space} style={{ width: spaceWidth, height: '100px' }}></div> */}
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
