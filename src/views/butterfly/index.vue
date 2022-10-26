<template>
  <el-container>
    <el-aside width="300px">
      <b>当前选择的节点类型:</b>
      <el-radio-group v-model="type">
        <el-radio label="node">普通节点</el-radio>
        <el-radio label="node_info">详细描述节点</el-radio>
        <el-radio label="node_file">附件节点</el-radio>
        <el-radio label="node_link">流程跳转节点</el-radio>
      </el-radio-group>
      <el-divider />
      <div>
        <span>当前选择的节点ID:{{ currentId }}</span>
        <br>
        <el-input v-model="nodeName" placeholder="请输入节点名称" />
        <el-button-group>
          <el-button>添加节点</el-button>
          <el-button
            :disabled="currentId.length == 0"
            icon="el-icon-delete"
            @click="delnode"
          >删除节点</el-button>
        </el-button-group>
        <el-scrollbar style="height: 50vh">
          <el-row>
            <el-col
              v-for="(o, index) in 20"
              :key="o"
              :span="11"
              :offset="index % 2 > 0 ? 2 : 0"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                style="margin-top: 10px"
              >
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                >
                <div style="padding: 0 10px; text-align: center">
                  <div class="bottom clearfix">
                    <el-button
                      type="text"
                      class="button"
                      @click="handleAddNode"
                    >使用该节点</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header class="action_box">
        <el-button-group>
          <el-button
            icon="el-icon-download"
            @click="getCanvas"
          >下载流程图</el-button>
          <el-button
            icon="el-icon-circle-check"
            @click="showData"
          >保存</el-button>
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
  width: 100%;
  height: auto;
  vertical-align: top;
}
</style>

<script>
import { ButterflyVue } from 'butterfly-vue'
import gridNode from './GridNode.vue'
import gridGroup from './GridGroup.vue'
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
      type: 'node',
      currentId: '',
      nodeName: '',
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
    console.log('beforeMount is run')
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
