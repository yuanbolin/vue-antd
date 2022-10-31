// grid-node.vue
<template>
  <div style="position: relative">
    <component :is="node" :action="action" :node-name="itemData.nodeName" :node-color="nodeColor" @clickchild="getId" @delnode="delnode" />
  </div>
</template>

<script>
import { actor, add, alarm, car, circlenode, callout, contract, diamond, download, downloadfile, datanode, error, elipse, forbid, home, hexagon, linknode, linknodetwo, money, note, parallelogram, pause, rectangle, square, success, start, upload, warn } from './nodes'
export default {
  name: 'GridNode',
  components: { actor, add, alarm, car, circlenode, callout, contract, diamond, download, downloadfile, datanode, error, elipse, forbid, home, hexagon, linknode, linknodetwo, money, note, parallelogram, pause, rectangle, square, success, start, upload, warn },
  props: {
    // 这里可以拿到mockdata里的当前节点的数据
    itemData: {
      type: Object
    },
    // 原生的节点数据（不推荐使用这个）
    canvasNode: {
      type: Object
    }
  },
  computed: {
    action() {
      return this.itemData.currentId === this.itemData.id
    },
    nodeColor() {
      return this.itemData.nodeColor
    },
    nodeStyle() {
      return this.itemData.nodeStyle
    },
    node() {
      return this.itemData.nodeStyle.substring(1)
    }
  },
  watch: {
    'itemData.action': function(newValue, oldValue) {
      console.log('watch==>', newValue, oldValue)
    }
  },
  created() {
    console.log('node渲染', this.canvasNode)
  },
  methods: {
    getId() {
      this.$emit('changecurrentnode', this.itemData.id)
    },
    addChildren() {
      this.$emit('addchildren', this.itemData.id)
    },
    delnode() {
      this.$emit('delnode')
    }
  }
}
</script>

<style scoped>

</style>
