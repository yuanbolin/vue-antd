<template>
  <el-container>
    <el-aside width="320px">
      <b style="margin-right: 15px"> 分级目录查询 </b>
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />

      <el-tree
        ref="tree"
        accordion
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
      />

    </el-aside>
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
  </el-container>
</template>

<style scoped>
.el-tree{
  background: transparent;
}
.draw {
  position: relative;
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
import MyEndpoint from './components/MyEndpoint.js'
export default {
  name: 'ButterFlyShow',
  components: {
    ButterflyVue
  },
  data() {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
            shapeType: 'AdvancedBezier',
            draggable: true,
            labelPosition: 0.5
          }
        }
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
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
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 绘制插件加载完成事件
    finishLoaded(ref) {
      this.canvasRef = ref
      this.canvas = ref.canvas
      console.log('finish')
      this.canvas.focusCenterWithAnimate({ offest: [0, 0] })
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
              render: gridGroup
            })
          })
          break
        case 'nodes':
          arr.forEach((item) => {
            dataArr.push({
              ...item,
              type: 'node',
              render: gridNode,
              endpoints: [{ ...item.endpoints[0], Class: MyEndpoint }, { ...item.endpoints[1], Class: MyEndpoint }]
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
