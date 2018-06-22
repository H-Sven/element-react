import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as shoppingCartAction from '@/stores/shoppingCart/actions';
import * as goodsAction from '@/stores/goods/actions';
import Ball from '../Ball';
import './cartcontrol.styl';
class CartControl extends Component {
  constructor(props){
    super();
    this.addCart = this.addCart.bind(this);
    this.decreaseCart = this.decreaseCart.bind(this);
  }
  addCart(e){
    const targetRect = e.target.getClientRects()[0];
    new Ball({
      x: 30,
      y: 30
    },{
      x: targetRect.left - 16,
      y: window.innerHeight - targetRect.top - 32
    })
    let count = this.props.count + 1;
    this.props.foodCountSet(count,this.props.count === 0 ? 1 : null);
    e.stopPropagation();
  }
  decreaseCart(e){
    if(this.props.count === 0)return;
    let count = this.props.count ? this.props.count - 1 : 0;
    this.props.foodCountSet(count, count === 0 ? 0 : null);
    e.stopPropagation();
  }
  render(){
    const {count} = this.props;
    return (
      <div className="cartcontrol">
        <div
          className={`cart-decrease ${count > 0 ? 'move-transition' : ''}`} onClick={e=>this.decreaseCart(e)}>
          <span className="inner icon-remove_circle_outline" ></span>
        </div>
        
        <div 
          className="cart-count"
          style={{display: count === 0 && 'none'}}>{count}</div>
        <div className="cart-add icon-add_circle" onClick={e=>this.addCart(e)}></div>
      </div>
    )
  }
}

const mapStateToProps = (state,selfProps)=>{
  const {path} = selfProps;
  return {
    count: state.goods[path[0]].foods[path[1]].count
  };
}
const mapDispatchToProps = (dispatch,selfProps)=>{
  return {
    foodCountSet: (count,signal)=>{
      dispatch(goodsAction.setFoodCount(selfProps.path,count));
      if(signal === 0){
        dispatch(shoppingCartAction.addCart(selfProps.path, 0))
      } else if(signal === 1){
        dispatch(shoppingCartAction.addCart(selfProps.path, 1))
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartControl);