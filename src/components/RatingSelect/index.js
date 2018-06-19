import React,{Component} from 'react';
import './ratingSelect.styl';
const POSITIVE = 0;
const NEGATIVE = 1;

class RatingSelect extends Component{
  select(key,val){
    this.props.setRatingConfig({
      ...this.props.ratingConfig,
      [key]:val
    })
  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    const {desc,ratings} = this.props;
    const {selectType,onlyContent} = this.props.ratingConfig;
    const positives = ratings.filter(rating=>rating.rateType === POSITIVE);
    const negatives = ratings.filter(rating=>rating.rateType === NEGATIVE);
    return (
      <div className="ratingselect">
        <div className="rating-type border-1px">
          <span className={`block positive ${selectType === 2 && 'active'}`} onClick={()=>this.select('selectType', 2)}>{desc.all}<span className="count">{ratings.length}</span></span>
          <span className={`block positive ${selectType === 0 && 'active'}`} onClick={()=>this.select('selectType', 0)}>{desc.positive}<span className="count">{positives.length}</span></span>
          <span className={`block positive ${selectType === 1 && 'active'}`} onClick={()=>this.select('selectType', 1)}>{desc.negative}<span className="count">{negatives.length}</span></span>
        </div>
        <div className={`switch ${onlyContent && 'on'}`} onClick={()=>this.select('onlyContent', !onlyContent)}>
          <span className="icon-check_circle"></span>
          <span className="text">只看有内容的评价</span>
        </div>
      </div>
    )
  }
}

RatingSelect.defaultProps = {
  desc: {
    all:"全部",
    positive:"满意",
    negative:"不满意"
  }
}
export default RatingSelect;