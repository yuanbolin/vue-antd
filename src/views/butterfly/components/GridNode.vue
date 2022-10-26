// grid-node.vue
<template>
  <div
    :class="{ 'grid-node': true, action: itemData.currentId === itemData.id }"
    @click="getId"
  >
    {{ itemData.label }}
    <div class="add" @click="addChildren">+</div>
  </div>
</template>

<script>
export default {
  name: 'GridNode',
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
  watch: {
    'itemData.action': function(newValue, oldValue) {
      console.log('watch==>', newValue, oldValue)
    }
  },
  created() {
    console.log('node渲染', this.itemData)
  },
  methods: {
    getId() {
      this.itemData.changeCurrentNode(this.itemData.id)
      // console.log(this.itemData.id)
    },
    addChildren() {
      this.itemData.addChildren('node', this.itemData.id)
    }
  }
}
</script>

<style scoped>
.grid-node {
  width: 100px;
  height: 100px;
  line-height: 96px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #aaa;
  color: #fff;
  background-color: #f66902;
  position: relative;
}
.add {
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
  line-height: 14px;
  margin-left: -10px;
  background: #fff;
  border: 1px solid #aaaaaa;
  color: #333333;
  cursor: pointer;
}
.action {
  border: 2px solid #000;
}
</style>
