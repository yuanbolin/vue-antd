<template>
  <div class="all">
    <div class="antv-content">
      <div class="antv-menu">
        <h3>基础图形列表</h3>
        <ul class="menu-list">
          <li draggable="true" @drag="menuDrag('defaultOval')">
            <i class="icon-oval" /> <strong>椭圆形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultSquare')">
            <i class="icon-square" /><strong>矩形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultYSquare')">
            <i class="icon-ysquare" /><strong>圆角矩形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultRhombus')">
            <i class="icon-rhombus" /><strong>菱形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultRhomboid')">
            <i class="icon-rhomboid" /><strong>平行四边形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultCircle')">
            <i class="icon-circle" /><strong>圆形</strong>
          </li>
          <li draggable="true" @drag="menuDrag('defaultSuccess')">
            <a-icon type="check-circle" /><strong>成功</strong>
          </li>
        </ul>
        <div v-if="isChange" class="wrapper-btn">
          <a-button type="success" @click="handlerSend">保存当前方案</a-button>
          <a-button type="success" @click="toPNG">保存为PNG图片</a-button>
        </div>
      </div>
      <div class="antv-wrapper">
        <div
          id="wrapper"
          class="wrapper-canvas"
          :style="{ height: height }"
          @drop="drop($event)"
          @dragover.prevent
        />
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <a-switch v-model="isPortsShow" @change="changePortsShow" />
            <span>链接桩常显</span>
          </div>
        </div>
        <contextmenu
          :itemList="menuItemList"
          :visible.sync="menuVisible"
          @select="onMenuSelect"
        />
      </div>
      <div v-if="editDrawer" class="edit-main">
        <div class="edit-main-title">
          <h3>{{ editTitle }}</h3>
          <a-icon type="close" @click="closeEditForm" />
        </div>
        <div
          v-if="editTitle === '编辑节点'"
          :style="drawerMainHeight"
          class="form-main  beauty-scroll"
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
                @input="value => updateValue('fontFill', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="节点背景">
              <twitter-picker
                :value="form.fill"
                @input="value => updateValue('fill', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" label="边框颜色">
              <twitter-picker
                :value="form.stroke"
                @input="value => updateValue('stroke', value)"
              />
            </a-form-item>
            <!--            <div class="see-box">-->
            <!--              <h5>预览</h5>-->
            <!--              <div class="see-item" :style="{ 'background': form.fill, 'color': form.fontFill, 'border-color': form.stroke, 'font-size': form.fontSize + 'px' }">{{ form.labelText }}</div>-->
            <!--            </div>-->
          </a-form>
        </div>
        <div v-if="editTitle === '编辑连线'" class="form-main">
          <a-form ref="edgeForm" :model="form" label-width="80px">
            <a-form-item label="标签内容">
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
                <p>
                  字体颜色：
                  <twitter-picker
                    :defaultColors="defaultColors"
                    v-model="labelForm.fontColor"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  />
                </p>
                <p>
                  背景颜色：
                  <twitter-picker
                    :defaultColors="defaultColors"
                    v-model="labelForm.fill"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  />
                </p>
                <p>
                  描边颜色：<a-color-picker
                    v-model="labelForm.stroke"
                    size="mini"
                    @change="
                      changeEdgeLabel(
                        form.label,
                        labelForm.fontColor,
                        labelForm.fill,
                        labelForm.stroke
                      )
                    "
                  />
                </p>
              </div>
            </a-form-item>
            <a-form-item label="线条颜色">
              <chrome-picker
                v-model="form.stroke"
                size="small"
                @change="changeEdgeStroke"
              />
              <!--              <a-color-picker v-model="form.stroke" size="small" @change="changeEdgeStroke" />-->
            </a-form-item>
            <a-form-item label="线条样式">
              <a-select
                v-model="form.connector"
                size="small"
                placeholder="请选择"
                @change="changeEdgeConnector"
              >
                <a-option label="直角" value="normal" />
                <a-option label="圆角" value="rounded" />
                <a-option label="平滑" value="smooth" />
                <a-option label="跳线(两线交叉)" value="jumpover" />
              </a-select>
            </a-form-item>
            <a-form-item label="线条宽度">
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
            <a-form-item label="双向箭头">
              <a-switch v-model="form.isArrows" @change="changeEdgeArrows" />
            </a-form-item>
            <a-form-item label="流动线条">
              <a-switch v-model="form.isAnit" @change="changeEdgeAnit" />
            </a-form-item>
            <a-form-item label="调整线条">
              <a-switch v-model="form.isTools" @change="changeEdgeTools" />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Twitter } from "vue-color";
