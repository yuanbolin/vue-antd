<template>
  <div class="antv-wrapper">
    <!--      编辑节点信息-->
    <node-modal
      :visible="visible"
      :node-data="nodeData"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
      @callback="callback"
    />
    <!--      流程图工具栏-->
    <my-toolbar
      :zoom="zoom"
      @changeZoom="changeZoom"
      @changeContent="changeContent"
      @toPNG="toPNG"
    ></my-toolbar>
    <div id="wrapper" class="wrapper-canvas"></div>
  </div>
</template>
<script>
import { DataUri, Graph } from "@antv/x6";
import { configNodePorts } from "@/utils/antvSetting";
import { mapState } from "vuex";
import { process } from "@/services";
import MyToolbar from "./components/Toolbar";
import NodeModal from "./components/NodeModal";
export default {
  name: "AntvShow",
  data() {
    return {
      zoom: 1, //画布缩放大小
      nodeData: {},
      visible: false
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    selectId: {
      type: String,
      default: ""
    }
  },
  components: {
    MyToolbar,
    NodeModal
  },
  i18n: require("./i18n"),
  computed: {
    ...mapState("setting", ["collapsed", "fixedTabs", "activePage"])
  },
  watch: {
    /**
     * 因antvx6的autoResize在切换Tab页后宽度会变成0,因此需要收到重新设置大小
     * @param val 切换路由的path值
     */
    activePage(val) {
      if (val.indexOf("/antvShow") !== -1 && this.showGraph) {
        this.showGraph.resize(
          document.getElementById("chatConent").offsetWidth,
          document.getElementById("chatConent").offsetHeight - 38
        );
        this.showGraph.centerContent();
      }
    },
    value: {
      handler: function() {
        if (this.value && this.showGraph) this.formJSON(this.showGraph);
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.initGraph();
    }, 1000);
  },
  methods: {
    // 初始化渲染画布
    initGraph() {
      if (this.showGraph) {
        this.isChange = false;
        this.isFirstChange = false;
        this.isPortsShow = false;
        this.menuItem = "";
        this.selectCell = "";
        this.editDrawer = false;
        // Graph.unregisterHTMLComponent("my-html2");
        // Graph.unregisterVueComponent("count");
        this.showGraph.dispose();
      }
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

      // 画布事件
      graph.on("node:click", ({ node }) => {
        //如果节点存有业务id及获取数据
        if (node.data?.id) {
          this.showModal(node.data?.id);
        } else {
          this.$message.warn("该节点未带有额外信息");
        }
      });
      this.formJSON(graph);
      this.showGraph = graph;
    },
    formJSON(graph) {
      //JSON内容解析渲染流程图内容
      if (this.value && JSON.parse(this.value).length) {
        const resArr = JSON.parse(this.value);
        // 导出的时候删除了链接桩设置加回来
        const portsGroups = configNodePorts().groups;
        if (resArr.length) {
          const jsonTemp = resArr.map(item => {
            if (item.ports) {
              item.attrs.body.cursor = "pointer";
              item.ports.groups = portsGroups;
            }
            return item;
          });
          graph.fromJSON(jsonTemp);
        }
      }
      graph.centerContent();
    },
    //编辑节点展示
    showModal(id) {
      if (id) {
        process
          .getNodeInfo({ nodeId: id })
          .then(({ data }) => {
            if (data.code === "1000") {
              if (data.data) {
                this.nodeData = { ...data.data };
                this.visible = true;
              }
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(() => {
            this.$message.error(this.$t("showModal.error"));
          });
      } else {
        this.visible = true;
      }
    },
    //编辑节点信息确认事件
    handleOk() {
      this.nodeData = {};
      this.visible = false;
    },
    //编辑节点信息取消事件
    handleCancel() {
      this.nodeData = {};
      this.visible = false;
    },
    /**
     * 改变画布缩放大小
     * @param val Number 改变画布缩放大小
     */
    changeZoom(val) {
      this.zoom = val;
      this.showGraph.zoomTo(val);
    },
    /**
     * 画布内容居中
     * @param val String "center"=内容居中显示 "zoomToFit"=内容居中并且缩放自适应内容大小
     */
    changeContent(val) {
      switch (val) {
        case "center":
          this.showGraph.centerContent();
          break;
        case "zoomToFit":
          this.showGraph.zoomToFit();
          this.zoom = this.showGraph.zoom();
          break;
      }
    },
    //导出成png图片并下载
    toPNG() {
      this.showGraph.toPNG(
        dataUri => {
          // 下载
          DataUri.downloadDataUri(dataUri, `${this.$t("toPNG.title")}.png`);
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
    //节点信息弹窗中的标签页切换事件,后续开发如需监听切换事件时用得到
    callback(key) {
      console.log(key);
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
  height: 100%;
  flex-direction: column;
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
</style>
