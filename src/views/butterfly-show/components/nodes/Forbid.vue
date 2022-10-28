<template>
  <div>
    <svg t="1666864635795" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1839" width="100" height="100">
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
        d="M504.109851 16.453128c-278.332339 0-503.966321 225.632974-503.966321 503.966321S225.776505 1024.384762 504.109851 1024.384762s503.966321-225.632974 503.966321-503.966321S782.44219 16.453128 504.109851 16.453128zM242.706054 566.655409l0.04734-94.679771 525.432441 0-0.017123 94.679771L242.706054 566.655409z"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        p-id="1840"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Forbid',
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
