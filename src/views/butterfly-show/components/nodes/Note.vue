<template>
  <div>
    <svg t="1666860513407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7189" width="100" height="100">
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
        d="M682.666667 245.333333a10.666667 10.666667 0 0 0 10.666666 10.666667h189.913334c-0.913333-1.066667-1.86-2.12-2.866667-3.126667L685.793333 58.286667c-1.006667-1.006667-2.06-1.953333-3.126666-2.866667z"
        fill="#5C5C66"
        p-id="7190"
      /><path
        d="M640 245.333333V42.666667H181.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v832a53.393333 53.393333 0 0 0 53.333333 53.333333h661.333334a53.393333 53.393333 0 0 0 53.333333-53.333333V298.666667h-202.666667a53.393333 53.393333 0 0 1-53.333333-53.333334z m-320 10.666667h170.666667a21.333333 21.333333 0 0 1 0 42.666667H320a21.333333 21.333333 0 0 1 0-42.666667z m384 512H320a21.333333 21.333333 0 0 1 0-42.666667h384a21.333333 21.333333 0 0 1 0 42.666667z m21.333333-234.666667a21.333333 21.333333 0 0 1-21.333333 21.333334H320a21.333333 21.333333 0 0 1 0-42.666667h384a21.333333 21.333333 0 0 1 21.333333 21.333333z"
        filter="url(#f4)"
        :stroke="action?'#666':'#eee'"
        stroke-width="15"
        :opacity="action?1:0.9"
        :fill="nodeColor"
        p-id="7191"
      /></svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Note',
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
