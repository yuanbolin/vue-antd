<template>
  <div @click="clickChildren">
    <svg t="1666860398877" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6567" width="200" height="200"><path
      d="M112 512a400 240 0 1 0 800 0 400 240 0 1 0-800 0Z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="6568"
    /></svg>
    <div>{{ nodeName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Elipse',
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
