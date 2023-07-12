# uniswap-v3
状态：开发中,periphery的合约还不能使用。目前只有factory能够成功部署

基于hardhat框架管理和发布uniswap v3
建议结合本文来深入了解源码：
1. [uniswap-v3设计详解](http://www.wjblog.top/articles/a0a6b822/) 

## 目录说明
frontend：前端代码
hardhat：合约，基于hardhat框架
hardhat/contracts：其中有具体的solidity合约
    1. factory：为工厂合约，v3核心业务逻辑均在此处
    2. periphery：外围合约，其中包括路由合约，nft等等，该外围合约调用factory合约，实现完整的业务逻辑

## 合约编译
```shell
cd hardhat
npx hardhat compile
```

## 发布
```shell
# 1. 发布工厂合约
npx hardhat --network goerli run scripts/deploy_1_factory.js 

# 2. 发布路由合约，其中需要传入两个参数：factory合约地址以及weth9合约地址
# 其中factory合约地址使用第一步返回的地址，weth9合约地址用的是我以前发布的地址（详见下面备注）
# 当前该合约由于依赖问题，还异常，后续处理
npx hardhat --network goerli run scripts/deploy_2_router.js 
```
`备注`：weth9合约，可以查阅我以前uniswap-v2项目整合时的实现源码：[uniswap-v2 整合部署和发布](https://github.com/jason-wj/uniswap-v2)

## 信息整理
使用本项目，goerli测试网自行发布信息如下：
1. [Factory合约](https://goerli.etherscan.io/address/0xC5F57433074986CD739900242033Ca5E5f6da4be)
