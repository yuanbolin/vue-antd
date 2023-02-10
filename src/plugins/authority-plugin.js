/**
 * 判断是否已为方法注入权限认证
 * @param method
 * @returns {boolean}
 */
const hasInjected = method =>
  method.toString().indexOf("//--auth-inject") !== -1;

const checkInject = function(el, binding, vnode) {
  const check = binding.value;
  const instance = vnode.context;
  const $auth = instance.$auth;
  const { authority } = vnode.context.$route.meta;
  console.log("authority", authority);
  if (!$auth || !$auth(check, authority)) {
    addDisabled(el);
  } else {
    removeDisabled(el);
  }
};

const addDisabled = function(el) {
  if (el.tagName === "BUTTON") {
    el.disabled = true;
  } else {
    el.classList.add("disabled");
  }
  el.setAttribute("title", "无此权限");
};

const removeDisabled = function(el) {
  el.disabled = false;
  el.classList.remove("disabled");
  el.removeAttribute("title");
};

const AuthorityPlugin = {
  install(Vue) {
    Vue.directive("auth", {
      bind(el, binding, vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10);
      },
      componentUpdated(el, binding, vnode) {
        setTimeout(() => checkInject(el, binding, vnode), 10);
      },
      unbind(el) {
        removeDisabled(el);
      }
    });
    Vue.mixin({
      beforeCreate() {
        if (this.$options.authorize) {
          const authorize = this.$options.authorize;
          Object.keys(authorize).forEach(key => {
            if (this.$options.methods[key]) {
              const method = this.$options.methods[key];
              if (!hasInjected(method)) {
                let check = authorize[key];
                const authority =
                  this.$route.meta?.authority instanceof Array
                    ? this.$route.meta?.authority
                    : [];
                this.$options.methods[key] = function() {
                  //--auth-inject
                  console.log("authority", authority);
                  if (this.$auth(check, authority)) {
                    return method.apply(this, arguments);
                  } else {
                    this.$message.error(`对不起，您没有操作权限：${check}`);
                    return 0;
                  }
                };
              }
            }
          });
        }
      },
      methods: {
        /**
         * 操作权限校验
         * @param check 需要校验的操作名
         * @param permissions 登录用户已有用操作权限，用于与check进行对比得出用户使用具有当前操作权限
         * @returns {boolean} 是否校验通过
         */
        $auth(check, permissions) {
          return permissions.indexOf(check) !== -1;
        }
      }
    });
  }
};

export default AuthorityPlugin;
