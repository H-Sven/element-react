import React,{Component} from 'react';
import Star from '../Star';
import Icon from '../Icon';
class SellerDetail extends Component {
  render(){
    const {y,seller,toggleDetail} = this.props;
    return (
      <div className="detail" style={{
        WebkitTransform: `translateY(-${y * 100}%)`,
        transform: `translateY(-${y * 100}%)`,
      }}>
        <div className="detail-wrapper clearfix">
          <div className="detail-main">
            <h1 className="name">
              {seller.name}
            </h1>
            <div className="star-warpper">
              <Star score={seller.score} size="48"/>
            </div>
          <div className="title">
            <div className="line"></div>
            <div className="text">优惠信息</div>
            <div className="line"></div>
          </div>
          
          {
            seller.supports && 
              <ul className="supports">
                {
                  seller.supports.map((item,index)=>(
                    <li className="support-item" key={index}>
                      <Icon type={item.type} iconNum='2'/>
                      <span className="text">{item.description}</span>
                    </li>
                  ))
                }
              </ul>
          }
            
          <div className="title">
                <div className="line"></div>
                <div className="text">商家公告</div>
                <div className="line"></div>
              </div>
              <div className="bulletin">
                <p className="content">{seller.bulletin}</p>
              </div>
          </div>
        </div>
        <div className="detail-close" onClick={toggleDetail}>
          <span className="icon-close"></span>
        </div>
      </div>
    )
  }
}

export default SellerDetail;