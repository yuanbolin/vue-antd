---
title: 全局API
lang: zn-CN
---
# 全局API
我们提供了一些全局Api，在日常功能开发中或许会有帮助，它们均被绑定到了页面组件或子组件实例上。  
在组件内可以直接通过`this.$[apiName]`的方式调用。如下：

## 权限
### $auth(check, permissions)
该api可以用于操作权限校验，接收两个参数：
* **check**  
需要要校验的操作权限
* **permissions**  
登录用户已有用操作权限，用于与check进行对比得出用户使用具有当前操作权限
