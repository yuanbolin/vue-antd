---
title: 自定义图标icon
lang: zn-CN
---
# 自定义图标icon
当Antd的icon组件库不满足您的要求时，Antd vue 支持使用阿里图标库中的海量图标。

浏览器访问地址：[阿里图标库](https://www.iconfont.cn/)

阿里图标库提供海量的图标素材资源，可搜索自己需要的图标。

找到图标后加入“购物车”，随后将“购物车”中的图标将其添加入”我的项目“中。

将图标添加到“我的项目”中后，选择“symbol”点击“暂无代码，点此生成”，随后将生成的代码链接复制。

将复制的连接黏贴入`/icons/index.js`。

```js {6}
// 自定义图标注册
  ...
    const MyIcon = Icon.createFromIconfontCN({
        scriptUrl: "//at.alicdn.com/t/c/font_3733031_scl5vl8wvne.js" // 在 iconfont.cn 上生成
    });
  ...
```

黏贴后即可通过`my-icon`使用标签

```js {6}
  <my-icon type="icon-xingzhuang-juxing" />
```
