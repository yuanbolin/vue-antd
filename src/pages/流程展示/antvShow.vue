<template>
  <a-layout>
    <a-layout-sider
      theme="light"
      class="left-content"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <a-tooltip placement="right">
        <template slot="title">
          {{ collapsed ? $t("menu.collapsed") : $t("menu.noCollapsed") }}
        </template>
        <div class="left-menu">
          <span :hidden="collapsed">{{ $t("menu.title") }}</span>
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </div>
      </a-tooltip>
      <search-tree
        :hidden="collapsed"
        @treeSelect="onSelect"
        :gData="treeData"
      ></search-tree>
    </a-layout-sider>
    <a-layout-content>
      <div class="antv-wrapper">
        <!--      展示节点信息-->
        <a-modal
          :title="$t('chat.title')"
          :visible="visible"
          :width="820"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" :tab="$t('chat.tab1')">
              <a-descriptions title="" bordered>
                <a-descriptions-item
                  :label="$t('chat.tab1_describe')"
                  :span="3"
                >
                  {{ nodeData.describe }}
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
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <a-button type="primary" @click="toPNG">{{
              $t("primary")
            }}</a-button>
          </div>
        </div>
        <div id="wrapper" class="wrapper-canvas"></div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { DataUri, Graph } from "@antv/x6";
import { configNodePorts } from "@/utils/antvSetting";
import SearchTree from "@/components/tree/SearchTree";
import { mapState } from "vuex";
// 反显数据
import resData from "./resData";

