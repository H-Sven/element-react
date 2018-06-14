import React,{Component} from 'react';
import {connect} from 'react-redux';
import Icon from '@/components/Icon';
import CartControl from '@/components/CartControl';
import BScroll from 'better-scroll';
import './goods.styl';
class Goods extends Component{
  constructor(props){
    super();
    this.$refs = {};
    this.listHeight = [];
    this.state = {
			goods: props.goods,
			scrollY:0,
      selectedFood:{},
      currentIndex: 0
		}
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      goods: nextProps.goods
    })
    this.$nextTick = ()=>{
      if(this.$refs.menuwrapper){
        this._caculateHeight();
        this._initScroll();
      };
    }
    
  }
  componentDidUpdate(){
    this.$nextTick && this.$nextTick();
    this.$nextTick = null;
  }
  _initScroll(){
    this.menuScroll = new BScroll(this.$refs.menuwrapper,{
      click:true
    });

    this.foodsScroll = new BScroll(this.$refs.foodswrapper,{
      probeType:3,
      click:true
    });

    this.foodsScroll.on("scroll",pos=>{
      const scrollY = Math.round(pos.y);
      let currentIndex = 0;
      if(scrollY < 0){
        const scrollCur = Math.abs(scrollY);
        for (let i = 0 ; i < this.listHeight.length;i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || (scrollCur >= height1 && scrollCur < height2)){
            currentIndex = i;
            break;
          }
        }
      }
      this.setState({
        currentIndex
      })
    })
  }
  _caculateHeight(){
    let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
    let height = 0;
    const listHeight = [0];
    [].forEach.call(foodList,(v,i)=>{
      height +=v.clientHeight;
      listHeight.push(height);
    })
    this.listHeight = listHeight;
  }
  selectMenu(index){
    let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
    this.foodsScroll.scrollToElement(foodList[index],200);
  }
  selectFood(food, event){
    if(!event._constructed){
      return;
    }
    this.selectedFood = food;
    this.$refs.food.show();
  }
  
  
  render(){
    const {
			goods,
      currentIndex
    } = this.state;
    if(!goods)return <div>暂无数据</div>;
    const selectFood = (food,e)=>{this.selectFood(food,e)}
    const selectMenu = (index,e)=>{this.selectMenu(index,e)}
    return (
      <div className="goods">
        <div className="menu-wrapper" ref={e=>this.$refs.menuwrapper = e}>
          <ul>
            {
              goods.map((item,index)=>
              <li onClick={(e)=>selectMenu(index,e)} key={'menu' + index} className={`menu-item ${currentIndex===index && 'current'}`}>
                <span className="text border-1px">
                  {item.type>0 && <Icon type={item.type} iconNum="3"/>}{item.name}
                </span>
              </li>)
            }
          </ul>
        </div>
        <div className="foods-wrapper" ref={(el) => { this.$refs.foodswrapper = el}}>
          <ul>
            {
              goods.map((item,index)=>(
                <li className="food-list food-list-hook" key={'good' + index}>
                  <h1 className="title">{item.name}</h1>
                  <ul>
                    { 
                      item.foods.map((food,foodIndex)=>
                      <li onClick={e=>selectFood(food, e)} className="food-item border-1px" key={`food-${index}-${foodIndex}`}>
                        <div className="icon">
                          <img width="57" height="57" src={food.icon} alt="食物图标" />
                        </div>
                        <div className="content">
                          <h2 className="name">{food.name}</h2>
                          <p className="desc">{food.description}</p>
                          <div className="extra">
                            <span className="count">月售{food.sellCount}份</span><span>好评率{food.rating}%</span>
                          </div>
                          <div className="price">
                            <span className="now">￥{food.price}</span>
                            {food.oldPrice && <span className="old">￥{food.oldPrice}</span>}
                          </div>
                          <div className="cartcontrol-wrapper">
                            <CartControl path={[index,foodIndex]}/>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
        {/* <shopcart ref="shopcart" delivery-price={seller.deliveryPrice} select-foods={selectFoods} min-price={seller.minPrice}></shopcart>
        <food food={selectedFood} ref={food=>{this.$refs.food = food}}></food> */}
      </div>
    )
  }
}

const mapStateToProps = state=>({
  seller: state.seller,
  goods: state.goods
})

export default connect(mapStateToProps)(Goods);