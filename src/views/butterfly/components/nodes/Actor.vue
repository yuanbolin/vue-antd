<template>
  <div @click="clickChildren">
    <svg
      t="1666851903612"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4789"
      width="100"
      height="100"
    >
      <path
        :stroke="action?'#000':nodeColor"
        stroke-width="15"
        :fill="nodeColor"
        d="M841.4 960.2H186.7c-58.4-289.6 126-418.5 222.5-465.1-51-38.9-101.1-107.1-101.1-224.2 0-114.1 91.3-206.6 203.8-206.6s203.8 92.5 203.8 206.6c0 72.9-35.5 163.7-90.5 219.9 277.5 108.9 216.2 469.4 216.2 469.4z"
        p-id="4790"
      />
    </svg>
    <div>{{ nodeName }}</div>
  </div>
</template>

<script>
export default {
  name: 'Actor',
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
