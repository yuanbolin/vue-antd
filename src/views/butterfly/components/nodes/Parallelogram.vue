<template>
  <div @click="clickChildren">
    <svg t="1666860552636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7350" width="100" height="100"><path
      d="M742.94 827.47H112l169.06-630.94H912z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="7351"
    /></svg>
    <el-tag class="bottom-center">{{ nodeName }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'Parallelogram',
  props: {
    nodeColor: {
      type: String,
      default: '#000'
    },
    nodeName: {
      type: String,
      default: ''
    },
    action: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickChildren() {
      this.$emit('clickchild')
    }
  }
}
</script>

<style scoped>
.bottom-center{
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
