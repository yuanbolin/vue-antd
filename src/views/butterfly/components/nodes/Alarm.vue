<template>
  <div @click="clickChildren">
    <svg t="1666860083213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5181" width="100" height="100">
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
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        d="M518.827 150.187c20.48 0 37.546-17.067 37.546-37.547V37.547C556.373 17.067 539.307 0 518.827 0S481.28 17.067 481.28 37.547v75.093c0 20.48 17.067 37.547 37.547 37.547z m283.306 75.093l51.2-51.2c13.654-13.653 13.654-37.547 0-51.2-13.653-13.653-37.546-13.653-51.2 0l-51.2 51.2c-13.653 13.653-13.653 37.547 0 51.2 13.654 17.067 37.547 17.067 51.2 0z m-563.2 0c13.654 13.653 37.547 13.653 51.2 0 17.067-13.653 17.067-37.547 3.414-51.2l-54.614-51.2c-13.653-13.653-37.546-13.653-51.2 0-13.653 13.653-13.653 37.547 0 51.2l51.2 51.2zM47.787 467.627h75.093c20.48 0 37.547-17.067 37.547-37.547 0-20.48-17.067-37.547-37.547-37.547H47.787c-20.48 0-37.547 17.067-37.547 37.547 0 20.48 17.067 37.547 37.547 37.547z m863.573 0h75.093c20.48 0 37.547-17.067 37.547-37.547 0-20.48-17.067-37.547-37.547-37.547H911.36c-20.48 0-37.547 17.067-37.547 37.547 0 20.48 17.067 37.547 37.547 37.547zM986.453 901.12H819.2V525.653c0-163.84-136.533-300.373-300.373-300.373S218.453 361.813 218.453 525.653V901.12H47.787c-20.48 0-37.547 17.067-37.547 37.547s17.067 37.546 37.547 37.546h938.666c20.48 0 37.547-17.066 37.547-37.546s-17.067-37.547-37.547-37.547zM518.827 447.147L634.88 645.12l-119.467 13.653 20.48 150.187-133.12-194.56 122.88-17.067-6.826-150.186z"
        p-id="5182"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>
    <i v-if="action" class="el-icon-error close_box" @click.stop="delnode" />
  </div>
</template>

<script>
export default {
  name: 'Alarm',
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
