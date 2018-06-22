import './ball.styl';
class Ball {
  constructor(startPos,endPos){
    this.create(startPos,endPos);
    
    setTimeout(()=>{
      this.drop(startPos);
    }, 100);
  }
  create(startPos,endPos){
    this.ball = document.createElement('div');
    this.ball.className = 'ball';
    this.inner = document.createElement('div');
    this.inner.className = 'inner';
    this.ball.appendChild(this.inner);
    this.ball.style.bottom = startPos.y + 'px';
    this.ball.style.left = startPos.x + 'px';
    
    this.ball.style.webkitTransform = `translate3d(0,-${endPos.y}px,0)`;
    this.ball.style.transform = `translate3d(0,-${endPos.y}px,0)`;
    this.inner.style.webkitTransform = `translate3d(${endPos.x}px,0,0)`;
    this.inner.style.transform = `translate3d(${endPos.x}px,0,0)`;

    document.body.appendChild(this.ball);
  }
  drop(){

    this.ball.style.webkitTransform = `translate3d(0,0,0)`;
    this.ball.style.transform = `translate3d(0,0,0)`;
    this.inner.style.webkitTransform = `translate3d(0,0,0)`;
    this.inner.style.transform = `translate3d(0,0,0)`;

    const event = 'onwebkittransitionend' in window ? 'webkitTransitionEnd' : 'transitionEnd';
    // 因为是 css transition 动画，所以要等到当前eventloop 结束，开始倒计时销毁；
    const destory = e=>{
      this.destory();
      this.ball.removeEventListener(event,destory);
      this.ball = null;
    };
    this.ball.addEventListener(event,destory,false)
  }
  destory(){
    document.body.removeChild(this.ball);
  }
}

export default Ball;