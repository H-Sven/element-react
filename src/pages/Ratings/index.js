import React,{Component} from 'react';
import {connect} from 'react-redux';
import {formatDate} from '@/sources/utils';
import RatingSelect from '@/components/RatingSelect';
import BScroll from 'better-scroll';
import Star from '@/components/Star';
import './ratings.styl';


const ALL = 2;

const toFormatDate = time=>{
  let date = new Date(time);
  return formatDate(date,"YYYY-MM-DD hh:mm")
}
class Ratings extends Component{
  constructor(){
    super();
    this.state = {
      ratingConfig: {
        showFlag: true,
        selectType: ALL,
        onlyContent: false
      }
    }
    this.$refs = {};
  }
  ratingIsShow(type,text){
    const {onlyContent, selectType} = this.state.ratingConfig;
    if(onlyContent && !text)return false;
    if(selectType === ALL) return true;
    return selectType===type;
  }
  setRatingConfig(ratingConfig){
    this.setState({ratingConfig});
  }
  componentDidMount(){
    this.scroll = new BScroll(this.$refs.ratings, {
      click: true
    });
  }
  render(){
    const {seller,ratings} = this.props;
    return (
      <div className="ratings" ref={el=>this.$refs.ratings = el}>
        {seller && ratings ?
        <div className="ratings-content">
          <div className="overview">
            <div className="overview-left">
              <h1 className="score">{seller.score}</h1>
              <div className="title">综合评分</div>
              <div className="rank">高于周边商家{seller.rankRate}%</div>
            </div>
            <div className="overview-right">
              <div className="score-wrapper">
                <span className="title">服务态度</span>
                <Star size={36} score={seller.serviceScore}/>
                <span className="score">{seller.serviceScore}</span>
              </div>
              <div className="score-wrapper">
                <span className="title">商品评分</span>
                <Star size={36} score={seller.foodScore}/>
                <span className="score">{seller.foodScore}</span>
              </div>
              <div className="delivery-wrapper">
                <span className="title">送达时间</span>
                <span className="delivery">{seller.deliveryTime}分钟</span>
              </div>
            </div>
          </div>
          <div className="split"></div>
          <RatingSelect
            setRatingConfig={(data)=>this.setRatingConfig(data)}
            ratingConfig={this.state.ratingConfig}
            ratings={ratings}
          />
          <div className="rating-wrapper">
            <ul>
              {ratings.map((rating,index)=>
              <li key={index} style={{display: this.ratingIsShow(rating.rateType, rating.text) ? '' : 'none'}} className="rating-item">
                <div className="avatar">
                  <img width="28" height="28" src={rating.avatar} alt="avatar"/>
                </div>
                <div className="content">
                  <h1 className="name">{rating.username}</h1>
                  <div className="star-wrapper">
                    <Star size={24} score={rating.score}/>
                    {rating.deliveryTime && <span className="delivery">{rating.deliveryTime}</span>}
                  </div>
                  <p className="text">{rating.text}</p>
                  {
                    rating.recommend && rating.recommend.length && <div className="recommend">
                      <span className="icon-thumb_up"></span>
                      {rating.recommend.map((item,index)=><span key={index} className="item" >{item}</span>)}
                    </div>
                  }
                  <div className="time">
                    {toFormatDate(rating.rateTime)}
                  </div>
                </div>
              </li>)}
            </ul>
          </div>
        </div>
        :<div>暂无数据</div>
        }
    </div>
    )
  }
}

const mapStateToProps = state=>({
  ratings: state.ratings,
  seller: state.seller
})
export default connect(mapStateToProps)(Ratings);