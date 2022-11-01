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
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="节点类型" prop="nodeType">
          <el-select
            v-model="form.nodeType"
            size="small"
            placeholder="请选择节点类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="连接方向" prop="direction">
          <el-select
            v-model="form.direction"
            size="small"
            placeholder="请选择连接方向"
          >
            <el-option label="横向连接" value="row" />
            <el-option label="竖向连接" value="column" />
          </el-select>
        </el-form-item>
        <el-form-item label="节点名称" prop="nodeName">
          <el-input
            v-model="form.nodeName"
            autosize
            clearable
            placeholder="请输入节点名称"
          />
        </el-form-item>
        <el-form-item
          v-if="form.nodeType === 'node_info'"
          label="详细描述"
          prop="textarea"
        >
          <el-input
            v-model="form.textarea"
            type="textarea"
            autosize
            clearable
            placeholder="请输入详细描述"
          />
        </el-form-item>
        <el-form-item
          v-if="form.nodeType === 'node_file'"
          label="附件上传"
          prop="file"
        >
          <my-upload v-model="form.file" />
        </el-form-item>
        <el-form-item
          v-if="form.nodeType === 'node_link'"
          label="跳转节点"
          prop="linkValue"
        >
          <el-cascader
            v-model="form.linkValue"
            :show-all-levels="false"
            :options="linkOptions"
            placeholder="请选择跳转节点"
            :props="{ expandTrigger: 'hover' }"
            @change="linkHandleChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAddNode('form')"
          >添加节点</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="title_box">
        <b>节点样式</b>
        <el-tooltip
          class="item"
          effect="dark"
          content="设置节点背景色"
          placement="right"
        >
          <el-color-picker v-model="nodeColor" />
        </el-tooltip>
      </div>
      <el-scrollbar
        class="style_box"
        style="height: 315px; border: 5px inset #409ee5"
      >
        <div class="style_content">
          <el-row>
            <el-col
              v-for="(o, index) in nodeImgs"
              :key="o"
              :span="11"
              :offset="index % 2 > 0 ? 2 : 0"
            >
              <div
                :class="{ action: nodeStyle === o }"
                class="img_box"
                @click="
                  () => {
                    changeStyle(o);
                  }
                "
              >
                <img
                  :src="require(`@/assets/node_img/${o}.png`)"
                  class="image"
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
          <el-button icon="el-icon-delete" @click="redo">清空 </el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            @click="saveData"
          >保存流程图
          </el-button>
        </el-button-group>
      </el-header>
      <el-main>
        <div class="draw">
          <butterfly-vue
            class-name="draw_box"
            :canvas-data="mockData"
            :canvas-conf="defaultOptions"
            @onLoaded="finishLoaded"
            @onCreateEdge="onCreateEdgeHandle"
            @onChangeEdges="onChangeEdgeHandle"
            @onDeleteEdge="onDeleteEdgeHandle"
            @onOtherEvent="logEvent"
            @dblclick="changeEdgeShow"
            @inputedge="inputEdge"
            @addchildren="addChildren"
            @delnode="delnode"
            @changecurrentnode="changeCurrentNode"
          />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.draw {
  min-height: calc(100vh - 186px);
  border: 1px solid #333;
  background-image: url("../../assets/drawbg.jpg");
  background-size: 50px 50px;
}

.draw_box {
  min-height: calc(100vh - 186px);
  min-width: 500px;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}

.action_box {
  height: 50px !important;
  padding: 20px 20px 0 20px;
}

.image {
  max-width: 80px;
  height: auto;
  vertical-align: top;
  max-height: 60px;
}

.img_box {
  overflow: hidden;
  margin: 5px;
  padding: 15px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #eee;
  cursor: pointer;
}

.img_box:hover {
  border: 1px solid #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
}

