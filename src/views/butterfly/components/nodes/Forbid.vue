<template>
  <div @click="clickChildren">
    <svg t="1666864635795" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1839" width="100" height="100"><path
      d="M504.109851 16.453128c-278.332339 0-503.966321 225.632974-503.966321 503.966321S225.776505 1024.384762 504.109851 1024.384762s503.966321-225.632974 503.966321-503.966321S782.44219 16.453128 504.109851 16.453128zM242.706054 566.655409l0.04734-94.679771 525.432441 0-0.017123 94.679771L242.706054 566.655409z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="1840"
    /></svg>
    <el-tag class="bottom-center">{{ nodeName }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'Forbid',
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
