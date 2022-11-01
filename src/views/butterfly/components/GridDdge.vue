<template>
  <div>
    <el-input v-if="isShow" class="mini-input" :value="edgeLabel" maxlength="10" size="mini" placeholder="请输入内容" @input="changeLabel" />
    <i v-else class="el-icon-chat-line-round pointer" @click="changeEdge" />
  </div>
</template>

<script>
export default {
  name: 'MyEdge',
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
  data() {
    return {
      input: ''
    }
  },
  computed: {
    isShow() {
      return this.itemData.isShow
    },
    edgeLabel() {
      return this.itemData.edgeLabel
    }
  },
  methods: {
    changeEdge() {
      this.$emit('dblclick', this.itemData.id)
    },
    changeLabel(newValue) {
      this.$emit('inputedge', this.itemData.id, newValue)
    }
  }
}
</script>

<style scoped>
.mini-input{
  padding: 0 10px;
}
.pointer {
  cursor: pointer;
  background: #fff;
  padding: 5px;
  border-radius: 50%;
  margin: 0 50px;
  border: 1px solid #eee;
  box-sizing: content-box;
  box-shadow: 0 2px 3px 0 rgba(35, 75, 108, 0.6);
}
</style>