export default {
  name: "AntvShow",
  data() {
    return {
      treeData: [],
      collapsed: false,
      nodeData: {},
      visible: false
    };
  },
  i18n: require("./i18n"),
  components: { "search-tree": SearchTree },
  computed: {
    ...mapState("setting", ["collapsed", "fixedTabs", "activePage"])
  },
  watch: {
    /**
     * 因antvx6自适应窗口变化存在问题,改为自定义监听事件
     */
    collapsed() {
      setTimeout(() => {
        this.graph &&
          this.graph.resize(
            document.getElementById("main-content").offsetWidth - 180 - 48,
            document.getElementById("main-content").offsetHeight
          );
      }, 500);
    },
    fixedTabs() {
      setTimeout(() => {
        this.graph &&
          this.graph.resize(
            document.getElementById("main-content").offsetWidth - 180 - 48,
            document.getElementById("main-content").offsetHeight
          );
      }, 500);
    },
    /**
     * 因antvx6的Scroller在切换Tab页后中心位置偏移回左上角影响使用体验,此处加入切回页面后居中显示内容
     * @param val 切换路由的path值
     */
    activePage(val) {
      if (val.indexOf("/antvShow") !== -1 && this.graph) {
        this.graph.centerContent();
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.initGraph();
      this.treeData = [
        {
          id: 1, //主键id
          name: "营销", //名称
          message: "这是一个营销描述", //描述
          type: "catalogue", //类型 枚举值：目录，流程
          level: 1, // 树形结构等级
          public: 1, //是否公开
          children: [
            //子级
            {
              id: 11,
              name: "客户管理流程",
              public: 0,
              type: "info",
              message: "这是一个客户管理流程描述",
              level: 2
            },
            {
              id: 12,
              name: "产品",
              type: "catalogue",
              message: "产品",
              public: 1,
              level: 2,
              children: [
                {
                  id: 121,
                  type: "info",
                  name: "产品价格管理流程",
                  message: "产品价格管理流程",
                  public: 1,
                  level: 3
                }
              ]
            },
            {
              id: 13,
              name: "产品研发",
              type: "catalogue",
              message: "产品研发",
              public: 1,
              level: 2,
              children: [
                {
                  id: 131,
                  name: "产品研发成本",
                  type: "catalogue",
                  message: "产品研发成本",
                  public: 1,
                  level: 3,
                  children: [
                    {
                      id: 1311,
                      name: "产品研发成本控制流程",
                      type: "info",
                      message: "产品研发成本控制流程",
                      public: 0,
                      level: 4
                    },
                    {
                      id: 1312,
                      name: "产品研发成本汇报流程",
                      type: "info",
                      message: "产品研发成本汇报流程",
                      public: 1,
                      level: 4
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "战略与经营",
          type: "catalogue",
          message: "这是一个战略与经营描述",
          public: 1,
          level: 1
        }
      ];
    }, 500);
  },
  methods: {
    // 初始化渲染画布
    initGraph() {
      const graph = new Graph({
        container: document.getElementById("wrapper"),
        autoResize: true,
        mousewheel: {
          // 鼠标滚轮缩放画布
          enabled: true, // 开启
          zoomAtMousePosition: true, // 缩放点跟随鼠标位置
          modifiers: "alt", // 键盘按键, 触发方式变为:鼠标滚轮+键盘按键
          minScale: 0.5, // 最小缩放
          maxScale: 3 // 最大缩放
        },
        panning: true,
        interacting: false,
        connecting: {
          router: {
            name: "manhattan",
            args: {
              padding: 1
            }
          },
          connector: {
            name: "rounded",
            args: {
              radius: 8
            }
          },
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: {
            radius: 20
          }
        }
      });
      // 返现方法
      const portsGroups = configNodePorts().groups;
      if (resData.length) {
        const jsonTemp = resData.map(item => {
          if (item.ports) item.ports.groups = portsGroups;
          return item;
        });
        graph.fromJSON(jsonTemp);
      }
      graph.centerContent();

      // 画布事件
      graph.on("node:click", ({ node }) => {
        console.log(node.data);
        this.nodeData = node.data;
        this.visible = true;
      });
      // 画布事件
      graph.on("node:mouseenter", ({ node }) => {
        console.log(node);
      });
      graph.on("node:mouseleave", ({ node }) => {
        console.log(node);
      });

      //自适应窗口大小
      window.addEventListener("resize", () => {
        graph.resize(
          document.getElementById("main-content").offsetWidth - 180 - 48,
          document.getElementById("main-content").offsetHeight
        );
      });
      this.parentResize(graph);

      this.graph = graph;
    },
    //左侧树形选择器的选中的key
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    //编辑节点信息确认事件
    handleOk() {
      this.nodeData = {};
      this.visible = false;
    },
    //编辑节点信息取消事件
    handleCancel() {
      this.nodeData = {};
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //导出成png图片并下载
    toPNG() {
      this.graph.toPNG(
        dataUri => {
          console.log("toPNG===>", dataUri);
          // 下载
          DataUri.downloadDataUri(dataUri, "流程图.png");
        },
        {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }
        }
      );
    },
    /**
     * 流程窗口大小变化时,节点位置和大小自适应
     * @param graph
     */
    parentResize(graph) {
      graph.on("node:change:size", ({ node, options }) => {
        if (options.skipParentHandler) {
          return;
        }

        const children = node.getChildren();
        if (children && children.length) {
          node.prop("originSize", node.getSize());
        }
      });

      graph.on("node:change:position", ({ node, options }) => {
        if (options.skipParentHandler) {
          return;
        }

        const children = node.getChildren();
        if (children && children.length) {
          node.prop("originPosition", node.getPosition());
        }

        const parent = node.getParent();
        if (parent && parent.isNode()) {
          let originSize = parent.prop("originSize");
          if (originSize == null) {
            parent.prop("originSize", parent.getSize());
          }
          originSize = parent.prop("originSize");

          let originPosition = parent.prop("originPosition");
          if (originPosition == null) {
            parent.prop("originPosition", parent.getPosition());
          }
          originPosition = parent.prop("originPosition");

          let x = originPosition.x;
          let y = originPosition.y;
          let cornerX = originPosition.x + originSize.width;
          let cornerY = originPosition.y + originSize.height;
          let hasChange = false;

          const children = parent.getChildren();
          if (children) {
            children.forEach(child => {
              const bbox = child.getBBox();
              const corner = bbox.getCorner();

              if (bbox.x < x) {
                x = bbox.x;
                hasChange = true;
              }

              if (bbox.y < y) {
                y = bbox.y;
                hasChange = true;
              }

              if (corner.x > cornerX) {
                cornerX = corner.x;
                hasChange = true;
              }

              if (corner.y > cornerY) {
                cornerY = corner.y;
                hasChange = true;
              }
            });
          }

          if (hasChange) {
            parent.prop(
              {
                position: { x, y },
                size: { width: cornerX - x, height: cornerY - y }
              },
              // Note that we also pass a flag so that we know we shouldn't
              // adjust the `originPosition` and `originSize` in our handlers.
              { skipParentHandler: true }
            );
          }
        }
      });
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
.antv-wrapper {
  background: #fff;
  position: relative;
  height: 100vh;
  flex: 1;
  display: flex;
  .wrapper-canvas {
    flex: 1;
    position: relative;
  }
  .wrapper-tips {
    padding: 10px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    .wrapper-tips-item {
      span {
        padding-left: 10px;
        font-size: 12px;
      }
    }
  }
}
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
</style>
