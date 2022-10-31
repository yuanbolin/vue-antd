<template>
  <el-container>
    <el-header class="action_box">
      <b style="margin-right: 15px">流程图名称</b>
      <el-button-group>
        <el-button
          icon="el-icon-download"
          @click="getCanvas"
        >下载流程图
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
</template>

<style>
.draw {
  min-height: calc(100vh - 186px);
  border: 1px solid #333;
  background-size: 50px 50px;
}

.action_box {
  height: 50px !important;
  padding: 20px 20px 0 20px;
}
</style>

<script>
import { ButterflyVue } from 'butterfly-vue'
import gridNode from './components/GridNode.vue'
import gridGroup from './components/GridGroup.vue'
export default {
  name: 'ButterFlyShow',
  components: {
    ButterflyVue
  },
  data() {
    return {
      mockData: {
        groups: [],
        nodes: [],
        edges: []
      },
      defaultOptions: {
        disLinkable: false, // 可删除连线
        linkable: false, // 可连线
        draggable: false, // 可拖动
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
    // 绘制插件加载完成事件
    finishLoaded(ref) {
      this.canvasRef = ref
      this.canvas = ref.canvas
      console.log('finish')
      this.canvas.setMinimap(true, {})
    },
    logEvent(e) {
      switch (e.type) {
        case 'drag:end':
          console.log(e)
          break
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
