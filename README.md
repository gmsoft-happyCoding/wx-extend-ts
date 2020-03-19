easy-mock-template-axios
---
基于 axios 的接口定义模板。

Documentation
---
[帮助文档](https://easy-mock.github.io/easy-mock-cli/)

### 此模板扩展的配置
1. `projects.urlPreprocessor` type `function`, url预处理, 在此你可以对你的每一个api url做调整
2. `projects.baseUrl` type `string`, default `"''"`
```javascript
// example
module.exports = {
  host: "http://192.168.2.11:7300",
  output: "./src/api", // 产出到项目下的 src/api 目录，不用手动创建
  template: "angular-moon/axios", // 指定生成模板
  projects: [
    {
      id: "5a5459145ca5151dd8559d0f", // easy-mock project id
      name: "xcjApi",
      urlPreprocessor: url => url.replace('/xcj-gateway', ''),
      baseUrl: 'process.env.REACT_APP_API_GATEWAY' // 如果baseUrl为字符串请使用 "'baseUrl'"
    }
  ]
};

```
