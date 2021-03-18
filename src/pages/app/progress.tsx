import React from 'react';

interface IProps {
  width: number;
  rightToLeft?: boolean;
  delay?: number;
}

export class Progress extends React.Component<IProps> {

  state = {
    active: 0,
  };
  timer: any;
  brickWidth = 6;
  counts: number;

  constructor(props: IProps) {
    super(props);

    let { width } = props;
    this.counts = Math.floor(width / (this.brickWidth * 2));
  }

  componentDidMount() {
    let { delay, rightToLeft } = this.props;
    delay = delay || 100;
    rightToLeft = !!rightToLeft;

    this.timer = setInterval(() => {
      let nextActive: number;
      if (rightToLeft) {
        nextActive = this.state.active - 1;
        if (nextActive < 0) {
          nextActive = this.counts - 1;
        }
      } else {
        nextActive = this.state.active + 1;
        if (nextActive >= this.counts) {
          nextActive = 0;
        }
      }
      this.setState({
        ...this.state,
        active: nextActive,
      });
    }, delay);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return (
      <div style={{ textAlign: 'left' }}>
        {
          (new Array(this.counts)).fill(true).map((t, index) =>
            <div key={index} style={{ backgroundColor: this.state.active === index ? 'rgb(247, 147, 26)' : 'rgb(231, 213, 192)', display: 'inline-block', marginRight: this.brickWidth, width: this.brickWidth, height: 4 }}></div>
          )
        }
      </div>
    );
  }
}
