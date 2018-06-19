import React,{Component} from 'react';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';
import {formatDate} from '@/sources/utils';
import CartControl from '@/components/CartControl';
import './food.styl';
import RatingSelect from '../RatingSelect';
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;


const toFormatDate = time=>{
  let date = new Date(time);
  return formatDate(date,"YYYY-MM-DD hh:mm")
}
class Food extends Component{
  constructor(){
    super();
    this.state = {
      foodShow: false,
      ratingConfig: {
        showFlag: true,
        selectType: ALL,
        onlyContent: false
      }
    }
    this.$refs = {};
  }
  componentWillReceiveProps(nextProps){
    if(!this.props.foodShow && nextProps.foodShow) {
      this.setState({
        ratingConfig: {
          showFlag: true,
          selectType: ALL,
          onlyContent: false
        }
      })
      this.$nextTick = ()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.food,{
            click:true
          })
        }else{
          this.scroll.refresh();
        }
      }
    };
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
  componentDidUpdate(){
    this.$nextTick && this.$nextTick();
    this.$nextTick = null;
  }
  render(){
    const {food,path} = this.props;
    return (
      <div className={`food ${this.props.foodShow && 'food-active'}`} ref={el=>this.$refs.food = el}>
        {food ? 
          <div className="food-content">
            <div className="image-header">
              <img src={food.image} alt="食物图片"/>
              <div className="back" onClick={e=>this.props.foodClose()}>
                <span className="icon-arrow_lift"></span>
              </div>
            </div>
            <div className="content">
              <h1 className="title">{food.name}</h1>
              <div className="detail">
                <span className="sell-count">月售{food.sellCount}份</span>
                <span className="rating">好评率{food.rating}%</span>
              </div>
              <div className="price">
                <span className="now">￥{food.price}</span>{food.oldPrice && <span className="old">￥{food.oldPrice}</span>}
              </div>
              <div className="cartcontrol-wrapper">
                <CartControl path={path}/>
              </div>
            </div>
            {
              food.info && 
              <div>
                <div className="split"></div>
                <div className="info">
                  <div className="title">商品信息</div>
                  <div className="text">{food.info}</div>
                </div>
              </div>
            }
            <div className="split"></div>
            <div className="rating">
              <h1 className="title">商品评价</h1>
              <RatingSelect
                setRatingConfig={(data)=>this.setRatingConfig(data)}
                ratingConfig={this.state.ratingConfig}
                ratings={food.ratings}
              />
              <div className="rating-wrapper">
                {
                  (food.ratings && food.ratings.length) ? 
                  <ul>
                    {
                      food.ratings.map((rating,index)=>
                        <li key={index} style={{display: this.ratingIsShow(rating.rateType,rating.text) ? '' : 'none'}} className="rating-item border-1px">
                          <div className="user">
                            <span className="name">{rating.username}</span>
                            <img className="avatar" src={rating.avatar} width="12" height="12" alt="avatar" />
                          </div>
                          <div className="time">{toFormatDate(rating.rateTime)}</div>
                          <p className="text">
                            <span className={`${rating.rateType === 0 ? 'icon-thumb_up' : rating.rateType===1 ? 'icon-thumb_down' : ''}  `}></span>
                            {rating.text}
                          </p>
                        </li>
                      )
                    }
                  </ul>
                  :<div className="norating">
                    暂无评价
                  </div>
                }
              </div>
            </div>
          </div>
        :
        <div>暂无数据</div>
      }
      </div>
    )
    
  }
}


const mapStateToProps = (state,selfProps)=>{
  return {
    food: selfProps.path ? state.goods[selfProps.path[0]].foods[selfProps.path[1]] : null
  }
}
export default connect(mapStateToProps)(Food)