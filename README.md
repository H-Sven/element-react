# react 与 vue 对比使用心得

## 前言

> 刷了一波 react 文档,想找个东西练练手，在网上一看，什么实现一个 网易云、酷狗音乐、豆瓣 感觉找接口都够费神了,之前做过 vue 实现饿了么的一个系统，图片资源，mock 数据齐全，再加之样式写过了，所以直接就拿来用了。本文旨在浅显的描述一下写完这个项目的心得体会，欢迎斧正。这里是[项目地址](https://github.com/li2568261/element-react)和[项目展示地址](https://li2568261.github.io/element-react/)

## 1、 起手式

* 在经历了 1、vue-cli改编；2、generator-react-app（你可以看到整体项目目录还是有他的影子）；最终回到了 create-react-app，相比 vue-cli 的 webpack 模板，它使用样式预处理器需要1、npn run eject；2、自己往 loader 里塞东西,包括 build 的时候用到 extractTextPlugin。不熟悉 webpack 的人可能会有点 ~~egg pain~~ 不舒服。

* 当然你也可以选择官方推荐的方式和[react-app-rewired](https://github.com/timarney/react-app-rewired)；官方推荐的方式我觉得很不爽，因为你用 webpack 干嘛还要自己通过另外的方式去处理，react-app-rewired看上去是一种不错的解决方案，但是需要去找相应的插件，再者用惯了 vue-cli 没有看到相应的配置文件，很没有安全感啊。

## 2、 文档

> 简单的概括就是 react---shit,vue 真香（可能是本菜见过最棒的文档吧）。

## 3、 生命周期

* vue 生命周期（根据[生命周期图](https://cn.vuejs.org/images/lifecycle.png)以及项目经验自己假想，保证不正确，但是逻辑好像说的通，不深究了解一哈）

  1. 根据传入的 config,挂上mixin
  2. 通过 proxy 对对象属性进行的代理
  3. 初始化生命周期：vue 对象上属性赋值，包括一些$parent、$attrs、$root,然后挂上各种钩子函数，具体什么钩子就不哔哔了。
  4. 初始化事件：我理解就是 vue 对象的事件模型的初始化对应的 api 就是 [看这里](https://cn.vuejs.org/v2/api/#vm-on)。
  5. 调用 beforeCreated
  6. [provide + inject](https://cn.vuejs.org/v2/api/#provide-inject) + 响应式初始化（我理解就是初始化依赖收集队列,挂上definePrototype的set/get）
  7. 调用 created 钩子
  8. 有 el 找 template，没 el 先挂起等对象调用$mount 再找 template 
  9. 1、找 render 函数渲染，2、render 木有找 template 撸成 render 函数渲染，3、el 的 html 模板然后渲染，4、都木有？去死，上一步确保有了。
  10. 调用 beforeMount 钩子
  11. 渲染一波，然后把渲染后的元素赋值给 $el 并取代 el。
  12. 调mouted 钩子
  13. 监听数据改变然后对视图进行更新然后更新前后分别调用 beforeUpdate update 钩子；
  14. 当调用 distroy 进行销毁时，先调用 beforeDestory 钩子，然后对子组件、之前的收集的依赖、事件监听进行卸载。然后调用 destroy 的。

* react 生命周期(结合尝试经验和[这篇博客理解](https://www.cnblogs.com/qiaojie/p/6135180.html))

  1. 获取设置组件的 defaultProps 了改一哈；
  2. constructor 里初始化 state,据说 createReactClass 写法里是 getInitialState 钩子（我没用过）。
  ```javascript
    // getInitinalState 还有一个用法，就是无论啥时候都能用它获取到初始状态的，试想你重置表单？
    
    const a = this.getInitialState()
  ```
  1. 然后 willMouted + render + didMoutd
  2. 当父组件的props变化时 会调用 willRecevieProps(这里一度让我以为会存在 didRecevieProps，逼死强迫症啊)
  3. 当监听到 state 或者 props 发生变化（其实调用 setState 就会触发）的时候会调用 shouldComponentUpdate 钩子，根据返回值来确定是否需要重新调用 render；
  4. 当 shouldComponentUpdate 返回值为 true，调用 willUpdate 函数
  5. 当 shouldComponentUpdate 返回值为 false 啥也不干（皮一下真的很开心）
  6. 调用 render 函数
  7. didUpdate
  8. WillUnmount 组件被干掉前调用

总结一哈（一家之言）： 
  * vue 的前戏比较足，准备充分，当数据变化引发的更新开销小，某条数据改变能够根据依赖搜集快速的进行视图更新，而且提供了大量的 api 方便 coder；
  * react 前戏比较快，直接进入主题，首次渲染比较快，但是数据更新处理就需要重新构建树然后遍历，shouldComponentUpdate可以做部分性能优化。

## 4、 大 API 和小 API

> 同为渐进式框架，vue提供了大量的 API 对数据、视图去进行处理。

1. vue视图提供了一系列的指令控制视图，v-show、v-for、v-model...,react 的话都要通过自己display、map、onPrototypeChange...去实现
2. 关于数据处理，vue 有 filter,computed 对数据进行监听过滤，react。。。

就此而言 vue 的 code 开销可能少一点。。

## 5、状态管理

> 这里只比较 vuex 和 redux，说实话 redux 用的很不爽啊。

1. 改变数据: redux 是通过 reduder 返回。这特么就意味修改我每修改一次，哪怕是 a.b.c 这种层级，就要返回整个 state，为了精简必须得拆，当返回是一个索引类型滴我们就需要 [...a] 或者 {...a}要不然根本不会触发组件内 props 改变。vuex 通过 mutation 直接赋值即可，当有新属性添加Vue.$set。
2. 注入组件: react-redux 通过全局 Provider + 组件的 connect,通过 mapStateToProps + mapDispathToProps 将 state 和 dispatch 注入到组件的 props 中。vuex 是将 store 注入根节点，组件通过 $store 或者 mapxxx 进行访问。
3. 数据筛选 : react 在 mapStateToProps 中处理， vuex 在 getter 上处理。
4. 模块划分 : react 返回各个 reducer 然后 combine，vuex 是塞到 module 里。

## 6、生态

1. web 方面，vue 官推全家桶，到目前为止，vue 的一些开源组件也是很丰富的目前都能满足我所接触的业务要求。react 生态...感觉更大，因为可选项太多了，拿动画来说 motion、animated、groupCssTransition...(ps:groupCssTransition处理路由过渡动画的时候，有个坑，我比如我想实现 a->b 页面是从右到左的特效，b->a是从左到右的特效会存在一个老坑，具体大家可以把[RouterAnimation](https://github.com/li2568261/element-react/blob/master/src/router/RouterAnimation.js)的childFactory去掉试试，不详述。)从这点来说 react 更加 *渐进式* 一点；

2. native 方面，记得去年看 weex，我连官方 demo 都没跑起来，不知道现在咋样；react native 没跑过，不过很多成功案例，加上最近出的[泰罗奥特曼](https://github.com/NervJS/taro)听上去棒棒哒。

3. 微信小程序：wepy mpvue ??????我选择用原生主要是因为预览还要再开一个 ide 很不开心。


## 结

  emmmmmm....感觉有点帮助的点个赞吧。

