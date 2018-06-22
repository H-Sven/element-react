import React,{Component} from 'react';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';
import Star from '@/components/Star';
import Icon from '@/components/Icon';
import './seller.styl';
const isFavorite = name => {
  let favorites = window.localStorage.getItem('favorite');
  if(!favorites) return false;
  favorites = JSON.parse(favorites);
  return favorites.indexOf(name) !== -1;
}
const delFavorite = name=>{
  let favorites = window.localStorage.getItem('favorite');
  if(!favorites){
    return;
  } else {
    favorites = JSON.parse(favorites);
    favorites.splice(favorites.indexOf(name),1);
  }
  window.localStorage.setItem('favorite',JSON.stringify(favorites))
}
const addFavorite = name=>{
  let favorites = window.localStorage.getItem('favorite');
  if(!favorites){
    favorites = [name]
  } else {
    favorites = JSON.parse(favorites);
    favorites = [...new Set(favorites).add(name)];
  }
  window.localStorage.setItem('favorite',JSON.stringify(favorites))
}
class Seller extends Component{
  constructor(props){
    super();
    this.$refs = {};
    this.state = {
      favorite: null,
      favoriteText: null
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.seller && !this.props.seller){
      const favorite = isFavorite(nextProps.seller.name);
      this.setState({
        favorite: favorite,
        favoriteText: favorite ? '已收藏' : '收藏'
      })
    }
  }
  toggleFavorite(event) {
    const favorite = !this.state.favorite
    this.setState({
      favorite,
      favoriteText: favorite ? '已收藏' : '收藏'
    });
    favorite ? addFavorite(this.props.seller.name) : delFavorite(this.props.seller.name);
  }
  componentDidMount(){
    this.scroll = new BScroll(this.$refs.seller, {
      click: true
    });
  }
  render(){
    const seller = this.props.seller;
    const {
      favorite,
      favoriteText
    } = this.state;
    return (
      <div className="seller" ref={el=>this.$refs.seller = el}>
        { seller ? 
          <div className="seller-content">
            <div className="overview">
              <h1 className="title">{seller.name}</h1>
              <div className="desc border-1px">
                <Star size={36} score={seller.score}/>
                <span className="text">({seller.ratingCount})</span>
                <span className="text">月售{seller.sellCount}单</span>
              </div>
              <ul className="remark">
                <li className="block">
                  <h2>起送价</h2>
                  <div className="content">
                    <span className="stress">{seller.minPrice}</span>元
                  </div>
                </li>
                <li className="block">
                  <h2>商家配送</h2>
                  <div className="content">
                    <span className="stress">{seller.deliveryPrice}</span>元
                  </div>
                </li>
                <li className="block">
                  <h2>平均配送时间</h2>
                  <div className="content">
                    <span className="stress">{seller.deliveryTime}</span>分钟
                  </div>
                </li>
              </ul>
              <div className="favorite" onClick={e=>this.toggleFavorite()}>
                <span className={`icon-favorite ${favorite && 'active'}`}></span>
                <span className="text">{favoriteText}</span>
              </div>
            </div>
            <div className="split"></div>
            <div className="bulletin">
              <h1 className="title">公告与活动</h1>
              <div className="content-wrapper border-1px">
                <p className="content">{seller.bulletin}</p>
              </div>
              {seller.supports && <ul className="supports">
                {seller.supports.map((item,index)=><li key={'support' + index} className="support-item border-1px">
                  <Icon type={seller.supports[index].type} iconNum={4}/>
                  <span className="text">{seller.supports[index].description}</span>
                </li>)}
              </ul>}
            </div>
            <div className="split"></div>
            <div className="pics">
              <h1 className="title">商家实景</h1>
              <div className="pic-wrapper" ref={el=>this.$refs.picWrapper = el}>
                <ul className="pic-list" ref={el=>this.$refs.picList = el}>
                  {
                    seller.pics.map((pic,index)=><li key={'pic' + index} className="pic-item">
                      <img src={pic}  width="120" height="90" alt="live"/>
                    </li>)
                  }
                </ul>
              </div>
            </div>
            <div className="split"></div>
            <div className="info">
              <h1 className="title border-1px">商家信息</h1>
              <ul>
                {seller.infos.map((info,index)=><li key={'info' + index} className="info-item">{info}</li>)}
              </ul>
            </div>
          </div>
          : <div>暂无数据</div>
        }
    </div>
    )
  }
}
const mapStateToProps = state=>(
  {
    seller:state.seller
  }
);
export default connect(mapStateToProps)(Seller);