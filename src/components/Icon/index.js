import React,{Component} from 'react';
import './icon.css';
const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
class Icon extends Component {
  render(){
    return (
      <span className="iconCp" 
	    style={{backgroundImage:`url(icon/${classMap[this.props.type]}_${this.props.iconNum}@${window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio}x.png)`}}></span>
    )
  }
}

export default Icon;