.img_box.action {
  border: 1px solid #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
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

.style_content {
  background: #fff;
  padding: 10px 5px;
}
</style>

<script>
import { ButterflyVue } from 'butterfly-vue'
import gridNode from './components/GridNode.vue'
import gridGroup from './components/GridGroup.vue'
import MyUpload from '@/components/MyUpload'
// import Edge from './components/edge/index'
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
const endpoints_column = [
  {
    id: 'top',
    orientation: [0, 0],
    pos: [0.5, 0],
    expandArea: {
      left: 10,
      right: 10,
      top: 10,
      botton: 10
    }
  },
  {
    id: 'bottom',
    orientation: [0, 0],
    pos: [0.5, 1],
    expandArea: {
      left: 10,
      right: 10,
      top: 10,
      botton: 10
    }
  }
]
export default {
  name: 'ButterFly',
  components: {
    ButterflyVue,
    MyUpload
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
      nodeStyle: '1circlenode',
      nodeColor: '#409EFF',
      currentId: '',
      linkOptions: [],
      rules: {
        nodeName: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请选择连接方向', trigger: 'change' }
        ],
        linkValue: [
          {
            type: 'array',
            required: true,
            message: '请选择跳转节点',
            trigger: 'change'
          }
        ],
        nodeType: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请填写详细描述', trigger: 'blur' }
        ],
        file: [{ required: true, message: '请上传附件', trigger: 'change' }]
      },
      form: {
        nodeType: 'node',
        direction: 'row',
        nodeName: '',
        textarea: '',
        linkValue: [],
        file: ''
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
            shapeType: 'AdvancedBezier',
            draggable: true,
            labelPosition: 0.5
          }
        }
      }
    }
  },
  beforeMount: function() {
    // https://webpack.js.org/guides/dependency-management/#requirecontext
    const imgFiles = require.context('@/assets/node_img', true, /\.png$/)

    // you do not need `import jpg from '@/assets/node_img'`
    // it will auto require all vuex module from modules file
    const modules = imgFiles.keys().reduce((modules, modulePath, index) => {
      // set './app.png' => 'app'
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
    linkHandleChange(value) {
      console.log(value)
    },
    // 节点类型切换事件
    changeStyle(type) {
      if (type) this.nodeStyle = type
    },
    // 绘制插件加载完成事件
    finishLoaded(ref) {
      window.canvasRef = ref
      console.log('finish', ref)
      window.canvas = ref.canvas
      window.canvas.setGuideLine(true, {
        limit: 4, // 限制辅助线条数
        adsorp: {
          enable: true, // 开启吸附效果
          gap: 5 // 吸附间隔
        },
        theme: {
          lineColor: 'red', // 网格线条颜色
          lineWidth: 1 // 网格粗细
        }
      })
      // window.canvas.setGridMode(true, {
      //   isAdsorb: true, // 是否自动吸附,默认关闭
      //   theme: {
      //     shapeType: 'line', // 展示的类型，支持line & circle
      //     gap: 15, // 网格间隙
      //     adsorbGap: 8, // 吸附间距
      //     background: '#000', // 网格背景颜色
      //     lineColor: '#ff0000', // 网格线条颜色
      //     lineWidth: 10, // 网格粗细
      //   }
      // })
    },
    saveData() {
      this.currentId = ''
      for (let i = 0; i < this.mockData.nodes.length; i++) {
        this.mockData.nodes[i].currentId = ''
      }
      console.log(JSON.stringify(this.mockData))
      localStorage.setItem('mockData', JSON.stringify(this.mockData))
    },
    handleAddNode(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.mockData.nodes.push({
            id: uuidv4(),
            top: 10,
            left: 10,
            render: gridNode,
            endpoints:
              this.form.direction === 'row' ? endpoints_row : endpoints_column,
            currentId: this.currentId,
            nodeColor: this.nodeColor,
            nodeStyle: this.nodeStyle,
            ...this.form
          })
          this.form = {
            ...this.form,
            nodeName: '',
            textarea: '',
            linkValue: [],
            file: ''
          }
          // this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.nodeName = ''
    },
    logEvent(e) {
      console.log('logEvent', e)
    },
    /**
     * 通过拖拽创建了edge
     * 还需对edge进行自定义开发，因插件未完全支持暂时搁置。
     * @param e 创建的edge信息
     */
    onCreateEdgeHandle(e) {
      console.log('连线成功', e)
      // const nodeInfo = this.mockData.nodes.filter(item => item.id === e.sourceNodeId)
      // function checkId(item) {
      //   return item.id === e.id
      // }
      // if (nodeInfo && nodeInfo.length > 0) {
      //   let index = 0
      //   index = this.mockData.edges.findIndex(checkId)
      //   this.mockData.edges[index].render = Edge
      //   this.mockData.edges[index].isShow = false
      //   this.mockData.edges[index].edgeLabel = ''
      // }
    },
    onChangeEdgeHandle(e) {
      console.log('修改连线成功', e)
    },
    onDeleteEdgeHandle(e) {
      console.log('删除连线成功', e)
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
      for (let i = 0; i < this.mockData.nodes.length; i++) {
        this.mockData.nodes[i].currentId = id
      }
    },
    changeEdgeShow(id) {
      console.log('changeEdge', id)
      for (let i = 0; i < this.mockData.edges.length; i++) {
        if (this.mockData.edges[i].id === id) {
          this.mockData.edges[i].isShow = true
        } else {
          this.mockData.edges[i].isShow = false
        }
      }
      console.log(JSON.parse(JSON.stringify(this.mockData.edges)))
    },
    inputEdge(id, string) {
      console.log('inputEdge', id, string)
      let index = 0
      function checkId(item) {
        return item.id === id
      }
      index = this.mockData.edges.findIndex(checkId)
      // this.mockData.edges[index].edgeLabel = string
      this.$set(this.mockData.edges[index], 'edgeLabel', string)
    },
    addChildren(type, id) {
      // console.log(type, id);
    },
    redo() {
      this.mockData = {
        ...{
          groups: [],
          nodes: [],
          edges: []
        }
      }
    }
  }
}
</script>
