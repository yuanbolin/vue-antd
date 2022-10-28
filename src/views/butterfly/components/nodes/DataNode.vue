<template>
  <div @click="clickChildren">
    <svg t="1666860249713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5797" width="100" height="100">
      <defs>
        <filter id="f4" x="0" y="0" width="200%" height="200%">
          <feOffset
            result="offOut"
            in="SourceGraphic"
            dx="20"
            dy="20"
          />
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0
1 0"
          />
          <feGaussianBlur
            result="blurOut"
            in="matrixOut"
            stdDeviation="10"
          />
          <feBlend
            in="SourceGraphic"
            in2="blurOut"
            mode="normal"
          />
        </filter>
      </defs>
      <path
        filter="url(#f4)"
        d="M552.96 532.48h-81.92c-54.613 0-98.987 40.96-98.987 92.16v307.2c0 51.2 44.374 92.16 98.987 92.16h81.92c54.613 0 98.987-40.96 98.987-92.16v-307.2c-3.414-51.2-44.374-92.16-98.987-92.16zM907.947 34.133L587.093 252.587 430.08 146.773c-17.067-10.24-37.547-10.24-54.613 0L34.133 378.88c-10.24 6.827-17.066 17.067-17.066 27.307 0 10.24 3.413 20.48 10.24 30.72 6.826 6.826 20.48 13.653 34.133 13.653 10.24 0 20.48-3.413 27.307-10.24l314.026-211.627 157.014 105.814c17.066 10.24 40.96 10.24 58.026 0l341.334-235.52c20.48-13.654 23.893-44.374 6.826-64.854-17.066-10.24-40.96-13.653-58.026 0z m-727.04 450.56h-81.92c-51.2 0-95.574 37.547-98.987 88.747v361.813C0 986.453 44.373 1024 98.987 1024h81.92c51.2 0 95.573-37.547 98.986-88.747V573.44c-3.413-47.787-47.786-88.747-98.986-88.747z m744.106-112.64h-81.92c-54.613 0-98.986 40.96-98.986 92.16V931.84c0 51.2 44.373 92.16 98.986 92.16h81.92c54.614 0 98.987-40.96 98.987-92.16V464.213c0-51.2-44.373-92.16-98.987-92.16z"
        p-id="5798"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>
    <i v-if="action" class="el-icon-error close_box" @click.stop="delnode" />
  </div>
</template>

<script>
export default {
  name: 'DataNode',
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
    },
    delnode() {
      this.$emit('delnode')
    }
  }
}
</script>

<style scoped>
.bottom-center {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 110%;
}
.tag {
  white-space: pre-wrap;
  height: auto;
  word-wrap:break-word;
  transform: translateX(-50%);
  text-align: center
}
.close_box{
  position: absolute;
  left: 90%;
  bottom: 90%;
  color: red;
  font-size: 20px;
  cursor: pointer;
}
</style>
