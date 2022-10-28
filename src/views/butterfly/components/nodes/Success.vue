<template>
  <div @click="clickChildren">
    <svg t="1666860963941" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8120" width="100" height="100">
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
        d="M511.998465 64.37517c-247.322875 0-447.819259 200.408379-447.819259 447.623807 0 247.216451 200.49536 447.625854 447.819259 447.625854 247.323898 0 447.820282-200.409402 447.820282-447.625854C959.818747 264.783549 759.322363 64.37517 511.998465 64.37517L511.998465 64.37517zM768.856507 395.891586 479.228107 685.394119l-0.00614 0.00921c-13.355169 13.351076-33.714869 15.433504-49.256844 6.257517-2.87856-1.702782-5.590322-3.790326-8.063653-6.257517-0.004093-0.004093-0.004093-0.004093-0.004093-0.004093L255.143493 518.718005c-15.827477-15.821337-15.827477-41.4746 0-57.300031 15.827477-15.821337 41.48995-15.821337 57.319473 0l138.102335 138.039913 260.97071-260.863263c15.833617-15.820314 41.498136-15.820314 57.325613 0C784.685008 354.416985 784.685008 380.070248 768.856507 395.891586L768.856507 395.891586zM768.856507 395.891586"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        p-id="8121"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>
    <i v-if="action" class="el-icon-error close_box" @click.stop="delnode" />
  </div>
</template>

<script>
export default {
  name: 'Success',
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
