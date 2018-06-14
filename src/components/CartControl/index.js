import React,{Component} from 'react';
import {connect} from 'react-redux';
// import * as shoppingCartAction from '@/stores/shoppingCart/actions';
import * as goodsAction from '@/stores/goods/actions';
import './cartcontrol.styl';
class CartControl extends Component {
  constructor(props){
    super();
    this.addCart = this.addCart.bind(this);
    this.decreaseCart = this.decreaseCart.bind(this);
  }
  addCart(e){
    // console.log(1);
    let {count} = this.props;
    count = count ? count + 1 : 1;
    this.props.foodCountSet(count);
  }
  decreaseCart(e){
    let {count} = this.props;
    count = count ? count - 1 : 0;
    this.props.foodCountSet(count);
  }
  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
  }
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }
  render(){
    const {count} = this.props;
    return (
      <div className="cartcontrol">
        <div
          className={`cart-decrease ${count > 0 ? 'move-transition' : ''}`} onClick={this.decreaseCart}>
          <span className="inner icon-remove_circle_outline" ></span>
        </div>
        
        <div 
          className="cart-count"
          style={{display: count === 0 && 'none'}}>{count}</div>
        <div className="cart-add icon-add_circle" onClick={this.addCart}></div>
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
    foodCountSet: (count)=>{
      dispatch(goodsAction.setFoodCount(selfProps.path,count));
      // (count===0 || count === 1) && dispatch(shoppingCartAction.setFoodCount(selfProps.path));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartControl);