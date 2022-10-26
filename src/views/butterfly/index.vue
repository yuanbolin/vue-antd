<template>
  <el-container>
    <el-aside width="320px">
      <div class="title_box">
        <b>流程图名称</b>
      </div>
      <el-input v-model="mapName" placeholder="请输入流程图名称" />
      <el-divider />
      <div class="title_box">
        <b>节点内容</b>
      </div>
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="节点类型">
          <el-select v-model="type" size="small" placeholder="请选择节点类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="节点名称">
          <el-input v-model="form.nodeName" placeholder="请输入节点名称" />
        </el-form-item>
        <el-form-item v-if="type==='node_info'" label="详细描述">
          <el-input
            v-model="form.textarea"
            type="textarea"
            autosize
            placeholder="请输入详细描述"
          />
        </el-form-item>
        <el-form-item v-if="type==='node_file'" label="附件上传">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.fileList"
            accept=".txt,.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="type==='node_link'" label="跳转节点">
          <el-cascader
            v-model="form.linkValue"
            :options="linkOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="linkHandleChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddNode">添加节点</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="title_box">
        <b>节点样式</b>
        <el-color-picker v-model="nodeColor" />
      </div>
      <el-scrollbar class="style_box" style="height: 50vh">
        <div style="background: #fff; padding: 10px 5px">
          <el-row>
            <el-col
              v-for="(o, index) in nodeImgs"
              :key="o"
              :span="11"
              :offset="index % 2 > 0 ? 2 : 0"
            >
              <div :class="{ active: nodeStyle === o }" class="img_box">
                <img
                  :src="require(`@/assets/node_img/${o}.jpg`)"
                  class="image"
                  @click="
                    () => {
                      changeStyle(o);
                    }
                  "
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="action_box">
        <el-button-group>
          <el-button
            icon="el-icon-download"
            @click="getCanvas"
          >下载流程图
          </el-button>
          <el-button
            icon="el-icon-circle-check"
            @click="showData"
          >保存
          </el-button>
        </el-button-group>
      </el-header>
      <el-main>
        <div class="draw">
          <butterfly-vue
            :canvas-data="mockData"
            :canvas-conf="defaultOptions"
            @onLoaded="finishLoaded"
            @onCreateEdge="logEvent"
            @onChangeEdges="logEvent"
            @onDeleteEdge="logEvent"
            @onOtherEvent="logEvent"
          />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.draw {
  min-height: calc(100vh - 186px);
  padding: 10px;
  border: 1px solid #333;
  background-image: url("../../assets/drawbg.jpg");
  /*background-image: url("../../assets/404_images/404.png");*/
  background-size: 50px 50px;
}

.action_box {
  height: 50px !important;
  padding: 20px 20px 0 20px;
}

.image {
  width: 80px;
  height: auto;
  vertical-align: top;
  max-height: 80px;
}

.img_box {
  overflow: hidden;
  margin: 5px;
  padding: 5px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
}

.img_box.active {
  border: 1px solid #666;
  -moz-box-shadow: 1px 1px 5px #666;
  -webkit-box-shadow: 1px 1px 5px #666;
  box-shadow: 1px 1px 5px #666;
}

.title_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.style_box .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

<script>
import { ButterflyVue } from 'butterfly-vue'
import gridNode from './components/GridNode.vue'
import gridGroup from './components/GridGroup.vue'
import { v4 as uuidv4 } from 'uuid'

