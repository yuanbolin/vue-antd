<template>
  <div @click="clickChildren">
    <svg t="1666860676354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7966" width="100" height="100"><path
      d="M512.002558 64.24521c-247.292176 0-447.75786 200.464661-447.75786 447.756837 0 247.287059 200.464661 447.752744 447.75786 447.752744 247.286036 0 447.75172-200.464661 447.75172-447.752744C959.754279 264.710894 759.288594 64.24521 512.002558 64.24521zM512.010745 735.87586c-20.602224 0-37.319977-16.718777-37.319977-37.323047 0-20.597107 16.717753-37.319977 37.319977-37.319977 20.60427 0 37.297464 16.72287 37.297464 37.319977C549.308209 719.158107 532.613992 735.87586 512.010745 735.87586zM549.308209 567.969733c0 20.600177-16.693194 37.293371-37.297464 37.293371-20.602224 0-37.319977-16.693194-37.319977-37.293371L474.690768 325.420581c0-20.605294 16.717753-37.297464 37.319977-37.297464 20.60427 0 37.297464 16.693194 37.297464 37.297464L549.308209 567.969733z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="7967"
    /></svg>
    <el-tag class="bottom-center">{{ nodeName }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'Warn',
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
