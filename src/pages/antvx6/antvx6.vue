<template>
  <div class="all">
    <div class="antv-content" :style="{ height: height }">
      <!--      左侧图形列表-->
      <my-graph
        :is-change="isChange"
        @menuDrag="menuDrag"
        @handlerSend="handlerSend"
      ></my-graph>
      <div class="antv-wrapper">
        <!--      流程图工具栏-->
        <my-toolbar
          :is-change="isChange"
          :is-first-change="isFirstChange"
          :is-ports-show="isPortsShow"
          :can-redo="canRedo"
          :can-undo="canUndo"
          :zoom="zoom"
          :visiable-grid="visiableGrid"
          @handlerSend="handlerSend"
          @clearCellsHandle="clearCellsHandle"
          @changeZoom="changeZoom"
          @changeGrid="changeGrid"
          @changeContent="changeContent"
          @changePortsShow="changePortsShow"
          @undoHandle="undoHandle"
          @redoHandle="redoHandle"
          @toPNG="toPNG"
        ></my-toolbar>
        <!--      流程图绘制区域-->
        <div class="ChatBox">
          <div id="wrapper" @drop="drop($event)" @dragover.prevent />
        </div>
      </div>
    </div>
    <contextmenu
      :itemList="menuItemList"
      :visible.sync="menuVisible"
      @select="onMenuSelect"
    />
    <!--      编辑节点和连线样式-->
    <cell-style
      :form="form"
      :label-form="labelForm"
      :edit-title="editTitle"
      :edit-drawer="editDrawer"
      @changeEdgeAnit="changeEdgeAnit"
      @changeEdgeArrows="changeEdgeArrows"
      @changeEdgeStrokeWidth="changeEdgeStrokeWidth"
      @changeEdgeConnector="changeEdgeConnector"
      @updateEdgeValue="updateEdgeValue"
      @changeEdgeLabel="changeEdgeLabel"
      @updateNodeValue="updateNodeValue"
      @changeNode="changeNode"
      @closeEditForm="closeEditForm"
    ></cell-style>
    <!--      编辑节点信息-->
    <node-modal
      ref="NodeModal"
      :rules="rules"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :info-form="infoForm"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
      @callback="callback"
    />
  </div>
</template>
<script>
import "@antv/x6-vue-shape";
import { Graph, Shape, DataUri } from "@antv/x6";
import _ from "lodash";
import { process } from "@/services";
import Count from "./components/Count.vue";
import Contextmenu from "@/components/menu/Contextmenu";
import MyGraph from "./components/Graph";
import MyToolbar from "./components/Toolbar";
import CellStyle from "./components/CellStyle";
import NodeModal from "./components/NodeModal";
import {
  configSetting,
  configNodeShape,
  configNodePorts,
  configEdgeLabel,
  graphBindKey
} from "@/utils/antvSetting";
import { mapState } from "vuex";

