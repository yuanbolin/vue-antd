<template>
  <div @click="clickChildren">
    <svg t="1666860422345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6721" width="100" height="100">
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
        d="M977.732267 373.640533 588.4416 70.5536c-33.501867-26.146133-86.084267-26.112-119.569067 0L79.598933 373.640533c-13.312 10.359467-15.581867 29.422933-5.0688 42.496 10.496 13.1072 29.3888 15.342933 42.683733 5.000533L136.533333 409.6l0 494.933333c0 51.950933 48.384 85.333333 97.262933 85.333333l614.314667 0C896.392533 989.866667 921.6 958.8224 921.6 904.533333L921.6 409.6l17.5616 11.537067c5.666133 4.386133 12.5952 6.5024 19.268267 6.5024 9.0624 0 18.158933-3.925333 24.200533-11.502933C993.160533 403.0464 991.061333 384 977.732267 373.640533zM631.466667 921.6 426.666667 921.6 426.666667 665.6c0-35.208533 39.0656-85.333333 102.4-85.333333s102.4 50.141867 102.4 85.333333L631.466667 921.6z"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        p-id="6722"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>
    <i v-if="action" class="el-icon-error close_box" @click.stop="delnode" />
  </div>
</template>

<script>
export default {
  name: 'Home',
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
