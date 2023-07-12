# uniswap-v3
状态：开发中

基于hardhat框架管理和发布uniswap v3
建议结合本文来深入了解源码：
1. [uniswap-v3设计详解](http://www.wjblog.top/articles/a0a6b822/) 

## 目录说明
frontend：前端代码
haddhat：合约，基于hardhat框架

## 合约编译
```shell
cd hardhat
npx hardhat compile
```

## 发布
```shell
# 2. 发布工厂合约
npx hardhat --network goerli run scripts/deploy_1_factory.js 
```

## 信息整理
使用本项目，goerli测试网自行发布信息如下：
1. [Factory合约](https://goerli.etherscan.io/address/0xC5F57433074986CD739900242033Ca5E5f6da4be)
