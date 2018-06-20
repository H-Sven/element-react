import React,{Component} from 'react';
import { TransitionGroup, CSSTransition} from "react-transition-group";

class RouterAnimation extends Component{
  render(){
    const { classNames, animationKey, children ,timeout} = this.props;
    return (
      <TransitionGroup
        childFactory={child =>
          React.cloneElement(child, {
            classNames
          })
        }
      >
        <CSSTransition
          children={children}
          timeout={timeout}
          key={animationKey}>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default RouterAnimation;