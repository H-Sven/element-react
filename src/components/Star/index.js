import React,{Component} from 'react';
import './star.styl';

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

class Star extends Component {
  constructor(props){
    super();
    this.state = {
      itemClasses:this.computedItemClasses(props)
    };
  }
  computedItemClasses({score:scoreStr}){
    const result = [];
    const score = Math.floor(scoreStr * 2) / 2;
    const hasDecimal = score % 1 !== 0;
    const integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return result;
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      itemClasses:this.computedItemClasses(nextProps)
    })
  }

  render(){
    return (
      <div className={`star star-${this.props.size}`}>
        {
          this.state.itemClasses.map((itemClass,index)=><span className={`${itemClass} star-item`} key={index}></span>)
        }
      </div>
    )
  }
}

export default Star;