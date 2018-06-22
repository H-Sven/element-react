import React,{Component} from 'react';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';

import CartControl from '../CartControl';

import {emptyChoice} from '@/stores/goods/actions';
import {emptyCart} from '@/stores/shoppingCart/actions';

import './shopcart.styl';
class Shopcart extends Component {
  constructor(){
    super();
    this.state = {
      fold: false
    };
    this.$refs={}
  }
  componentDidUpdate(){
    this.nextTick && this.nextTick();
    this.nextTick = null;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.totalCount !== this.props.totalCount && this.state.fold) this.listScrollSet();
  }
  listScrollSet(){
    this.nextTick = ()=>{
      if(!this.scroll){
          this.scroll = new BScroll(this.$refs.listContent,{click:true});
      }else{
        this.scroll.refresh();
      }
    }
  }
  toggleList(){
    if(!this.props.totalCount){
      return this.setState({
        fold: false
      });
    }
    this.setState({
      fold: !this.state.fold
    })
    if(this.state.fold)this.listScrollSet();
  }
  pay(){
    if(this.props.totalPrice < this.props.minPrice){
      return;
    }
    window.alert(`支付${this.totalPrice}元`);
  }
  render(){
    const {
      totalCount,
      deliveryPrice,
      totalPrice,
      payClass,
      selectFoods,
      payDesc
    } = this.props;
    return(
      <div>
        <div className="shopcart">
          <div className="content" onClick={()=>this.toggleList()}>
            <div className="content-left">
              <div className="logo-wrapper">
                <div className={`logo ${totalCount > 0 && 'highlight'}`}>
                  <span className="icon-shopping_cart"></span>
                </div>
                <div className="num" style={{display:totalCount > 0 ? '' : 'none'}}>{totalCount}</div>
              </div>
              <div className={`price ${totalCount > 0 && 'highlight'}`}>
                ￥ {totalPrice} 
              </div>
              <div className="desc">
                另需配送费￥{deliveryPrice}
              </div>
            </div>
            <div className="content-right">
              <div className={`pay ${payClass}`} onClick={this.pay}>
                {payDesc}
              </div>
            </div>
          </div>
          <div className={`shopcart-list ${this.state.fold && 'active'}`}>
            <div className="list-header">
              <h1 className="title">购物车</h1>
              <h1 className="empty" onClick={()=>{this.props.clearShoppingCart();this.toggleList();}}>清空</h1>
            </div>
            <div className="list-content" ref={el=>this.$refs.listContent = el}>
              <ul>
                {
                  selectFoods.map((food,index)=>
                    <li className="food" key={index}>
                      <span className="name">{food.name}</span>
                      <div className="price">
                      <span>￥{food.price*food.count}</span>
                      </div>
                      <div className="cartcontrol-wrapper">
                        <CartControl path={food.path}/>
                      </div>
                    </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="list-mask" style={{display: this.state.fold ? '' : 'none'}} onClick={()=>this.toggleList()}></div>
      </div>
    )
  }
}

const payDescComputed = (totalPrice,minPrice)=>{
  if(totalPrice===0) return `￥${minPrice}元起送`;
  if(totalPrice<minPrice) return `还差￥${minPrice -totalPrice}元起送`;
  return "去结算"
}
const mapStateToProps = state=>{
  const {goods, shoppingCart, seller} = state;
  let totalPrice = 0;
  let totalCount = 0;
  const selectFoods = shoppingCart.map((cur)=>{
    const path = cur.split('/');
    const food = goods[path[0]].foods[path[1]];
    totalPrice += food.count * food.price;
    totalCount += food.count;
    return {
      path,
      ...food
    };
  })
  const payDesc = payDescComputed(totalPrice,seller.minPrice);
  const payClass = totalPrice < seller.minPrice ? 'not-enough' : 'enough';
  return {
    selectFoods,
    totalPrice,
    totalCount,
    payDesc,
    payClass,
    deliveryPrice: seller.deliveryPrice
  }
}

const mapDispachToProps = dispatch=>{
  return {
    clearShoppingCart(){
      dispatch(emptyCart());
      dispatch(emptyChoice());
    }
  }
}
export default connect(mapStateToProps,mapDispachToProps)(Shopcart);