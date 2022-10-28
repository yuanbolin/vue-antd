<template>
  <div>
    <svg t="1666860470694" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7035" width="100" height="100">
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
        d="M515.2 64c-246.4 0-448 198.4-448 444.8S268.8 953.6 512 953.6c246.4 0 444.8-201.6 444.8-444.8S758.4 64 515.2 64z m-118.4 441.6c-9.6 9.6-28.8 9.6-41.6 0l-22.4-25.6-12.8-9.6c-19.2-22.4-32-48-35.2-76.8 0-28.8 9.6-57.6 28.8-76.8 22.4-19.2 48-28.8 76.8-28.8 28.8 0 60.8 12.8 83.2 35.2l86.4 86.4c22.4 22.4 35.2 51.2 35.2 80 0 25.6-9.6 51.2-28.8 70.4-9.6 9.6-28.8 9.6-41.6 0-9.6-9.6-9.6-28.8 0-38.4 19.2-19.2 16-51.2-3.2-73.6l-86.4-86.4c-12.8-12.8-25.6-19.2-41.6-19.2-9.6 0-22.4 3.2-32 12.8-12.8 12.8-12.8 25.6-12.8 35.2 0 12.8 6.4 28.8 19.2 38.4l12.8 12.8 22.4 22.4c3.2 12.8 3.2 28.8-6.4 41.6z m307.2 201.6c-19.2 19.2-44.8 28.8-73.6 28.8-28.8 0-60.8-12.8-83.2-35.2l-86.4-86.4c-22.4-22.4-35.2-51.2-35.2-80 0-25.6 9.6-51.2 28.8-70.4 9.6-9.6 28.8-9.6 41.6 0 9.6 9.6 9.6 28.8 0 38.4-19.2 19.2-16 51.2 3.2 73.6l86.4 86.4c12.8 12.8 25.6 19.2 41.6 19.2 9.6 0 22.4-3.2 32-12.8 12.8-12.8 12.8-25.6 12.8-35.2 0-12.8-6.4-28.8-19.2-38.4l-25.6-25.6-9.6-9.6c-9.6-9.6-9.6-28.8 0-38.4 9.6-9.6 28.8-9.6 41.6 0l12.8 12.8 19.2 19.2c22.4 19.2 35.2 48 35.2 73.6 9.6 32-3.2 57.6-22.4 80z"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        p-id="7036"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LinkNode',
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
