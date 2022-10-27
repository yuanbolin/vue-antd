<template>
  <div @click="clickChildren">
    <svg t="1666860619993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7658" width="200" height="200"><path
      d="M64 64h896v896H64z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="7659"
    /></svg>
    <div>{{ nodeName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Square',
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

<style scoped></style>
