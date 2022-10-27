<template>
  <div @click="clickChildren">
    <svg t="1666859977717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4981" width="200" height="200">
      <path
        :stroke="action?'#000':nodeColor"
        stroke-width="15"
        :fill="nodeColor"
        d="M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z m214.47 479.73h-183v183a32 32 0 0 1-64 0v-183h-183a32 32 0 0 1 0-64h183v-183a32 32 0 0 1 64 0v183h183a32 32 0 0 1 0 64z"
        p-id="4982"
      /></svg>
    <div>{{ nodeName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Add',
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
