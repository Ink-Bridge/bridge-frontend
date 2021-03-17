import React from 'react';
import { Box } from '@material-ui/core';
import { Block } from '../../core';
import './block-birth.css';
import { getFixedAddress } from '../../core/util/address-format';

interface IProps {
  block: Block;
  delay: number;
}
interface State {
  opacity: number;
  width: number;
}
export class BlockBirth extends React.Component<IProps, State> {
  state = {
    opacity: 0.2,
    width: 0,
  };
  timer: any;

  constructor(props: IProps) {
    super(props);

    this.setState({
      opacity: 0.2,
      width: 0,
    });
    this.timer = setInterval(() => {
      const opacityStep = (1 - 0.2) / (props.delay / 60);
      const widthStep = (37 - 0) / (props.delay / 60);

      console.log('state,', this)
      let newOpacity = this.state.opacity + opacityStep;
      let newWidth = this.state.width + widthStep;

      if (newOpacity >= 1) {
        newOpacity = 1;
      }
      if (newWidth >= 37) {
        newWidth = 37;
      }
      this.setState({
        opacity: newOpacity,
        width: newWidth,
      });
      if (newOpacity === 1 && newWidth === 37) {
        clearInterval(this.timer);
      }
    }, 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render = () => {
    return (
      <div className="block-info">
        <div className="block" style={{ width: `${this.state.width}rem`, opacity: this.state.opacity }}>
          <Box color="white" textAlign="left" height="5rem" lineHeight="5rem" paddingLeft="2.2rem" bgcolor="#E5AA64" position="relative">
            <span>
              <span style={{ fontWeight: 700 }}>Relayer:&nbsp;&nbsp;</span>
              { getFixedAddress(this.props.block.relayer) }
            </span>
            <a href={`https://www.blockchain.com/btc/block/${this.props.block.hash.slice(2)}`} target="blank">
              <div className="block-number">
                <div style={{ fontSize: '2.4rem', position: 'relative', top: '1rem' }}>
                  { this.props.block.height }
                </div>
                <span>block</span>
              </div>
            </a>
          </Box>
          
          <Box>
            <Box height="5rem" lineHeight="5rem" padding="0rem 2.2rem" display="flex" justifyContent="space-between">
              <span style={{ fontWeight: 600 }}>producer</span>
              <span>{ getFixedAddress(this.props.block.miner) }</span>
            </Box>
            <Box height="5rem" lineHeight="5rem" padding="0rem 2.2rem" display="flex" justifyContent="space-between">
              <span style={{ fontWeight: 600 }}>nonce</span>
              <span>{ this.props.block.nonce }</span>
            </Box>
            <Box height="5rem" lineHeight="5rem" padding="0rem 2.2rem" display="flex" justifyContent="space-between">
              <span style={{ fontWeight: 600 }}>difficulty</span>
              <span>{ this.props.block.difficulty }</span>
            </Box>
          </Box>
        </div>
      </div>
    )
  }
};