import "@antv/x6-vue-shape";
import { Graph, Shape, DataUri } from "@antv/x6";
import Count from "./count.vue";
import Contextmenu from "@/components/menu/Contextmenu";
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
    Contextmenu
  },
  /**
   * 这个是作为子组件分别接受了两个数据一个是高度height，一个是反显图表数据tempGroupJson
   * 作为子组件例子 <AntVXSix v-model="tempGroupJson" height="720px" />
   *
   */
  props: {
    height: {
      type: String,
      default: "calc(100vh - 185px)" // '720px'
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      graph: null,
      isChange: false,
      isPortsShow: false,
      menuItem: "",
      selectCell: "",
      editDrawer: false,
      editTitle: "",
      form: {},
      labelForm: {
        fontColor: "#333",
        fill: "#FFF",
        stroke: "#555"
      },
      defaultColors: [
        "#000000",
        "#FCB900",
        "#7BDCB5",
        "#009fd0",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF"
      ],
      menuVisible: false,
      contextmenuType: ""
    };
  },
  computed: {
    menuItemList() {
      let arr = [];
      switch (this.contextmenuType) {
        case "node":
          arr = [
            { key: "1", icon: "highlight", text: this.$t("样式编辑") },
            { key: "2", icon: "edit", text: this.$t("信息编辑") },
            { key: "3", icon: "delete", text: this.$t("删除此节点") }
          ];
          break;
        case "edge":
          arr = [
            { key: "4", icon: "highlight", text: this.$t("样式编辑") },
            { key: "3", icon: "delete", text: this.$t("删除此连线") }
          ];
          break;
      }
      return arr;
    },
    drawerMainHeight() {
      return { height: `calc(${this.height} - 35px)` };
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
          this.graph.dispose();
          this.initGraph();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    console.log("mounted");

    //因直接初始化存在找不到节点的bug，推迟半秒初始化
    setTimeout(() => {
      this.initGraph();
    }, 500);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    this.graph.dispose();
    Graph.unregisterHTMLComponent("my-html2");
    Graph.unregisterVueComponent("count");
  },
  methods: {
    // 链接桩的显示与隐藏，主要是照顾菱形
    changePortsShow(val) {
      const container = document.getElementById("wrapper");
      const ports = container.querySelectorAll(".x6-port-body");
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = val ? "visible" : "hidden";
      }
    },
    // 初始化渲染画布
    initGraph() {
      const graph = new Graph({
        container: document.getElementById("wrapper"),
        ...configSetting(Shape)
      });
      console.log("graph", graph);
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
      // 删除
      graph.bindKey(["delete", "backspace"], () => {
        this.handlerDel();
      });
      // 赋值
      this.graph = graph;
      if (this.value && JSON.parse(this.value).length) {
        const resArr = JSON.parse(this.value);
console.log(resArr)
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
    },
    //自定义HTML节点和VUE组件示例
    vueExample(){
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
    HTMLExample(){
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
        console.log(node, options);
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
        this.$emit("cellChanged", true);
      }
    },
    menuDrag(type) {
      // 根据type获取到不同节点的预设参数
      this.menuItem = configNodeShape(type);
    },
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
    // 边的样式
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
    // 删除节点
    handlerDel() {
      this.$confirm({
        title: "是否继续",
        content: `此操作将永久删除此${
          this.editTitle === "编辑节点" ? "节点" : "连线"
        }, 是否继续?`,
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
      console.log(JSON.stringify(tempGroupJson));
    },
    toPNG() {
      this.graph.toPNG(dataUri => {
        console.log("toPNG===>", dataUri);
        // 下载
        DataUri.downloadDataUri(dataUri, "chart.png");
      });
    },
    updateValue(name, value) {
      this["form." + name] = value.hex8;
      console.log(this["form." + name]);
      this.changeNode(name, value.hex8);
    },
    test1(target) {
      console.log("test1", target);
    },
    onMenuSelect(key, target) {
      switch (key) {
        case "1":
          this.editNodeStyle();
          break;
        case "2":
          this.test1(target);
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
