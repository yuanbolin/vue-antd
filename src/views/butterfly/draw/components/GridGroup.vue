// grid-node.vue
<template>
  <div ref="group" class="grid-node" :style="size" @click="getId">
    <div class="title">{{ itemData.label }}</div>
    <div class="resize">
      <i class="butterfly-icon icon-drag" @mousedown.stop="handleDown" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridGroup',
  props: {
    // 这里可以拿到mockdata里的当前节点的数据
    itemData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 原生的节点数据（不推荐使用这个）
    canvasNode: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {

    }
  },
  computed: {
    size() {
      return {
        width: this.itemData.width + 'px' || '300px',
        height: this.itemData.height + 'px' || '100px'
      }
    }
  },
  methods: {
    getId() {
      this.$emit('changecurrentnode', this.itemData.id)
    },
    handleDown(edown) {
      const xNum = edown.clientX - this.$refs['group'].offsetWidth
      const yNum = edown.clientY - this.$refs['group'].offsetHeight
      document.body.onmousemove = (eMove) => {
        this.$emit('groupResize', 'group', this.itemData.index, eMove.clientX - xNum, eMove.clientY - yNum)
      }
      document.body.onmouseup = (eMove) => {
        document.body.onmousemove = null
      }
    }
  }
}
</script>

<style scoped>
.grid-node {
  line-height: 100px;
  text-align: center;
  border: rgba(246, 105, 2, 0.7);
  color: #000;
  position: relative;
  background: rgba(246, 105, 2, 0.2);
  border-radius: 0 0 9px 9px;
}
.title {
  color: #fff;
  background: #F66902;
  height: 30px;
  border-bottom: 1px solid #333;
  line-height: 30px;
  text-align: center;
}
.resize{
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1em;
  line-height: 1em;
  cursor: se-resize;
  z-index: 150;
}
</style>
