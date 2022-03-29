# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.1 (2022-03-18)


### Bug Fixes

* build assetsPublicPath config error ([a6bb800](https://github.com/yxw007/vue2.x-webpack.x/commit/a6bb8003bd1a500cb1a79afbfedb7339b7ad07d7))
* delete unuse code ([96ca94a](https://github.com/yxw007/vue2.x-webpack.x/commit/96ca94acf43e6b05e5a8d8fbc5a4c057a81c53c6))
* smp包裹一层会导致HtmlWebpackPlugin.getHook重新创建hooks对象，导致auto-external-plugin注册的alterAssetTags事件丢失，以至于无法注入配置的CDN，所以将smp挪至仅用于npm run build:analyzer方式打包查看分析结果 ([6c2e998](https://github.com/yxw007/vue2.x-webpack.x/commit/6c2e9986a408b326931b5bb00a3dfce7c96992dc))
