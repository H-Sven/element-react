# react 与 vue 对比使用心得

## 前言

> 刷了一波 react 文档,想找个东西练练手，在网上一看，什么实现一个 网易云、酷狗音乐、豆瓣 感觉找接口都够费神了,之前做过 vue 实现饿了么的一个系统，图片资源，mock 数据齐全，再加之样式写过了，所以直接就拿来用了。本文旨在描述一下写完这个项目的心得体会，欢迎斧正。这里是[项目地址](https://github.com/li2568261/element-react)和[项目展示地址](https://li2568261.github.io/element-react/)

## 1、 起手式

* 在经历了 1、vue-cli改编；2、generator-react-app（你可以看到整体项目目录还是有他的影子）；最终回到了 create-react-app，相比 vue-cli 的 webpack 模板，它使用样式预处理器需要1、npn run eject；2、自己往 loader 里塞东西,包括 build 的时候用到 extractTextPlugin。不熟悉 webpack 的人可能会有点 ~~egg pain~~ 不舒服。

* 当然你也可以选择官方推荐的方式和[react-app-rewired](https://github.com/timarney/react-app-rewired)；官方推荐的方式我觉得很不爽，因为你用 webpack 干嘛还要自己通过另外的方式去处理，react-app-rewired看上去是一种不错的解决方案，但是需要去找相应的插件，再者用惯了 vue-cli 没有看到相应的配置文件，很没有安全感啊。

## 2、 文档

> 简单的概括就是 react---shit,vue 真香（可能是本菜见过最棒的文档吧）。

## 3、 生命周期

* vue 生命周期（根据生命周期图(https://cn.vuejs.org/images/lifecycle.png)以及项目经验自己假想，保证不正确，但是逻辑好像说的通，不深究了解一哈）

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
  2. constructor 里初始化 state,据说函数式写法里是 getInitialState 钩子（我没用过）。
  3. 然后 willMouted + render + didMoutd
  4. 当父组件的props变化时 会调用 willRecevieProps(这里一度让我以为会存在 didRecevieProps，逼死强迫症啊)
  5. 当监听到 state 或者 props 发生变化（其实调用 setState 就会触发）的时候会调用 shouldComponentUpdate 钩子，根据返回值来确定是否需要重新调用 render；
  6. 当 shouldComponentUpdate 返回值为 true，调用 willUpdate 函数
  7. 当 shouldComponentUpdate 返回值为 false 啥也不干（皮一下真的很开心）
  8. 调用 render 函数
  9. didUpdate
  10. WillUnmount 组件被干掉前调用
## 4、 大 API 和小 API

> 同为渐进式框架，vue提供了大量的 API 对数据、视图去进行处理。

1. vue视图提供了一系列的指令控制视图，v-show、v-for、v-model...,react 的话都要通过自己display、map、onPrototypeChange...去实现
2. 关于数据处理，vue 有 filter,computed 对数据进行监听过滤，react。。。

