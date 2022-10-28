<template>
  <div>
    <svg t="1666860135157" class="icon" viewBox="0 0 1034 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5335" width="100" height="100">
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
        d="M1017.408 617.813c-3.414-58.026-40.96-109.226-92.16-133.12l-47.787-225.28c-17.067-81.92-98.987-150.186-180.907-150.186H331.328c-81.92 0-163.84 68.266-180.907 150.186l-47.787 225.28c-51.2 23.894-88.746 75.094-92.16 133.12L0.234 761.173c-3.413 61.44 30.72 119.467 85.334 139.947 13.653 51.2 54.613 88.747 109.226 88.747 47.787 0 88.747-30.72 105.814-75.094H734.1c17.067 44.374 58.027 75.094 105.813 75.094 51.2 0 95.574-37.547 109.227-85.334 54.613-23.893 88.747-78.506 85.333-139.946l-17.066-146.774z m-832.854 30.72c13.654-13.653 30.72-20.48 51.2-20.48 17.067 0 37.547 6.827 51.2 20.48 13.654 13.654 20.48 34.134 20.48 51.2 0 20.48-6.826 37.547-20.48 51.2-13.653 13.654-30.72 20.48-51.2 20.48-17.066 0-37.546-6.826-51.2-20.48-13.653-13.653-20.48-30.72-20.48-51.2s6.827-37.546 20.48-51.2z m88.747-133.12c-10.24 0-20.48-3.413-27.307-13.653-6.826-6.827-10.24-17.067-6.826-30.72v-3.413l37.546-170.667c3.414-27.307 30.72-47.787 58.027-47.787h365.227c27.306 0 51.2 23.894 58.026 47.787l37.547 167.253v20.48c0 3.414-3.413 10.24-6.827 13.654-6.826 6.826-17.066 13.653-27.306 13.653H273.3z m471.04 133.12c13.653-13.653 30.72-20.48 51.2-20.48 17.067 0 37.547 6.827 51.2 20.48 13.653 13.654 20.48 34.134 20.48 51.2 0 20.48-6.827 37.547-20.48 51.2-13.653 13.654-30.72 20.48-51.2 20.48-17.067 0-37.547-6.826-51.2-20.48-13.653-13.653-20.48-30.72-20.48-51.2s6.827-37.546 20.48-51.2z"
        p-id="5336"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Car',
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
