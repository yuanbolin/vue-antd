<template>
  <a-layout>
    <a-layout-sider
      theme="light"
      class="left-content"
      v-model="myCollapsed"
      :trigger="null"
      collapsible
    >
      <a-tooltip placement="right">
        <template slot="title">
          {{ myCollapsed ? $t("menu.collapsed") : $t("menu.noCollapsed") }}
        </template>
        <div class="left-menu">
          <span :hidden="myCollapsed">{{ $t("menu.title") }}</span>
          <a-icon
            class="trigger"
            :type="myCollapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (myCollapsed = !myCollapsed)"
          />
        </div>
      </a-tooltip>
      <search-tree
        :hidden="myCollapsed"
        @treeSelect="onSelect"
        :gData="treeData"
      ></search-tree>
    </a-layout-sider>
    <a-layout-content id="chatConent">
      <a-spin tip="Loading..." :spinning="loading">
        <div :style="{ height: height, background: '#fff' }">
          <antv-six :select-id="selectId" v-model="tempGroupJson"></antv-six>
          <div v-if="!tempGroupJson" class="emptyBox">
            <a-empty :description="$t('empty')" />
          </div>
        </div>
      </a-spin>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { process } from "@/services";
import SearchTree from "@/components/tree/SearchTree";
import AntVXSix from "./antvx6.vue";
import { mapState } from "vuex";
const CatalogueType = {
  DIRECTORY: "DIRECTORY",
  PROCESS: "PROCESS"
};
export default {
  name: "AntvShow",
  data() {
    return {
      treeData: [],
      myCollapsed: false,
      nodeData: {},
      visible: false,
      tempGroupJson: "",
      loading: false,
      selectId: "",
      height: "calc(100vh - 185px)"
    };
  },
  i18n: require("./i18n"),
  components: { "search-tree": SearchTree, "antv-six": AntVXSix },
  computed: {
    ...mapState("setting", ["fixedTabs"])
  },
  watch: {
    fixedTabs(val) {
      if (val) {
        this.height = "calc(100vh - 121px)";
      } else {
        this.height = "calc(100vh - 185px)";
      }
    }
  },
  created() {
    this.getTree();
    // this.getContent(this.$route.params.id);
  },
  methods: {
    getTree() {
      process
        .getAll({
          dirOnly: 0
        })
        .then(({ data }) => {
          if (data.code === "1000") {
            if (data.data) {
              const dataSource = this.childrenHandle(data.data);
              this.treeData = dataSource;
            } else {
              this.treeData = [];
            }
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    //将树形结构中children字段长度为0的数据的children字段删除
    childrenHandle(trees) {
      return trees.map(item => {
        if (item?.children && item.children.length === 0) {
          delete item.children;
        } else if (item?.children && item.children.length > 0) {
          this.childrenHandle(item.children);
        }
        return item;
      });
    },
    //获取流程图
    getContent(id) {
      this.loading = true;
      process
        .getContent({
          id
        })
        .then(({ data }) => {
          if (data.code === "1000") {
            if (data.data) {
              this.tempGroupJson = data.data;
              this.selectId = id + "";
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
    //左侧树形选择器的选中的key
    onSelect(selectedItem) {
      if (
        selectedItem?.type &&
        selectedItem.type.indexOf(CatalogueType.PROCESS) !== -1
      ) {
        this.getContent(selectedItem.id);
      }
    }
  }
};
</script>
<style lang="less">
@keyframes ant-line {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
<style lang="less" scoped="scoped">
.left-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 10px;
  font-weight: bold;
}
.left-content {
  padding: 0 5px;
  border: 1px solid #eee;
}
.emptyBox {
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
