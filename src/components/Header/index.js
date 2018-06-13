import React,{Component} from 'react';
import {connect} from 'react-redux'
import {spring, Motion} from 'react-motion';
import SellerDetail from './SellerDetail';
import './header.styl';
import Icon from '../Icon';
class Header extends Component {
  constructor(){
    super();
    this.state = {
      detailHide: 1
    };
  }
  toggleDetail() {
    this.setState({
      detailHide: (this.state.detailHide + 1) % 2
    })
  }
  render(){
    const seller = this.props.seller;
    const toggleDetail = ()=>this.toggleDetail();
    if(!seller) return (<p className="no-data">暂无数据</p>)
    return(
      <header className="header">
        <div className="content-wrapper">
          <div className="avatar">
            <img width="64" height="64" alt="头像" src={seller.avatar}/>
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{seller.name}</span>
            </div>
            <div className="description">
              {seller.description}/{seller.deliveryTime}分钟送达
            </div>
            {
              seller.supports && <div className="support">
                <Icon type={seller.supports[0].type} iconNum={1}/>
                <span className="text">{seller.supports[0].description}</span>
              </div>
            }
            
          </div>
          <div v-if="seller.supports" className="support-count" onClick={toggleDetail}>
            <span className="count">{seller.supports.length}个</span>
            <i className="icon-keyboard_arrow_right"></i>
          </div>
        </div>
        <div className="bulletin-wrapper" onClick={toggleDetail}>
          <span className="bulletin-title"></span><span className="bulletin-text">{seller.bulletin}</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
        <div className="background">
          <img src={seller.avatar} alt="头像" width="100%" height="100%"/>
        </div>
        <Motion 
          defaultStyle={{y: 1}}
          style={{
            y:spring(this.state.detailHide,{stiffness: 300, damping: 40})
          }}
        >
          {
            ({y})=>(<SellerDetail y={y} seller={seller} toggleDetail={toggleDetail}/>)
          }
        </Motion>
        
      </header>
    )
  }
}
function mapStateToProps(state) {
  return {seller: state.seller};
}
export default connect(mapStateToProps)(Header);