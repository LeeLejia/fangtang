---
layout: post
title: "webpack基础"
date: 2018-04-23 18:14
comments: true
reward: false
toc: true
tags: 
	- 前端
	- webpack
---

## webpack

webpack是一个前端资源加载/打包工具，将根据模块依赖关系进行静态分析，并依据规则生成对应的静态资源。

### 使用条件

- 要求本地存在node环境

### 打包

- 通过命令 webpack main.js --output bundle.js 可以将main.js文件打包为bundle.js文件  
  此时，main.js如果**通过require依赖其他文件，其它文件会同时被打包**

- 通过安装loader加载器，**可以将静态的样式文件一同打包到bundle.js文件**中
  通过 npm install css-loader style-loader 安装加载器
  ```javascript
    require('!style-loader!css-loader!./style.css')
    // !!!./style.css 其中，style-loader和css-loader顺序不能变。
  ```
  
### 使用package.json文件

- 使用命令行 npm init 生成package.json
- 同目录下，npm install moduleName 将写入package.json

### 通过配置文件，简化打包

- 新建命名 webpack.config.js文件
    ```javascript
    module.exports ={
        entry: './src/js/show.js', 
        output:{
            path:__dirname+'/dist'
            filename:'bundle.js'
        },
        module:{
            loaders:[
                {
                    test:/\.css$/,
                    loader:'style-loader!css-loader'
                }
            ]
        }
    }
    // entry(输入): 配置输入的文件
    // output: 配置打包输出的文件目录和文件名
    // module: 指定对 entry输入文件的各种依赖文件类型使用哪种加载器
    ```
    目录下直接运行 webpack即可完成打包
    通过 webpack --watch 当所依赖文件被修改时将重新打包

### 安装第三方库

- 例如安装jQuery第三方库

    - npm install jquery --save--dev
    - 在代码中
        ```javascript
            var $=require('jquery')
            $('div').css({background:'blue'})
        ```

### 服务端环境安装

- 安装 webpack-dev-server 模块
- npm install webpack-dev-server --save-dev
- package.json scripts成员用于定义命令别名，用npm启动

- 服务端启动命令 webpack-dev-server --entry ./src/inputFile.js --output-filename ./dist/target.js
- 通过 webpack-dev-server --watch 当文件被修改时将重新打包到服务器
- 通过 webpack --watch 则不会被同步到服务器，需要手动刷新页面
- 在 webpack.config.js文件中可以配置该模块参数,如端口号等
    ```javascript
    module.exports ={
        entry: './src/js/show.js', 
        output:{
            ...
        },
        module:{
            ...
        },
        devServer:{
            port:8081
        }
    }
    ```