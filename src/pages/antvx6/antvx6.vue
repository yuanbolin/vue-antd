<template>
  <div class="all">
    <div class="antv-content">
      <!--      左侧图形列表-->
      <my-graph
        :is-change="isChange"
        @menuDrag="menuDrag"
        @handlerSend="handlerSend"
      ></my-graph>
      <div :style="{ height: height }" class="antv-wrapper">
        <!--      流程图工具栏-->
        <my-toolbar
          :zoom="zoom"
          :visiable-grid="visiableGrid"
          @changeZoom="changeZoom"
          @changeGrid="changeGrid"
          @changeContent="changeContent"
          @changePortsShow="changePortsShow"
          :is-ports-show="isPortsShow"
        ></my-toolbar>
        <!--      流程图绘制区域-->
        <div
          id="wrapper"
          class="wrapper-canvas"
          :style="{ flex: 1 }"
          @drop="drop($event)"
          @dragover.prevent
        />
        <contextmenu
          :itemList="menuItemList"
          :visible.sync="menuVisible"
          @select="onMenuSelect"
        />
      </div>
      <!--      编辑节点和连线样式-->
      <a-drawer
        :title="editTitle"
        :width="350"
        :visible="editDrawer"
        :body-style="{ paddingBottom: '30px' }"
        @close="closeEditForm"
      >
        <div
          v-if="editTitle === '编辑节点'"
          :style="drawerMainHeight"
          class="form-main beauty-scroll"
        >
          <a-form ref="nodeForm" :model="form" label-width="80px">
            <a-form-item class="minInterval" label="节点文本">
              <a-input
                v-model="form.labelText"
                size="small"
                @input="changeNode('labelText', form.labelText)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="字体大小">
              <a-input-number
                v-model="form.fontSize"
                size="small"
                :min="10"
                :max="30"
                @change="changeNode('fontSize', form.fontSize)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="字体颜色">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="form.fontFill"
                @input="value => updateNodeValue('fontFill', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="节点背景">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="form.fill"
                @input="value => updateNodeValue('fill', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="边框颜色">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="form.stroke"
                @input="value => updateNodeValue('stroke', value)"
              />
            </a-form-item>
            <!--            <div class="see-box">-->
            <!--              <h5>预览</h5>-->
            <!--              <div class="see-item" :style="{ 'background': form.fill, 'color': form.fontFill, 'border-color': form.stroke, 'font-size': form.fontSize + 'px' }">{{ form.labelText }}</div>-->
            <!--            </div>-->
          </a-form>
        </div>
        <div
          v-if="editTitle === '编辑连线'"
          :style="drawerMainHeight"
          class="form-main  beauty-scroll"
        >
          <a-form ref="edgeForm" :model="form" label-width="80px">
            <a-form-item class="minInterval" label="标签内容">
              <a-input
                v-model="form.label"
                size="small"
                placeholder="标签文字，空则没有"
                @input="
                  changeEdgeLabel(
                    form.label,
                    labelForm.fontColor,
                    labelForm.fill,
                    labelForm.stroke
                  )
                "
              />
              <div v-if="form.label" class="label-style">
                <a-form-item class="minInterval" label="字体颜色">
                  <twitter-picker
                    :defaultColors="defaultColors"
                    :value="labelForm.fontColor"
                    @input="value => updateEdgeValue('fontColor', value)"
                  />
                </a-form-item>
                <a-form-item class="minInterval" label="背景颜色">
                  <twitter-picker
                    :defaultColors="defaultColors"
                    :value="labelForm.fill"
                    @input="value => updateEdgeValue('fill', value)"
                  />
                </a-form-item>
                <a-form-item class="minInterval" label="描边颜色">
                  <twitter-picker
                    :defaultColors="defaultColors"
                    :value="labelForm.stroke"
                    @input="value => updateEdgeValue('stroke', value)"
                  />
                </a-form-item>
              </div>
            </a-form-item>
            <a-form-item class="minInterval" label="线条颜色">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="form.stroke"
                @input="value => updateEdgeValue('stroke', value, 'edgeStroke')"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="线条样式">
              <a-select
                v-model="form.connector"
                size="small"
                placeholder="请选择"
                @change="changeEdgeConnector"
              >
                <a-select-option value="normal">直角</a-select-option>
                <a-select-option value="rounded">圆角</a-select-option>
                <a-select-option value="smooth">平滑</a-select-option>
                <a-select-option value="jumpover"
                  >跳线(两线交叉)</a-select-option
                >
              </a-select>
            </a-form-item>
            <a-form-item class="minInterval" label="线条宽度">
              <a-input-number
                v-model="form.strokeWidth"
                size="small"
                :min="2"
                :step="2"
                :max="6"
                label="线条宽度"
                @change="changeEdgeStrokeWidth"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="双向箭头">
              <a-switch v-model="form.isArrows" @change="changeEdgeArrows" />
            </a-form-item>
            <a-form-item class="minInterval" label="流动线条">
              <a-switch v-model="form.isAnit" @change="changeEdgeAnit" />
            </a-form-item>
            <a-form-item class="minInterval" label="调整线条">
              <a-switch v-model="form.isTools" @change="changeEdgeTools" />
            </a-form-item>
          </a-form>
        </div>
      </a-drawer>
      <!--      编辑节点信息-->
      <a-modal
        title="编辑节点信息"
        :visible="visible"
        :width="820"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="基本信息">
            <a-form-model
              layout="vertical"
              ref="ruleForm"
              :rules="rules"
              :model="infoForm"
            >
              <a-form-model-item label="节点描述" prop="describe">
                <a-textarea auto-size v-model="infoForm.describe" />
              </a-form-model-item>
            </a-form-model>
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
    </div>
  </div>
