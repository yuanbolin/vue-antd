<template>
  <antv :height="height" :value="value"></antv>
</template>
<script>
import AntvX6 from '@/pages/antvx6/antvx6.vue'
export default {
  name: "LiuCheng",
  components:{
    'antv':AntvX6
  },
  data() {
    return {
      height: "calc(100vh - 185px)" ,
      value: ""
    };
  },
  created() {
    // 返现方法
    try {
      if(sessionStorage.getItem("tempGroupJson") && JSON.parse(sessionStorage.getItem("tempGroupJson")).length)
        this.value =sessionStorage.getItem("tempGroupJson");
    } catch (e) {
      console.error("JSON数据解析失败", e);
    }
  },
  methods: {
  }
};
</script>
<style lang="less">

</style>
