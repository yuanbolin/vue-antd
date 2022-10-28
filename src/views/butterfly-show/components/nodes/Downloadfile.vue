<template>
  <div>
    <svg t="1666860339731" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6259" width="100" height="100">
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
        d="M98.645 974.848h831.147c26.624-0.341 51.541-11.605 69.632-31.061 18.09-19.115 27.648-45.056 26.624-71.339V285.355a98.543 98.543 0 0 0-98.645-97.963l-386.731 4.096a31.061 31.061 0 0 1-24.917-11.605l-58.027-65.195c-18.773-21.504-45.739-34.133-74.41-33.792H98.644C44.373 80.896 0.341 124.586 0 178.859v698.368c0.341 53.93 44.373 97.621 98.645 97.621z m158.72-491.861h91.819V367.275c0-15.702 12.97-28.672 28.672-28.672h270.677c15.702 0 28.672 12.97 28.672 28.672v115.712h91.819c24.235 0 37.547 28.33 22.187 47.104-85.334 103.765-170.667 207.189-256 310.954a28.672 28.672 0 0 1-44.374 0c-85.333-103.765-170.666-207.189-256-310.954-15.018-18.774-1.706-47.104 22.528-47.104z"
        p-id="6260"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Downloadfile',
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
