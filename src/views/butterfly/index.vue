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
        <el-form-item label="节点类型" prop="type">
          <el-select v-model="form.type" size="small" placeholder="请选择节点类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="连接方向" prop="direction">
          <el-select v-model="form.direction" size="small" placeholder="请选择连接方向">
            <el-option
              label="横向连接"
              value="row"
            />
            <el-option
              label="竖向连接"
              value="column"
            />
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
        <el-form-item v-if="form.type==='node_info'" label="详细描述" prop="textarea">
          <el-input
            v-model="form.textarea"
            type="textarea"
            autosize
            clearable
            placeholder="请输入详细描述"
          />
        </el-form-item>
        <el-form-item v-if="form.type==='node_file'" label="附件上传" prop="file">
          <my-upload v-model="form.file" />
        </el-form-item>
        <el-form-item v-if="form.type==='node_link'" label="跳转节点" prop="linkValue">
          <el-cascader
            v-model="form.linkValue"
            :options="linkOptions"
            placeholder="请选择跳转节点"
            :props="{ expandTrigger: 'hover' }"
            @change="linkHandleChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddNode('form')">添加节点</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <div class="title_box">
        <b>节点样式</b>
        <el-tooltip class="item" effect="dark" content="设置节点背景色" placement="right">
          <el-color-picker v-model="nodeColor" />
        </el-tooltip>
      </div>
      <el-scrollbar class="style_box" style="height: 315px;border: 5px inset #409ee5;">
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
          <el-button
            icon="el-icon-download"
            @click="getCanvas"
          >下载流程图
          </el-button>
          <el-button
            icon="el-icon-circle-check"
            @click="saveData"
          >保存
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
  border: 1px solid #333;
  background-image: url("../../assets/drawbg.jpg");
  /*background-image: url("../../assets/404_images/404.png");*/
  background-size: 50px 50px;
}

.draw_box{
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

.img_box:hover{
  border: 1px solid #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .14)
}

.img_box.action {
  border: 1px solid #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .14)
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

.style_content{
  background: #fff;
  padding: 10px 5px;
}
</style>

<script>
import { ButterflyVue } from 'butterfly-vue'
import gridNode from './components/GridNode.vue'
import gridGroup from './components/GridGroup.vue'
import MyUpload from '@/components/MyUpload'
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
    pos: [0.5, 0]
  },
  {
    id: 'bottom',
    orientation: [0, 0],
    pos: [0.5, 1]
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
          { type: 'array', required: true, message: '请选择跳转节点', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请填写详细描述', trigger: 'blur' }
        ],
        file: [
          { required: true, message: '请上传附件', trigger: 'change' }
        ]
      },
      form: {
        type: 'node',
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
            type: 'Straight'
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
      this.canvasRef = ref
      console.log('finish')
    },
    saveData() {
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
            endpoints: this.form.direction === 'row' ? endpoints_row : endpoints_column,
            addChildren: this.addChildren,
            delnode: this.delnode,
            changeCurrentNode: this.changeCurrentNode,
            currentId: this.currentId,
            nodeColor: this.nodeColor,
            nodeStyle: this.nodeStyle,
            ...this.form
          })
          console.log(this.$refs[formName])
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
              delnode: this.delnode,
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
      this.currentId = ''
      this.mockData.nodes.forEach((item) => {
        item.currentId = ''
      })
      this.canvasRef.redraw()
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
