<template>
  <div @click="clickChildren">
    <svg t="1666860184596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5489" width="100" height="100"><path
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
      p-id="5490"
    /></svg>
    <el-tag class="bottom-center">{{ nodeName }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'CircleNode',
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
