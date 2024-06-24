

# 智能财务-小绿记账APP

一款基于OCR技术和ChatGPT的记账uniapp应用程序

<!-- PROJECT SHIELDS -->

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/ZiCongWong/Intelligent-Financial-Software">
    <img src="https://github.com/ZiCongWong/Intelligent-Financial-Software/blob/main/static/login-register/icon.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">小绿记账</h3>
  <p align="center">
    一款用VUE.js开发的uniapp，基于OCR技术和chatgpt的记账软件
    <br />
    <a href="https://github.com/ZiCongWong/Intelligent-Financial-Software"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ZiCongWong/Intelligent-Financial-Software/tree/main/">查看Demo</a>
    ·
    <a href="https://github.com/ZiCongWong/Intelligent-Financial-Software/issues">报告Bug</a>
    ·
    <a href="https://github.com/ZiCongWong/Intelligent-Financial-Software/issues">提出新特性</a>
  </p>



</p>


 本篇README.md面向开发者

## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [版本控制](#版本控制)
- [作者](#作者)


###### 开发前的配置要求

1. 安装Node.js
2. 安装HBuilder

###### **安装步骤**

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo

```sh
git clone https://github.com/ZiCongWong/Intelligent-Financial-Software.git
```

### 文件目录说明
eg:

```
filetree 
├─.hbuilderx
├─.idea
├─components  //组件代码
│  ├─banel
│  ├─banelOld
│  ├─certificate
│  ├─choseitem
│  ├─chosekind
│  ├─cmd-progress
│  ├─colhead
│  ├─detailsnav
│  ├─entry-message
│  ├─evan-switch
│  ├─fc
│  ├─goodsitem
│  ├─itemsprocess
│  ├─monthbudget
│  ├─monthchose
│  ├─mynav
│  ├─mynav2
│  ├─navhead
│  ├─navhead1
│  ├─process
│  ├─setPeriod
│  ├─showConsumption
│  ├─showRevenue
│  ├─tabbar
│  ├─tabbar2
│  └─tabbar3
├─contactus
├─demo
├─font  //字体文件
├─node_modules
│  ├─.bin
│  ├─@babel
│  ├─@vue
│  │  ├─composition-api
│  │  │  └─dist
│  │  └─devtools-api
│  │      └─lib
│  │          ├─cjs
│  │          │  └─api
│  │          └─esm
│  │              └─api
│  ├─pinia
│  │  └─dist
│  ├─qweather-icons
│  │  ├─font
│  │  │  └─fonts
│  │  └─icons
│  ├─vue
│  │  ├─dist
│  │  ├─src
│  │  │  ├─compiler
│  │  │  │  ├─codegen
│  │  │  │  ├─directives
│  │  │  │  └─parser
│  │  │  ├─core
│  │  │  │  ├─components
│  │  │  │  ├─global-api
│  │  │  │  ├─instance
│  │  │  │  │  └─render-helpers
│  │  │  │  ├─observer
│  │  │  │  ├─util
│  │  │  │  └─vdom
│  │  │  │      ├─helpers
│  │  │  │      └─modules
│  │  │  ├─platforms
│  │  │  │  ├─web
│  │  │  │  │  ├─compiler
│  │  │  │  │  │  ├─directives
│  │  │  │  │  │  └─modules
│  │  │  │  │  ├─runtime
│  │  │  │  │  │  ├─components
│  │  │  │  │  │  ├─directives
│  │  │  │  │  │  └─modules
│  │  │  │  │  ├─server
│  │  │  │  │  │  ├─directives
│  │  │  │  │  │  └─modules
│  │  │  │  │  └─util
│  │  │  │  └─weex
│  │  │  │      ├─compiler
│  │  │  │      │  ├─directives
│  │  │  │      │  └─modules
│  │  │  │      │      └─recycle-list
│  │  │  │      ├─runtime
│  │  │  │      │  ├─components
│  │  │  │      │  ├─directives
│  │  │  │      │  ├─modules
│  │  │  │      │  └─recycle-list
│  │  │  │      └─util
│  │  │  ├─server
│  │  │  │  ├─bundle-renderer
│  │  │  │  ├─optimizing-compiler
│  │  │  │  ├─template-renderer
│  │  │  │  └─webpack-plugin
│  │  │  ├─sfc
│  │  │  └─shared
│  │  └─types
│  ├─vue-demi
│  │  ├─bin
│  │  ├─lib
│  │  │  ├─v2
│  │  │  ├─v2.7
│  │  │  └─v3
│  │  └─scripts
│  └─vuex
│      ├─dist
│      └─types
├─pages  //页面前端代码
│  ├─account-setting
│  ├─binding-email
│  ├─binding-phone
│  ├─change-edition
│  ├─change-edition2
│  ├─clear-data
│  ├─concerning
│  ├─confirmbilling
│  ├─confirmbilling2
│  ├─confirmbilling3
│  ├─consumption-analysis
│  ├─consumption-details
│  ├─contactus
│  ├─details
│  ├─details2
│  ├─details3
│  ├─email-login
│  ├─export-data
│  ├─forget-getCertificate
│  ├─forget-id
│  ├─forget-setPassword
│  ├─Frequently-questions
│  ├─get-certified
│  ├─income-details
│  ├─index
│  ├─index2
│  ├─index3
│  ├─input
│  ├─Launch
│  ├─login
│  ├─manual-entry
│  ├─manual-entry2
│  ├─manual-entry3
│  ├─my
│  ├─my2
│  ├─my3
│  ├─register
│  ├─revenue-details
│  ├─save-period
│  ├─set-password
│  ├─set-period
│  ├─setting
│  ├─statistics
│  ├─statistics2
│  ├─statistics3
│  └─Tips-setting
├─static  //图片资源
│  ├─camera
│  ├─consumption-detail
│  ├─details3
│  ├─login-register
│  ├─manual-entry
│  ├─my3
│  ├─newTab
│  ├─setting
│  └─weather
├─store
├─uni_modules  //引用的组件
│  ├─qiun-data-charts
│  │  ├─components
│  │  │  ├─qiun-data-charts
│  │  │  ├─qiun-error
│  │  │  └─qiun-loading
│  │  ├─js_sdk
│  │  │  └─u-charts
│  │  └─static
│  │      ├─app-plus
│  │      └─h5
│  ├─uni-data-select
│  │  └─components
│  │      └─uni-data-select
│  ├─uni-datetime-picker
│  │  └─components
│  │      └─uni-datetime-picker
│  │          └─i18n
│  ├─uni-easyinput
│  │  └─components
│  │      └─uni-easyinput
│  ├─uni-file-picker
│  │  └─components
│  │      └─uni-file-picker
│  ├─uni-icons
│  │  └─components
│  │      └─uni-icons
│  ├─uni-load-more
│  │  └─components
│  │      └─uni-load-more
│  │          └─i18n
│  ├─uni-popup
│  │  └─components
│  │      ├─uni-popup
│  │      │  └─i18n
│  │      ├─uni-popup-dialog
│  │      ├─uni-popup-message
│  │      └─uni-popup-share
│  ├─uni-scss
│  │  └─styles
│  │      ├─setting
│  │      └─tools
│  └─uni-transition
│      └─components
│          └─uni-transition
├─unpackage
│  ├─cache
│  │  ├─apk
│  │  ├─cloudcertificate
│  │  └─wgt
│  │      └─__UNI__409E341
│  │          ├─.manifest
│  │          ├─font
│  │          ├─static
│  │          │  ├─camera
│  │          │  ├─consumption-detail
│  │          │  ├─details3
│  │          │  ├─login-register
│  │          │  ├─manual-entry
│  │          │  ├─my3
│  │          │  ├─newTab
│  │          │  ├─setting
│  │          │  └─weather
│  │          └─uni_modules
│  │              ├─qiun-data-charts
│  │              │  └─static
│  │              │      └─app-plus
│  │              └─uni-icons
│  │                  └─components
│  │                      └─uni-icons
│  ├─dist
│  │  ├─build
│  │  │  ├─.automator
│  │  │  │  └─app-plus
│  │  │  └─app-plus
│  │  │      ├─font
│  │  │      ├─static
│  │  │      │  ├─camera
│  │  │      │  ├─consumption-detail
│  │  │      │  ├─details3
│  │  │      │  ├─login-register
│  │  │      │  ├─manual-entry
│  │  │      │  ├─my3
│  │  │      │  ├─newTab
│  │  │      │  ├─setting
│  │  │      │  └─weather
│  │  │      └─uni_modules
│  │  │          ├─qiun-data-charts
│  │  │          │  └─static
│  │  │          │      └─app-plus
│  │  │          └─uni-icons
│  │  │              └─components
│  │  │                  └─uni-icons
│  │  └─dev
│  │      ├─.automator
│  │      │  ├─app-plus
│  │      │  └─mp-weixin
│  │      ├─.sourcemap
│  │      │  └─mp-weixin
│  │      │      ├─common
│  │      │      ├─components
│  │      │      │  ├─banel
│  │      │      │  ├─banelOld
│  │      │      │  ├─certificate
│  │      │      │  ├─choseitem
│  │      │      │  ├─chosekind
│  │      │      │  ├─cmd-progress
│  │      │      │  ├─colhead
│  │      │      │  ├─evan-switch
│  │      │      │  ├─fc
│  │      │      │  ├─goodsitem
│  │      │      │  ├─itemsprocess
│  │      │      │  ├─monthbudget
│  │      │      │  ├─monthchose
│  │      │      │  ├─mynav
│  │      │      │  ├─mynav2
│  │      │      │  ├─navhead
│  │      │      │  ├─navhead1
│  │      │      │  ├─process
│  │      │      │  ├─setPeriod
│  │      │      │  ├─showConsumption
│  │      │      │  ├─showRevenue
│  │      │      │  ├─tabbar
│  │      │      │  ├─tabbar2
│  │      │      │  └─tabbar3
│  │      │      ├─pages
│  │      │      │  ├─account-setting
│  │      │      │  ├─binding-email
│  │      │      │  ├─binding-phone
│  │      │      │  ├─change-edition
│  │      │      │  ├─change-edition2
│  │      │      │  ├─clear-data
│  │      │      │  ├─concerning
│  │      │      │  ├─confirmbilling
│  │      │      │  ├─confirmbilling2
│  │      │      │  ├─confirmbilling3
│  │      │      │  ├─consumption-analysis
│  │      │      │  ├─consumption-details
│  │      │      │  ├─contactus
│  │      │      │  ├─details
│  │      │      │  ├─details2
│  │      │      │  ├─details3
│  │      │      │  ├─email-login
│  │      │      │  ├─export-data
│  │      │      │  ├─forget-getCertificate
│  │      │      │  ├─forget-id
│  │      │      │  ├─forget-setPassword
│  │      │      │  ├─Frequently-questions
│  │      │      │  ├─get-certified
│  │      │      │  ├─income-details
│  │      │      │  ├─index
│  │      │      │  ├─index2
│  │      │      │  ├─index3
│  │      │      │  ├─input
│  │      │      │  ├─Launch
│  │      │      │  ├─login
│  │      │      │  ├─manual-entry
│  │      │      │  ├─manual-entry2
│  │      │      │  ├─manual-entry3
│  │      │      │  ├─my
│  │      │      │  ├─my2
│  │      │      │  ├─my3
│  │      │      │  ├─register
│  │      │      │  ├─revenue-details
│  │      │      │  ├─save-period
│  │      │      │  ├─set-password
│  │      │      │  ├─set-period
│  │      │      │  ├─setting
│  │      │      │  ├─statistics
│  │      │      │  ├─statistics2
│  │      │      │  ├─statistics3
│  │      │      │  └─Tips-setting
│  │      │      └─uni_modules
│  │      │          ├─qiun-data-charts
│  │      │          │  └─components
│  │      │          │      ├─qiun-data-charts
│  │      │          │      ├─qiun-error
│  │      │          │      └─qiun-loading
│  │      │          ├─uni-datetime-picker
│  │      │          │  └─components
│  │      │          │      └─uni-datetime-picker
│  │      │          ├─uni-easyinput
│  │      │          │  └─components
│  │      │          │      └─uni-easyinput
│  │      │          ├─uni-file-picker
│  │      │          │  └─components
│  │      │          │      └─uni-file-picker
│  │      │          ├─uni-icons
│  │      │          │  └─components
│  │      │          │      └─uni-icons
│  │      │          ├─uni-popup
│  │      │          │  └─components
│  │      │          │      └─uni-popup
│  │      │          └─uni-transition
│  │      │              └─components
│  │      │                  └─uni-transition
│  │      ├─app-plus
│  │      │  ├─font
│  │      │  ├─static
│  │      │  │  ├─camera
│  │      │  │  ├─consumption-detail
│  │      │  │  ├─details3
│  │      │  │  ├─login-register
│  │      │  │  ├─manual-entry
│  │      │  │  ├─my3
│  │      │  │  ├─newTab
│  │      │  │  ├─setting
│  │      │  │  └─weather
│  │      │  └─uni_modules
│  │      │      ├─qiun-data-charts
│  │      │      │  └─static
│  │      │      │      └─app-plus
│  │      │      └─uni-icons
│  │      │          └─components
│  │      │              └─uni-icons
│  │      └─mp-weixin
│  │          ├─common
│  │          ├─components
│  │          │  ├─banel
│  │          │  ├─banelOld
│  │          │  ├─certificate
│  │          │  ├─choseitem
│  │          │  ├─chosekind
│  │          │  ├─cmd-progress
│  │          │  ├─colhead
│  │          │  ├─evan-switch
│  │          │  ├─fc
│  │          │  ├─goodsitem
│  │          │  ├─itemsprocess
│  │          │  ├─monthbudget
│  │          │  ├─monthchose
│  │          │  ├─mynav
│  │          │  ├─mynav2
│  │          │  ├─navhead
│  │          │  ├─navhead1
│  │          │  ├─process
│  │          │  ├─setPeriod
│  │          │  ├─showConsumption
│  │          │  ├─showRevenue
│  │          │  ├─tabbar
│  │          │  ├─tabbar2
│  │          │  └─tabbar3
│  │          ├─font
│  │          ├─pages
│  │          │  ├─account-setting
│  │          │  ├─binding-email
│  │          │  ├─binding-phone
│  │          │  ├─change-edition
│  │          │  ├─change-edition2
│  │          │  ├─clear-data
│  │          │  ├─concerning
│  │          │  ├─confirmbilling
│  │          │  ├─confirmbilling2
│  │          │  ├─confirmbilling3
│  │          │  ├─consumption-analysis
│  │          │  ├─consumption-details
│  │          │  ├─contactus
│  │          │  ├─details
│  │          │  ├─details2
│  │          │  ├─details3
│  │          │  ├─email-login
│  │          │  ├─export-data
│  │          │  ├─forget-getCertificate
│  │          │  ├─forget-id
│  │          │  ├─forget-setPassword
│  │          │  ├─Frequently-questions
│  │          │  ├─get-certified
│  │          │  ├─income-details
│  │          │  ├─index
│  │          │  ├─index2
│  │          │  ├─index3
│  │          │  ├─input
│  │          │  ├─Launch
│  │          │  ├─login
│  │          │  ├─manual-entry
│  │          │  ├─manual-entry2
│  │          │  ├─manual-entry3
│  │          │  ├─my
│  │          │  ├─my2
│  │          │  ├─my3
│  │          │  ├─register
│  │          │  ├─revenue-details
│  │          │  ├─save-period
│  │          │  ├─set-password
│  │          │  ├─set-period
│  │          │  ├─setting
│  │          │  ├─statistics
│  │          │  ├─statistics2
│  │          │  ├─statistics3
│  │          │  └─Tips-setting
│  │          ├─static
│  │          │  ├─camera
│  │          │  ├─consumption-detail
│  │          │  ├─details3
│  │          │  ├─login-register
│  │          │  ├─manual-entry
│  │          │  ├─my3
│  │          │  ├─newTab
│  │          │  ├─setting
│  │          │  └─weather
│  │          └─uni_modules
│  │              ├─qiun-data-charts
│  │              │  └─components
│  │              │      ├─qiun-data-charts
│  │              │      ├─qiun-error
│  │              │      └─qiun-loading
│  │              ├─uni-datetime-picker
│  │              │  └─components
│  │              │      └─uni-datetime-picker
│  │              ├─uni-easyinput
│  │              │  └─components
│  │              │      └─uni-easyinput
│  │              ├─uni-file-picker
│  │              │  └─components
│  │              │      └─uni-file-picker
│  │              ├─uni-icons
│  │              │  └─components
│  │              │      └─uni-icons
│  │              ├─uni-popup
│  │              │  └─components
│  │              │      └─uni-popup
│  │              └─uni-transition
│  │                  └─components
│  │                      └─uni-transition
│  ├─release
│  │  └─apk
│  ├─res
│  │  └─icons
│  └─resources
└─util

```





### 开发的架构 

### 部署

HBuilder打开即可查看软件仿真

### 使用到的框架

- VUE.js

### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

1430095521@qq.com

hzc6665@gmail.com

qq:1430095521

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/ZiCongWong/Intelligent-Financial-Software/blob/main/LICENSE)



[license-url]: 
