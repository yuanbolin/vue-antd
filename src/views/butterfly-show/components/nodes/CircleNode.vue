<template>
  <div style="position: relative;">
    <svg
      t="1666860184596"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5489"
      width="100"
      height="100"
    >
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
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        p-id="5490"
      />
    </svg>
    <div class="bottom-center">
      <el-tag class="tag">{{ nodeName }}</el-tag>
    </div>
    <div v-if="nodeType==='node_info'" class="info_btn" @click="nodeInfoHandle">
      <svg t="1667270643748" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1745" width="30" height="30">
        <defs>
          <filter id="f3" x="0" y="0" width="200%" height="200%">
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
        <path class="node_btn" filter="url(#f3)" d="M924.3 338.4c-22.5-53.7-54.9-101.9-96.1-143.3-41.2-41.3-89.3-73.8-143-96.3C630.3 75.7 572.1 64 512 64h-2c-60.5 0.3-119 12.3-174.1 35.9-53.2 22.8-100.9 55.2-141.7 96.5-40.8 41.3-72.8 89.3-95 142.8C76.3 394.6 64.7 453.5 65 514.1c0.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8c61.5 31.1 130.2 47.7 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3 53.4-22.3 101.4-54.3 142.5-95.2 41.2-40.9 73.6-88.7 96.3-142 23.5-55.2 35.5-113.9 35.8-174.5 0.2-60.9-11.6-120-34.8-175.6zM312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.4 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48 47.9 21.5 47.9 48-21.5 48-47.9 48z" p-id="1746" /></svg>
    </div>
    <div v-else-if="nodeType==='node_file'" class="info_btn" @click="nodeFileHandle">
      <svg t="1667281392431" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1945" width="30" height="30">
        <defs>
          <filter id="f3" x="0" y="0" width="200%" height="200%">
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
        <path class="node_btn" filter="url(#f3)" d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2z" p-id="1946" />
      </svg>
    </div>
    <div v-else-if="nodeType==='node_link'" class="info_btn" @click="nodeLinkHandle">

      <svg t="1667281465505" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2099" width="30" height="30">
        <defs>
          <filter id="f3" x="0" y="0" width="200%" height="200%">
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
        <path class="node_btn" filter="url(#f3)" d="M161.792 824.448A64.106667 64.106667 0 0 1 128 768V256a64.021333 64.021333 0 1 1 99.52-53.248l384 256a64 64 0 0 1-0.064 106.496l-384 256a63.872 63.872 0 0 1-65.664 3.2zM704 832c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64h-128z" p-id="2100" /></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleNode',
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
    },
    nodeType: {
      type: String,
      default: ''
    },
    textarea: {
      type: String,
      default: ''
    },
    file: {
      type: String,
      default: ''
    },
    linkValue: {
      type: Array,
      default: () => []
    }
  },
  beforeMount() {
    console.log(this)
  },
  methods: {
    clickChildren() {
      this.$emit('clickchild')
    },
    delnode() {
      this.$emit('delnode')
    },
    nodeInfoHandle() {
      this.$alert(this.textarea, this.nodeName, {
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      })
    },
    nodeFileHandle() {
      console.log(this.file)
    },
    nodeLinkHandle() {
      console.log(this.linkValue)
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
.info_btn{
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.node_btn {
  fill: rgb(27, 215, 193);
  stroke: #fff;
  stroke-width: 15px;
}
.node_btn:hover {
  fill: rgb(245, 110, 12);
}
</style>