const endpoints_row = [
  {
    id: 'top',
    orientation: [1, 0],
    pos: [0, 0.5]
  },
  {
    id: 'bottom',
    orientation: [-1, 0],
    pos: [0, 0.5]
  }
]
// const endpoints_cloum = [
//   {
//     id: 'top',
//     orientation: [0, 0],
//     pos: [0.5, 0]
//   },
//   {
//     id: 'bottom',
//     orientation: [0, 0],
//     pos: [0.5, 1]
//   }
// ]
export default {
  name: 'ButterFly',
  components: {
    ButterflyVue
  },
  data() {
    return {
      options: [
        {
          label: '普通节点',
          value: 'node'
        },
        {
          label: '详细描述节点',
          value: 'node_info'
        },
        {
          label: '附件节点',
          value: 'node_file'
        },
        {
          label: '流程跳转节点',
          value: 'node_link'
        }
      ],
      mapName: '',
      nodeImgs: [], // 节点样式数组
      nodeStyle: 'circle',
      nodeColor: '#409EFF',
      type: 'node',
      currentId: '',
      linkOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      form: {
        nodeName: '',
        textarea: '',
        linkValue: [],
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      },
      mockData: {
        groups: [],
        nodes: [],
        edges: []
      },
      defaultOptions: {
        disLinkable: true, // 可删除连线
        linkable: true, // 可连线
        draggable: true, // 可拖动
        zoomable: true, // 可放大
        moveable: true, // 可平移
        theme: {
          edge: {
            arrow: true,
            type: 'Straight'
          }
        }
      }
    }
  },
  beforeMount: function() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const imgFiles = require.context('@/assets/node_img', true, /\.jpg$/)

    // you do not need `import jpg from '@/assets/node_img'`
    // it will auto require all vuex module from modules file
    const modules = imgFiles.keys().reduce((modules, modulePath, index) => {
      // set './app.jpg' => 'app'
      const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
      modules[index] = moduleName
      return modules
    }, [])
    this.nodeImgs = modules
    try {
      const mockDataObj = JSON.parse(localStorage.getItem('mockData'))
      const mockData = {
        groups: [],
        nodes: [],
        edges: []
      }
      for (const mockDataObjKey in mockDataObj) {
        mockData[mockDataObjKey] = this.dataHandle(
          mockDataObjKey,
          mockDataObj[mockDataObjKey]
        )
      }
      console.log(mockData)
      this.mockData = mockData
    } catch (e) {
      console.log('json解析失败', e)
    }
  },
  methods: {
    // 级联选择
    handleChange(value) {
      console.log(value)
    },
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 节点类型切换事件
    changeStyle(type) {
      if (type) this.nodeStyle = type
    },
    // 绘制插件加载完成事件
    finishLoaded(ref) {
      this.canvasRef = ref
      console.log('finish')
      console.log(this.canvasRef)
    },
    showData() {
      console.log(JSON.stringify(this.mockData))
      localStorage.setItem('mockData', JSON.stringify(this.mockData))
    },
    handleAddNode() {
      this.mockData.nodes.push({
        id: uuidv4(),
        top: 10,
        left: 10,
        label: this.nodeName,
        render: gridNode,
        endpoints: endpoints_row,
        addChildren: this.addChildren,
        changeCurrentNode: this.changeCurrentNode,
        currentId: this.currentId
      })
      this.nodeName = ''
    },
    logEvent(e) {
      switch (e.type) {
        case 'drag:end':
          console.log(e)
          break
      }
    },
    // 删除当前选择的节点
    delnode() {
      try {
        let { nodes, edges } = this.mockData
        nodes = nodes.filter((item) => item.id !== this.currentId)
        edges = edges.filter(
          (item) =>
            item.sourceNode !== this.currentId &&
            item.targetNode !== this.currentId
        )
        this.mockData = {
          ...this.mockData,
          nodes,
          edges
        }
      } catch (e) {
        console.log(e)
      }
    },
    dataHandle(key, arr) {
      const dataArr = []
      switch (key) {
        case 'groups':
          arr.forEach((item) => {
            dataArr.push({
              ...item,
              type: 'group',
              render: gridGroup,
              addChildren: this.addChildren,
              currentId: this.currentId
            })
          })
          break
        case 'nodes':
          arr.forEach((item) => {
            dataArr.push({
              ...item,
              type: 'node',
              render: gridNode,
              addChildren: this.addChildren,
              changeCurrentNode: this.changeCurrentNode,
              currentId: this.currentId
            })
          })
          break
        case 'edges':
          arr.forEach((item) => {
            dataArr.push({
              ...item
            })
          })
          break
      }
      return dataArr
    },
    changeCurrentNode(id) {
      this.currentId = id
      this.mockData.nodes.forEach((item) => {
        item.currentId = id
      })
      this.canvasRef.redraw()
    },
    addChildren(type, id) {
      // console.log(type, id);
    },
    getCanvas() {
      const dom = this.canvasRef.canvas
      dom.focusCenterWithAnimate({ offest: [0, 0] }, () => {
        dom.zoom(1)
        dom.save2img({ quality: 1, bgcolor: '#fff' }).then((dataUrl) => {
          const elink = document.createElement('a')
          elink.download = '流程图'
          elink.style.display = 'none'
          elink.href = dataUrl
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL对象
          document.body.removeChild(elink)
        })
      })
    }
  }
}
</script>
