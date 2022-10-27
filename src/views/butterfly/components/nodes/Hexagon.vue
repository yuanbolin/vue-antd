<template>
  <div @click="clickChildren">
    <svg t="1666860453370" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6875" width="200" height="200"><path
      d="M736 124H288L64 512l224 388h448l224-388z"
      :stroke="action?'#000':nodeColor"
      stroke-width="15"
      :fill="nodeColor"
      p-id="6876"
    /></svg>
    <div>{{ nodeName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Hexagon',
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
