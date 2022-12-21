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
          {{ collapsed ? "展开" : "收起" }}
        </template>
        <div class="left-menu">
          <span :hidden="collapsed">流程目录选择</span>
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
          title="节点信息"
          :visible="visible"
          :width="820"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="基本信息">
              <a-descriptions title="" bordered>
                <a-descriptions-item label="节点描述" :span="3">
                  {{ nodeData.describe }}
                </a-descriptions-item>
              </a-descriptions>
            </a-tab-pane>
            <a-tab-pane key="2" tab="输入" force-render>
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="3" tab="输出">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="4" tab="操作规范">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="5" tab="指标">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="6" tab="风险控制点">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="7" tab="信息化">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="8" tab="关联标准">
              此功能仍在开发中...
            </a-tab-pane>
            <a-tab-pane key="9" tab="办理时限">
              此功能仍在开发中...
            </a-tab-pane>
          </a-tabs>
        </a-modal>
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <a-button type="primary" @click="toPNG">保存为PNG图片</a-button>
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
  components: { "search-tree": SearchTree },
  created() {},
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
