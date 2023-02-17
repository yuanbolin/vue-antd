<template>
  <a-modal
    :title="$t('chat.title')"
    :visible="visible"
    :width="820"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" :tab="$t('chat.tab1')">
        <a-descriptions title="" bordered>
          <a-descriptions-item :label="$t('chat.tab1_describe')" :span="3">
            {{ nodeData.description }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('chat.tab2')" force-render>
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="3" :tab="$t('chat.tab3')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="4" :tab="$t('chat.tab4')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="5" :tab="$t('chat.tab5')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="6" :tab="$t('chat.tab6')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="7" :tab="$t('chat.tab7')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="8" :tab="$t('chat.tab8')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
      <a-tab-pane key="9" :tab="$t('chat.tab9')">
        {{ $t("chat.dev") }}
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
export default {
  name: "NodeModal",
  i18n: require("./i18n"),
  props: {
    nodeData: {
      type: Object,
      default() {
        return {};
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["handleOk", "handleCancel", "callback"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleOk() {
      this.$emit("handleOk");
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    callback(val) {
      this.$emit("callback", val);
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.toolbar-container {
  width: 100%;
  height: 38px;
  background: #f1f3f4;
  border-width: 1px;
  border-color: lightgray;
  border-style: none none solid none;
  display: flex;
  flex-direction: row;
  align-items: center;
  .col {
    width: 100px;
    .toolbar-box {
      display: block;
      text-align: center;
      height: 38px;
      line-height: 38px;
      color: #555;
    }
    .toolbar-box:hover {
      background: #eee;
    }
    .toolbar-box.active {
      color: #aaaaaa;
    }
    .toolbar-box.active:hover {
      cursor: not-allowed;
    }
  }
  .small.col {
    width: 50px;
  }
  .line3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .toolbar-box {
      width: 30px;
    }
  }
}
.ant-dropdown-link {
  font-size: 18px;
}
.divider {
  background: #aaa;
}
.menu {
  .option {
    display: flex;
    flex-direction: row;
    .title {
      color: #555;
      width: 100px;
    }
    .state {
      width: 40px;
      text-align: center;
    }
  }
}
</style>
