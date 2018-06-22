# react 与 vue 对比使用心得

## 前言

> 刷了一波 react 文档,想找个东西练练手，在网上一看，什么实现一个 网易云、酷狗音乐、豆瓣 感觉找接口都够费神了,之前做过 vue 实现饿了么的一个系统，图片资源，mock 数据齐全，再加之样式写过了，所以直接就拿来用了。本文旨在描述一下写完这个项目的心得体会，欢迎斧正。

## 1、 起手式

* 在经历了 1、vue-cli改编；2、generator-react-app（你可以看到整体项目目录还是有他的影子）；最终回到了 create-react-app，相比 vue-cli 的 webpack 模板，它使用样式预处理器需要1、npn run eject；2、自己往 loader 里塞东西,包括 build 的时候用到 extractTextPlugin。不熟悉 webpack 的人可能会有点 ~~egg pain~~ 不舒服。

* 当然你也可以选择官方推荐的方式和[react-app-rewired](https://github.com/timarney/react-app-rewired)；官方推荐的方式我觉得很不爽，因为你用 webpack 干嘛还要自己通过另外的方式去处理，react-app-rewired看上去是一种不错的解决方案，但是需要去找相应的插件，再者用惯了 vue-cli 没有看到相应的配置文件，很没有安全感啊。

## 2、 大 API 和小 API

> 同为渐进式框架，vue提供了大量的 API 对数据、视图去进行处理。

1. vue视图提供了一系列的指令控制视图，v-show、v-for、v-model...,react 的话都要通过自己display、map、onPrototypeChange...去实现
2. 关于数据处理，vue 有 filter,computed 对数据进行监听过滤，react。。。

## 3、 生命周期

* vue 生命周期

  1. 通过 proxy 对对象属性进行的代理
  2. 挂上mixin后会对 vue 对象上属性赋值，包括一些$parent、$attrs、$root