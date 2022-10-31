// grid-node.vue
<template>
  <div class="grid-node" @click="getId">
    <div class="title">根节点</div>
    {{ itemData.label }}
  </div>
</template>

<script>
export default {
  name: 'GridGroup',

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
  created() {},
  methods: {
    getId() {
      this.$emit('changecurrentnode', this.itemData.id)
    }
  }
}
</script>

<style scoped>
.grid-node {
  width: 300px;
  height: 300px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #aaa;
  color: #000;
  background-color: #ffffff;
  cursor: pointer;
}
.title{
  background: aquamarine;
  height: 30px;
  border-bottom: 1px solid #333;
  line-height: 30px;
  text-align: center;
}
</style>
