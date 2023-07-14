# uniswap-v3
基于hardhat框架管理和发布uniswap v3
建议结合本文来深入了解源码：
1. [uniswap-v3设计详解](http://www.wjblog.top/articles/a0a6b822/) 

## 目录说明
frontend：前端代码，源自官方项目[interface](https://github.com/Uniswap/interface)  v3.3.6版
hardhat：合约，基于hardhat框架  
hardhat/contracts：其中有具体的solidity合约  
&emsp;&emsp;1. factory：为工厂合约，v3核心业务逻辑均在此处，源自官方项目 [v3-core](https://github.com/Uniswap/v3-core) 分支0.8
&emsp;&emsp;2. periphery：外围合约，该外围合约调用factory合约，实现完整的业务逻辑，，源自官方项目 [v3-periphery](https://github.com/Uniswap/v3-periphery)  分支0.8,其中包含以下几个独立合约：  
&emsp;&emsp;&emsp;&emsp;1. SwapRouter：路由合约，顾名思义，衔接工厂合约，接收外部请求，主要起中转作用  
&emsp;&emsp;&emsp;&emsp;2. NonfungiblePositionManager：NFT管理合约  
&emsp;&emsp;&emsp;&emsp;3. NonfungibleTokenPositionDescriptor：NFT仓位描述合约  
&emsp;&emsp;&emsp;&emsp;4. NFTDescriptor：NFT描述合约，这是一个library，需要和`NFT仓位描述`合约关联  

## 合约编译
```shell
cd hardhat
npx hardhat compile
```

## 发布合约
`说明`：weth9合约，可以查阅我以前uniswap-v2项目整合时的实现源码：[uniswap-v2 整合部署和发布](https://github.com/jason-wj/uniswap-v2)
我在goerli测试网部署的 [weth9合约](https://goerli.etherscan.io/address/0xFe33eC9960E430608030e92860264B486Ae99Ef2) 地址是：0xFe33eC9960E430608030e92860264B486Ae99Ef2
```shell
# 1. 发布工厂合约
npx hardhat --network goerli run scripts/deploy_1_factory.js 

# 2. 发布路由合约，其中需要在deploy脚本中传入两个参数：第一步的factory合约地址以及weth9合约地址
# 其中，weth9合约地址是什么，可以参考我上面的说明
npx hardhat --network goerli run scripts/deploy_2_router.js 

# 3. 发布NFT仓位描述合约
# 该发布涉及到一个NFTDescriptor的library合约发布
# 其中需要在deploy脚本中传入参数，第一个参数是weth9的合约地址，另一个是token名称(bytes32类型)，一般都是用`eth`表示，因此，一般情况，传入：`0x4554480000000000000000000000000000000000000000000000000000000000`即可
npx hardhat --network goerli run scripts/deploy_3_pd.js 

# 4. NFT管理合约发布
# 其中需要在deploy脚本中传入参数：第一步的factory合约地址，weth9合约地址，第三步的仓位描述合约地址
npx hardhat --network goerli run scripts/deploy_4_mgr.js 
```

## 前端部署
当前只是把官方的前端[interface](https://github.com/Uniswap/interface)  v3.3.6版，迁移过来了，但里面内容都还没改，使用的参数等都是官方默认的
```shell
cd frontend

# 先清一下缓存，以防编译异常，我遇到了，清理后一切恢复正常
yarn cache clean --force

# 启动
yarn start

# 备注：如果node verson>=17，需要加入如下环境变量
export NODE_OPTIONS=--openssl-legacy-provider

# 若要发布，可进行编译
yarn build
```


## 信息整理
使用本项目，goerli测试网自行发布信息如下：
1. [Factory合约](https://goerli.etherscan.io/address/0xC5F57433074986CD739900242033Ca5E5f6da4be) 对应合约地址：`0xC5F57433074986CD739900242033Ca5E5f6da4be`
2. [Router合约](https://goerli.etherscan.io/address/0x440402159426E17E6715E69D36253FeF77DB812B)  对应合约地址：`0x440402159426E17E6715E69D36253FeF77DB812B`
3. [NFT仓位描述合约](https://goerli.etherscan.io/address/0xd28EC177C8f347F4C759a9a15055Ccf1A66E2342)  对应合约地址：`0xd28EC177C8f347F4C759a9a15055Ccf1A66E2342`
4. [NFT管理合约发布](https://goerli.etherscan.io/address/0xA4B098cbd4a2DD037558e4888124B9fB6C732cE0)  对应合约地址：`0xA4B098cbd4a2DD037558e4888124B9fB6C732cE0`