export default {
  name: "AntV6X",
  components: {
    CellStyle,
    MyGraph,
    MyToolbar,
    NodeModal,
    Contextmenu
  },
  /**
   * 这个是作为子组件分别接受了两个数据一个是高度height，一个是反显图表数据tempGroupJson
   * 作为子组件例子 <AntVXSix v-model="tempGroupJson" height="720px" />
   *
   */
  model: {
    prop: "value",
    event: "finish"
  },
  props: {
    height: {
      type: String,
      default: "720px" // '720px'
    },
    value: {
      type: String,
      default: ""
    }
  },
  i18n: require("./i18n"),
  data() {
    return {
      graph: null, //画布
      zoom: 1, //画布缩放大小
      visiableGrid: true,
      isChange: false, //是否绘制，修改过
      isFirstChange: false, //是否绘制，修改过
      isPortsShow: false, //锚点是否长显
      menuItem: "", //拖拽生成的节点
      selectCell: "", //选中的基类
      editDrawer: false, //抽屉是否显示
      editTitle: "", //编辑样式标题
      form: {}, //样式表单
      labelForm: {
        //连线默认样式
        fontColor: "#333",
        fill: "#FFF",
        stroke: "#555"
      },
      infoForm: {}, //基本信息表单
      rules: {
        description: [
          {
            required: true,
            message: "请输入节点描述",
            whitespace: true,
            trigger: "blur"
          },
          {
            min: 2,
            max: 50,
            whitespace: true,
            message: "字符长度应在2到50之间",
            trigger: "change"
          }
        ]
      },
      menuVisible: false, //右击导航是否显示
      contextmenuType: "", //右击的节点类型
      visible: false, //弹窗是否显示
      confirmLoading: false, //节点信息提交状态
      canRedo: false, //是否可重做
      canUndo: false //是否可撤销
    };
  },
  computed: {
    ...mapState("setting", ["collapsed", "fixedTabs", "activePage"]),
    // 右击导航列表
    menuItemList() {
      let arr = [];
      switch (this.contextmenuType) {
        case "node":
          arr = [
            {
              key: "1",
              icon: "highlight",
              text: this.$t("menu.nodeStyleEdit")
            },
            { key: "2", icon: "edit", text: this.$t("menu.nodeInfoEdit") },
            { key: "3", icon: "delete", text: this.$t("menu.nodeDelete") }
          ];
          break;
        case "edge":
          arr = [
            {
              key: "4",
              icon: "highlight",
              text: this.$t("menu.edgeStyleEdit")
            },
            { key: "3", icon: "delete", text: this.$t("menu.edgeDelete") }
          ];
          break;
      }
      return arr;
    }
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
      if (val.indexOf("/antvx6/") !== -1 && this.graph) {
        this.graph.centerContent();
      }
    },
    value: {
      handler: function() {
        if (this.value && this.graph) this.formJSON(this.graph);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.debounce = _.debounce(this.dataSave, 500);
  },
  mounted() {
    setTimeout(() => {
      this.initGraph();
    }, 1000);
  },
  beforeDestroy() {
    //卸载前清理注册内容
    this.graph && this.graph.dispose();
    //清楚防抖函数
    this.debounce && this.debounce.cancel();

    // Graph.unregisterHTMLComponent("my-html2");
    // Graph.unregisterVueComponent("count");
  },
  methods: {
    // 链接桩的显示与隐藏，主要是照顾菱形
    changePortsShow(val) {
      const container = document.getElementById("wrapper");
      const ports = container.querySelectorAll(".x6-port-body");
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = val ? "visible" : "hidden";
      }
      this.isPortsShow = val;
    },
    // 初始化渲染画布并添加监听事件
    initGraph() {
      if (this.graph) {
        this.isChange = false;
        this.isFirstChange = false;
        this.isPortsShow = false;
        this.menuItem = "";
        this.selectCell = "";
        this.editDrawer = false;
        // Graph.unregisterHTMLComponent("my-html2");
        // Graph.unregisterVueComponent("count");
        this.graph.dispose();
      }
      const graph = new Graph({
        container: document.getElementById("wrapper"),
        ...configSetting(Shape)
      });

      //历史记录（撤销/重做） 因目前为自动保存模式,顾注释掉历史记录功能
      // graph.history.on("undo", args => {
      //   // code here
      //   console.log("undo", args);
      // });
      // graph.history.on("redo", args => {
      //   // code here
      //   console.log("redo", args);
      // });
      // graph.history.on("change", args => {
      //   console.log("history change", args);
      //   this.canRedo = graph.history.canRedo();
      //   this.canUndo = graph.history.canUndo();
      // });

      //添加点/边自带工具
      graph.on("cell:mouseenter", ({ cell }) => {
        if (cell.isNode()) {
          //如果是点，则不添加自带工具（目前点自带工具实用性不高、不美观，故不采用）
        } else {
          //如果是边，添加线段和路径点工具
          cell.addTools(["vertices", "segments"]);
        }
      });

      //清除工具
      graph.on("cell:mouseleave", ({ cell }) => {
        cell.removeTools();
      });

      //自适应窗口大小
      window.addEventListener("resize", () => {
        graph.resize(
          document.getElementById("main-content").offsetWidth - 180 - 48,
          document.getElementById("main-content").offsetHeight - 40
        );
      });
      this.parentResize(graph);

      // 节点鼠标事件
      graph.on("node:mouseenter", () => {
        this.changePortsShow(true);
      });
      graph.on("node:mouseleave", () => {
        if (this.isPortsShow) return;
        this.changePortsShow(false);
      });

      // 基类右击编辑
      graph.on("cell:contextmenu", ({ cell }) => {
        this.editForm(cell);
      });

      // 画布键盘事件
      graphBindKey(graph);
      // 监听键盘删除事件
      graph.bindKey(["delete", "backspace"], () => {
        this.handlerDel();
      });

      //基类选中事件
      graph.on("cell:selected", ({ cell }) => {
        console.log("节点/边被选中", cell);
      });

      //监听基类变化
      graph.on("cell:change:*", ({ cell, index, options }) => {
        console.log(cell, index, options);
        this.debounce({ cell, index, options });
      });
      graph.on("cell:added", ({ cell, index, options }) => {
        this.debounce({ cell, index, options });
      });
      graph.on("cell:removed", ({ cell, index, options }) => {
        this.debounce({ cell, index, options });
      });
      this.formJSON(graph);
      // 赋值
      this.graph = graph;
    },
    formJSON(graph) {
      //JSON内容解析渲染流程图内容
      if (this.value && JSON.parse(this.value).length) {
        const resArr = JSON.parse(this.value);
        // 导出的时候删除了链接桩设置加回来
        const portsGroups = configNodePorts().groups;
        if (resArr.length) {
          const jsonTemp = resArr.map(item => {
            if (item.ports) item.ports.groups = portsGroups;
            return item;
          });
          console.log("value", jsonTemp);
          graph.fromJSON(jsonTemp);
        }
      }
    },
    /**
     * 画布内容居中
     * @param val String "center"=内容居中显示 "zoomToFit"=内容居中并且缩放自适应内容大小
     */
    changeContent(val) {
      switch (val) {
        case "center":
          this.graph.centerContent();
          break;
        case "zoomToFit":
          this.graph.zoomToFit();
          this.zoom = this.graph.zoom();
          break;
      }
    },
    /**
     * 改变画布缩放大小
     * @param val Number 改变画布缩放大小
     */
    changeZoom(val) {
      this.zoom = val;
      this.graph.zoomTo(val);
    },
    /**
     * 是否显示网格
     * @param val Booleaan
     */
    changeGrid(val) {
      this.visiableGrid = val;
      if (val) {
        this.graph.showGrid();
      } else {
        this.graph.hideGrid();
      }
    },
    /**
     * 自定义HTML节点和VUE组件示例
     * 后续如有开发自定义节点需求可参考
     */
    vueExample() {
      // 方式1：注册 vue component
      Graph.registerVueComponent(
        "count",
        {
          template: `<Count v-on:test1="test1"/>`,
          components: {
            Count
          },
          methods: {
            test1: this.test1
          }
        },
        true
      );

      this.graph.addNode({
        id: "1",
        shape: "vue-shape",
        x: 200,
        y: 150,
        width: 400,
        height: 100,
        ports: configNodePorts(),
        component: "count",
        data: {
          num: 0,
          parent: true // 节点组标识
        }
      });
    },
    HTMLExample() {
      // 注册html组件
      // 注册返回 HTML 元素的函数
      Graph.registerHTMLComponent("my-html2", {
        render: node => {
          const data = node.getData();
          return `<div>
          <span>${data.time}</span>
        </div>`;
        },
        shouldComponentUpdate(node) {
          // 控制节点重新渲染
          return node.hasChanged("data");
        }
      });
      const node = this.graph.addNode({
        x: 40,
        y: 40,
        width: 250,
        height: 40,
        shape: "html",
        html: "my-html2",
        ports: configNodePorts(),
        data: {
          time: new Date().toString()
        }
      });
      setInterval(() => {
        node.setData({
          time: new Date().toString()
        });
      }, 1000);
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
    },
    //历史记录操作-撤回
    undoHandle() {
      this.graph.history.undo();
    },
    //历史记录操作-重做
    redoHandle() {
      this.graph.history.redo();
    },
    //清空整个画布
    clearCellsHandle() {
      this.graph.clearCells();
    },
    // 画布是否有变动
    isChangeValue(val) {
      this.isChange = val;
      if (!this.isFirstChange) this.isFirstChange = true;
    },
    /**
     * 节点拖拽事件
     * @param type 拖拽的节点类型
     */
    menuDrag(type) {
      // 根据type获取到不同节点的预设参数
      this.menuItem = configNodeShape(type);
    },
    /**
     * 拖拽的节点放入流程图事件,根据鼠标位置渲染拖拽类型的节点,并放入自定义的连接桩
     * @param event
     */
    drop(event) {
      // 节点预设 ，添加位置信息和链接桩信息组合成完整的节点
      const nodeItem = {
        ...this.menuItem,
        x: event.offsetX - this.menuItem.width / 2,
        y: event.offsetY - this.menuItem.height / 2,
        ports: configNodePorts()
      };
      // 创建节点
      this.graph.addNode(nodeItem);
    },
    // 点击编辑更具不同的内容获取编辑数据
    editForm(cell) {
      if (this.selectCell) this.selectCell.removeTools(); // 删除修改线的工具
      this.selectCell = cell;
      // 编辑node节点
      if (
        cell.isNode() &&
        cell.data.type &&
        cell.data.type.includes("default")
      ) {
        this.contextmenuType = "node";
        this.menuVisible = true;
      }
      // 编辑连线
      if (!cell.isNode() && cell.shape === "edge") {
        this.contextmenuType = "edge";
        this.menuVisible = true;
      }
    },
    //编辑节点样式
    editNodeStyle() {
      const cell = this.selectCell;
      if (!cell.isNode()) return;
      this.editTitle = this.$t("editNode.title");
      const body =
        cell.attrs.body ||
        cell.attrs.rect ||
        cell.attrs.polygon ||
        cell.attrs.circle;
      this.form = {
        labelText: cell.attrs.label.text || "",
        fontSize: cell.attrs.label.fontSize || 14,
        fontFill: cell.attrs.label.fill || "",
        fill: body.fill || "",
        stroke: body.stroke || ""
      };
      return (this.editDrawer = true);
    },
    //编辑边样式
    editEdgeStyle() {
      const cell = this.selectCell;
      if (!cell.isEdge()) return;
      this.editTitle = this.$t("editEdge.title");
      this.form = {
        label:
          cell.labels && cell.labels[0]
            ? cell.labels[0].attrs.labelText.text
            : "",
        stroke: cell.attrs.line.stroke || "",
        connector: cell.getConnector()?.name || "rounded",
        strokeWidth: cell.attrs.line.strokeWidth || "",
        isArrows: !!cell.attrs.line.sourceMarker,
        isAnit: !!cell.attrs.line.strokeDasharray,
        isTools: false
      };
      // 看连线上是否有label
      const edgeCellLabel =
        (cell.labels && cell.labels[0] && cell.labels[0].attrs) || false;
      if (this.form.label && edgeCellLabel) {
        this.labelForm = {
          fontColor: edgeCellLabel.labelText.fill || "#333",
          fill: edgeCellLabel.labelBody.fill || "#fff",
          stroke: edgeCellLabel.labelBody.stroke || "#555"
        };
      } else {
        this.labelForm = { fontColor: "#333", fill: "#FFF", stroke: "#555" };
      }
      return (this.editDrawer = true);
    },
    //关闭form抽屉
    closeEditForm() {
      this.editDrawer = false;
      if (this.selectCell) this.selectCell.removeTools();
    },
    // 修改普通节点
    changeNode(type, value) {
      switch (type) {
        case "labelText":
          this.selectCell.attr("label/text", value);
          break;
        case "fontSize":
          this.selectCell.attr("label/fontSize", value);
          break;
        case "fontFill":
          this.selectCell.attr("label/fill", value);
          break;
        case "fill":
          this.selectCell.attr("body/fill", value);
          break;
        case "stroke":
          this.selectCell.attr("body/stroke", value);
          break;
      }
    },
    // 修改边label属性
    changeEdgeLabel(label, fontColor, fill, stroke) {
      this.selectCell.setLabels([
        configEdgeLabel(label, fontColor, fill, stroke)
      ]);
      if (!label)
        this.labelForm = { fontColor: "#333", fill: "#FFF", stroke: "#555" };
    },
    // 修改边的颜色
    changeEdgeStroke(val) {
      this.selectCell.attr("line/stroke", val);
    },
    // 边的类型
    changeEdgeConnector(val) {
      switch (val) {
        case "normal":
          this.selectCell.setConnector(val);
          break;
        case "smooth":
          this.selectCell.setConnector(val);
          break;
        case "rounded":
          this.selectCell.setConnector(val, { radius: 20 });
          break;
        case "jumpover":
          this.selectCell.setConnector(val, { radius: 20 });
          break;
      }
    },
    // 边的宽度
    changeEdgeStrokeWidth(val) {
      if (this.form.isArrows) {
        this.selectCell.attr({
          line: {
            strokeWidth: val,
            sourceMarker: {
              width: 12 * (val / 2) || 12,
              height: 8 * (val / 2) || 8
            },
            targetMarker: {
              width: 12 * (val / 2) || 12,
              height: 8 * (val / 2) || 8
            }
          }
        });
      } else {
        this.selectCell.attr({
          line: {
            strokeWidth: val,
            targetMarker: {
              width: 12 * (val / 2) || 12,
              height: 8 * (val / 2) || 8
            }
          }
        });
      }
    },
    // 边的箭头
    changeEdgeArrows(val) {
      if (val) {
        this.selectCell.attr({
          line: {
            sourceMarker: {
              name: "block",
              width: 12 * (this.form.strokeWidth / 2) || 12,
              height: 8 * (this.form.strokeWidth / 2) || 8
            },
            targetMarker: {
              name: "block",
              width: 12 * (this.form.strokeWidth / 2) || 12,
              height: 8 * (this.form.strokeWidth / 2) || 8
            }
          }
        });
      } else {
        this.selectCell.attr({
          line: {
            sourceMarker: "",
            targetMarker: {
              name: "block",
              size: 10 * (this.form.strokeWidth / 2) || 10
            }
          }
        });
      }
    },
    // 边的添加蚂蚁线
    changeEdgeAnit(val) {
      if (val) {
        this.selectCell.attr({
          line: {
            strokeDasharray: 5,
            style: {
              animation: "ant-line 30s infinite linear"
            }
          }
        });
      } else {
        this.selectCell.attr({
          line: {
            strokeDasharray: 0,
            style: {
              animation: ""
            }
          }
        });
      }
    },
    // 删除
    handlerDel() {
      this.$confirm({
        title: this.$t("handlerDel.title"),
        content: this.$t("handlerDel.content"),
        okText: this.$t("handlerDel.okText"),
        cancelText: this.$t("handlerDel.cancelText"),
        onOk: () => {
          const cells = this.graph.getSelectedCells();
          const promiseArr = [];
          if (cells.length) {
            for (let i = 0; i < cells.length; i++) {
              let cell = cells[i];
              const { id } = cell.getData();

              if (id) {
                const p = new Promise(resolve => {
                  process
                    .deleteNodeInfo({ nodeId: id })
                    .then(({ data }) => {
                      resolve(true);
                      if (data.code === "1000") {
                        // process.deleteNodeInfo
                        this.graph.removeCells([cell]);
                      } else {
                        this.$message.error(data.msg);
                      }
                    })
                    .catch(() => {
                      resolve(false);
                    });
                });
                promiseArr.push(p);
              } else {
                this.graph.removeCells([cell]);
              }
            }
            Promise.all(promiseArr).then(res => {
              console.log(res);
              if (res.length > 0 && res.includes(true)) {
                this.form = {};
                this.editDrawer = false;
                this.$message.success(this.$t("handlerDel.success"), 3);
              } else if (res.length > 0 && res.includes(false)) {
                this.form = {};
                this.editDrawer = false;
                this.$message.error(this.$t("handlerDel.error"), 3);
              } else if (res.length === 0) {
                this.form = {};
                this.editDrawer = false;
                this.$message.success(this.$t("handlerDel.success"), 3);
              }
            });
          } else if (this.selectCell) {
            const { id } = this.selectCell.getData();
            if (id) {
              process.deleteNodeInfo({ nodeId: id }).then(({ data }) => {
                if (data.code === "1000") {
                  // process.deleteNodeInfo
                  this.graph.removeCells([this.selectCell]);
                  this.form = {};
                  this.editDrawer = false;
                  this.$message.success(this.$t("handlerDel.success"), 3);
                } else {
                  this.$message.error(data.msg);
                }
              });
            } else {
              this.graph.removeCells([this.selectCell]);
              this.form = {};
              this.editDrawer = false;
              this.$message.success(this.$t("handlerDel.success"), 3);
            }
          }
        },
        onCancel: () => {}
      });
    },
    dataSave() {
      this.handlerSend();
    },
    // 导出JSON
    handlerSend() {
      // 我在这里删除了链接桩的设置，和工具（为了减少数据），反显的时候要把删除的链接桩加回来
      const { cells: jsonArr } = this.graph.toJSON();
      if (!jsonArr && !this.$route.params.id) {
        this.$message.error(this.$t("handlerSend.error"), 3);
        return;
      }
      const tempGroupJson = jsonArr.map(item => {
        if (item.ports && item.ports.groups) delete item.ports.groups;
        if (item.tools) delete item.tools;
        return item;
      });
      this.isChangeValue(true);
      process
        .save({
          id: this.$route.params.id,
          content: JSON.stringify(tempGroupJson)
        })
        .then(({ data }) => {
          if (data.code === "1000") {
            console.log("data", data);
            this.isChangeValue(false);
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    //导出成png图片并下载
    toPNG() {
      this.graph.toPNG(
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
    //节点样式编辑事件
    updateNodeValue(name, value) {
      this.form[name] = value.hex8;
      this.changeNode(name, value.hex8);
    },
    //连线样式编辑事件
    updateEdgeValue(name, value, type) {
      console.log(name, value, type);
      if (type === "edgeStroke") {
        this.form[name] = value.hex8;
        this.changeEdgeStroke(value.hex8);
        return;
      }
      this.labelForm[name] = value.hex8;
      this.changeEdgeLabel(
        this.form.label,
        this.labelForm.fontColor,
        this.labelForm.fill,
        this.labelForm.stroke
      );
    },
    //编辑节点展示
    showModal() {
      const { id } = this.selectCell.data;
      if (id) {
        process
          .getNodeInfo({ nodeId: id })
          .then(({ data }) => {
            if (data.code === "1000") {
              console.log("data", data);
              if (data.data) {
                this.infoForm = { ...data.data };
                this.visible = true;
              }
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(() => {
            this.visible = true;
            this.$message.error(this.$t("showModal.error"));
          });
      } else {
        this.visible = true;
      }
    },
    //右击列表选择事件
    onMenuSelect(key) {
      switch (key) {
        case "1":
          this.editNodeStyle();
          break;
        case "2":
          this.showModal();
          break;
        case "3":
          this.handlerDel();
          break;
        case "4":
          this.editEdgeStyle();
          break;
        default:
          break;
      }
    },
    //编辑节点信息确认事件,提取表单值保存
    handleOk() {
      this.$refs.NodeModal.$refs.ruleForm.validate(valid => {
        if (valid && this.$route.params.id) {
          this.confirmLoading = true;
          process
            .changeNode({
              processId: this.$route.params.id,
              ...this.infoForm
            })
            .then(({ data }) => {
              if (data.code === "1000") {
                this.$refs.NodeModal.$refs.ruleForm.resetFields();
                this.infoForm = {};
                if (data.data) {
                  this.selectCell.setData({ id: data.data });
                }
                this.visible = false;
              } else {
                this.$message.error(data.msg);
              }
            })
            .finally(() => {
              this.confirmLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //弹窗关闭事件,情空表单
    handleCancel() {
      this.$refs.NodeModal.$refs.ruleForm.resetFields();
      this.infoForm = {};
      this.visible = false;
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
@import "antvx6.less";
</style>
