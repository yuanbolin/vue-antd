<template>
  <div @click="clickChildren">
    <svg t="1666860218489" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5643" width="100" height="100"><path
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      d="M516.1 128C217.5 125.9 66.8 240.3 64 471.1 61.3 702 209.2 818.5 507.8 820.6c76.9 0.5 245.8-36.5 245.8-36.5l178 111.9-39.3-213.4s66.7-140.1 67.5-205c2.9-230.9-145.1-347.5-443.7-349.6z"
      p-id="5644"
    /></svg>
    <el-tag class="bottom-center">{{ nodeName }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'Callout',
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