</template>
<script>
import { Twitter } from "vue-color";
import "@antv/x6-vue-shape";
import { Graph, Shape, DataUri } from "@antv/x6";
import Count from "./count.vue";
import Contextmenu from "@/components/menu/Contextmenu";
import MyGraph from "./graph";
import MyToolbar from "./toolbar";
import {
  configSetting,
  configNodeShape,
  configNodePorts,
  configEdgeLabel,
  graphBindKey
} from "@/utils/antvSetting";
export default {
  name: "AntV6X",
  components: {
    "twitter-picker": Twitter,
    MyGraph,
    MyToolbar,
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
  data() {
    return {
      graph: null, //画布
      zoom: 1, //画布缩放大小
      visiableGrid: true,
      isChange: false, //是否绘制，修改过
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
        describe: [
          { required: true, message: "请输入节点描述", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "字符长度应在2到50之间",
            trigger: "change"
          }
        ]
      },
      defaultColors: [
        //颜色选择器的颜色组
        "#000000",
        "#FCB900",
        "#7BDCB5",
        "#f7f7f7",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF"
      ],
      menuVisible: false, //右击导航是否显示
      contextmenuType: "", //右击的节点类型
      visible: false, //弹窗是否显示
      confirmLoading: false //节点信息提交状态
    };
  },
  computed: {
    // 右击导航列表
    menuItemList() {
      let arr = [];
      switch (this.contextmenuType) {
        case "node":
          arr = [
            { key: "1", icon: "highlight", text: "样式编辑" },
            { key: "2", icon: "edit", text: "信息编辑" },
            { key: "3", icon: "delete", text: "删除此节点" }
          ];
          break;
        case "edge":
          arr = [
            { key: "4", icon: "highlight", text: "样式编辑" },
            { key: "3", icon: "delete", text: "删除此连线" }
          ];
          break;
      }
      return arr;
    },
    drawerMainHeight() {
      // 抽屉内容高度
      return { height: `calc(100vh - 120px)` };
    }
  },
  watch: {
    value: {
      handler: function() {
        if (this.graph) {
          this.isChange = false;
          this.isPortsShow = false;
          this.menuItem = "";
          this.selectCell = "";
          this.editDrawer = false;
          // Graph.unregisterHTMLComponent("my-html2");
          // Graph.unregisterVueComponent("count");
          this.graph.dispose();
          this.initGraph();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    console.log("流程id==》", this.$route.params.id);
    //因直接初始化偶尔存在找不到节点的bug，推迟半秒初始化
    setTimeout(() => {
      this.initGraph();
      console.log(document.getElementsByTagName("main"));
    }, 500);
  },
  beforeDestroy() {
    //卸载前清理注册内容
    this.graph.dispose();
    // Graph.unregisterHTMLComponent("my-html2");
    // Graph.unregisterVueComponent("count");
  },
  methods: {
    // 链接桩的显示与隐藏，主要是照顾菱形
    changePortsShow(val) {
      console.log("changePortsShow", val);
      const container = document.getElementById("wrapper");
      const ports = container.querySelectorAll(".x6-port-body");
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = val ? "visible" : "hidden";
      }
      this.isPortsShow = val;
    },
    // 初始化渲染画布并添加监听事件
    initGraph() {
      const graph = new Graph({
        container: document.getElementById("wrapper"),
        ...configSetting(Shape)
      });

      //画布缩放

      //历史记录（撤销/重做）
      graph.history.on("undo", args => {
        // code here
        console.log(args);
      });
      graph.history.on("redo", args => {
        // code here
        console.log(args);
      });

      //添加点/边自带工具
      graph.on("cell:mouseenter", ({ cell }) => {
        if (cell.isNode()) {
          console.log(cell);
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
      this.parentResize(graph);

      // 画布事件
      graph.on("node:mouseenter", () => {
        this.changePortsShow(true);
      });
      graph.on("node:mouseleave", () => {
        if (this.isPortsShow) return;
        this.changePortsShow(false);
      });

      // 右击编辑
      graph.on("cell:contextmenu", ({ cell }) => {
        console.log(cell);
        this.editForm(cell);
      });

      // 画布键盘事件
      graphBindKey(graph);
      //选择事件
      graph.on("cell:selected", ({ cell }) => {
        console.log("节点/边被选中", cell);
      });

      // 删除
      graph.bindKey(["delete", "backspace"], () => {
        this.handlerDel();
      });

      // 赋值
      this.graph = graph;
      if (this.value && JSON.parse(this.value).length) {
        const resArr = JSON.parse(this.value);
        // 导出的时候删除了链接桩设置加回来
        const portsGroups = configNodePorts().groups;
        if (resArr.length) {
          const jsonTemp = resArr.map(item => {
            if (item.ports) item.ports.groups = portsGroups;
            return item;
          });
          graph.fromJSON(jsonTemp);
        }
      }

      // 画布有变化
      graph.on("cell:changed", () => {
        this.isChangeValue();
      });

      //获取新增的节点/边
      graph.on("cell:added", ({ cell }) => {
        console.log("新增==》", cell);
      });
    },
    //画布内容居中
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
    //改变画布缩放大小
    changeZoom(val) {
      this.zoom = val;
      this.graph.zoomTo(val);
    },
    //是否显示网格
    changeGrid(val) {
      this.visiableGrid = val;
      if (val) {
        this.graph.showGrid();
      } else {
        this.graph.hideGrid();
      }
    },
    //自定义HTML节点和VUE组件示例
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
    // 自动扩展父节点
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
    // 画布是否有变动
    isChangeValue() {
      if (!this.isChange) {
        this.isChange = true;
      }
    },
    menuDrag(type) {
      console.log("type", type);
      // 根据type获取到不同节点的预设参数
      this.menuItem = configNodeShape(type);
    },
    drop(event) {
      console.log(event);
      console.log(this.menuItem);
      // 节点预设 ，添加位置信息和链接桩信息组合成完整的节点
      const nodeItem = {
        ...this.menuItem,
        x: event.offsetX - this.menuItem.width / 2,
        y: event.offsetY - this.menuItem.height / 2,
        ports: configNodePorts()
      };
      // 创建节点
      this.graph.addNode(nodeItem);
      this.isChangeValue();
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
      this.editTitle = "编辑节点";
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
      this.editTitle = "编辑连线";
      this.form = {
        label:
          cell.labels && cell.labels[0]
            ? cell.labels[0].attrs.labelText.text
            : "",
        stroke: cell.attrs.line.stroke || "",
        connector: "rounded",
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
    closeEditForm() {
      this.editDrawer = false;
      if (this.selectCell) this.selectCell.removeTools();
    },
    // 修改一般节点
    changeNode(type, value) {
      console.log("changeNode", type, value);
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
      console.log(label, fontColor, fill, stroke);
      console.log(this.selectCell);
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
    // 给线添加调节工具
    changeEdgeTools(val) {
      if (val) this.selectCell.addTools(["vertices", "segments"]);
      else this.selectCell.removeTools();
    },
    // 删除
    handlerDel() {
      this.$confirm({
        title: "是否继续",
        content: `此操作将永久删除, 是否继续?`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          const cells = this.graph.getSelectedCells();
          console.log(cells);
          if (cells.length) {
            this.graph.removeCells(cells);
            this.form = {};
            this.editDrawer = false;
            this.$message.success("删除成功!", 3);
          } else if (this.selectCell) {
            this.graph.removeCells([this.selectCell]);
            this.form = {};
            this.editDrawer = false;
            this.$message.success("删除成功!", 3);
          }
        },
        onCancel: () => {}
      });
    },
    // 导出JSON
    handlerSend() {
      // 我在这里删除了链接桩的设置，和工具（为了减少数据），反显的时候要把删除的链接桩加回来
      const { cells: jsonArr } = this.graph.toJSON();
      console.log(jsonArr);
      if (!jsonArr) {
        this.$message.error("保存失败!", 3);
        return;
      }
      const tempGroupJson = jsonArr.map(item => {
        if (item.ports && item.ports.groups) delete item.ports.groups;
        if (item.tools) delete item.tools;
        return item;
      });
      if (this.selectCell) {
        this.selectCell.removeTools();
        this.selectCell = "";
      }
      this.$emit("finish", JSON.stringify(tempGroupJson));
      sessionStorage.setItem("tempGroupJson", JSON.stringify(tempGroupJson));
      this.$message.success("保存成功!", 3);
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
      this.visible = true;
      this.infoForm = { ...this.selectCell.data };
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
    //编辑节点信息确认事件
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(valid);
          // this.selectCell.
          this.selectCell.setData(this.infoForm);
          console.log(this.selectCell.data);
          this.confirmLoading = true;
          setTimeout(() => {
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑节点信息取消事件
    handleCancel() {
      console.log("Clicked cancel button");
      this.$refs.ruleForm.resetFields();
      this.visible = false;
    },
    //data表单标签页切换事件
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
