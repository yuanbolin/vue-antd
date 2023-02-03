<template>
  <antv-six v-model="tempGroupJson" :height="height"></antv-six>
</template>
<script>
import AntVXSix from "@/pages/antvx6/antvx6.vue";
export default {
  name: "LiuCheng",
  components: {
    "antv-six": AntVXSix
  },
  data() {
    return {
      height: "calc(100vh - 185px)",
      tempGroupJson: ""
    };
  },
  watch: {
    tempGroupJson: {
      handler: function() {
        console.log(this.tempGroupJson);
      }
    }
  },
  created() {
    // 返现方法
    try {
      if (
        sessionStorage.getItem("tempGroupJson") &&
        JSON.parse(sessionStorage.getItem("tempGroupJson")).length
      )
        this.tempGroupJson = sessionStorage.getItem("tempGroupJson");
    } catch (e) {
      console.error("JSON数据解析失败", e);
    }
  },
  methods: {}
};
</script>
<style lang="less"></style>
