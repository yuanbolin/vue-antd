// grid-node.vue
<template>
  <div ref="group" class="grid-node" :style="size" @click="getId">
    <div class="title">{{ itemData.label }}  {{ itemData.width }}</div>
    <div class="resize">
      <svg-icon icon-class="resize" @mousedown.stop="handleDown" />
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
      console.log(this.$refs['group'])
      const xNum = edown.clientX - this.$refs['group'].offsetWidth
      const yNum = edown.clientY - this.$refs['group'].offsetHeight
      document.body.onmousemove = (eMove) => {
        this.$emit('resize', 'group', this.itemData.index, eMove.clientX - xNum, eMove.clientY - yNum)
        // this.$refs['group'].style.width = eMove.clientX - xNum + 'px'
        // this.$refs['group'].style.height = eMove.clientY - yNum + 'px'
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
  border: 2px solid #7f94ff;
  color: #000;
  background-color: rgba(255,255,255,0.2);
  position: relative;
}
.title {
  background: aquamarine;
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
  border: 1px solid #eee;
  cursor: se-resize;
  z-index: 150;
}
</style>
