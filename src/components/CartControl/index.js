import React,{Component} from 'react';
import {connect} from 'react-redux';
// import * as shoppingCartAction from '@/stores/shoppingCart/actions';
import * as goodsAction from '@/stores/goods/actions';
import './cartcontrol.styl';
class CartControl extends Component {
  constructor(props){
    super();
    this.state = {
      food: {...props.food}
    }
  }
  componentWillReceiveProps(next){
    this.setState({
      food: {...next.food}
    })
  }
  addCart(){
    console.log('add');
    const food = this.state.food;
    const count = food.count ? food.count + 1 : 1;
    this.props.foodCountSet(count);
  }
  decreaseCart(){
    const food = this.state.food;
    const count = food.count ? food.count - 1 : 0;
    this.props.foodCountSet(count);
  }
  shouldComponentUpdate(nextProps){
    return nextProps.food.count !== this.state.food.count;
  }
  render(){
    const {food} = this.props;
    const decreaseCart = ()=>this.decreaseCart();
    const addCart = ()=>this.addCart();
    return (
      <div className="cartcontrol">
        <div
          style={{display: food.count === 0 && 'none'}}
          className={`cart-decrease ${food.count > 0 && 'move-transition'}`} onClick={e=>decreaseCart(e)}>
          <span className="inner icon-remove_circle_outline" ></span>
        </div>
        
        <div 
          className="cart-count"
          style={{display: food.count === 0 && 'none'}}>{food.count}</div>
        <div className="cart-add icon-add_circle" onClick={addCart}></div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch,selfProps)=>{
  return {
    foodCountSet: (count)=>{
      dispatch(goodsAction.setFoodCount(selfProps.food,count));
      // dispatch(shoppingCartAction.setFoodCount(selfProps.food,count));
    }
  }
}
export default connect(()=>({}), mapDispatchToProps)(CartControl);