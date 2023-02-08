<template>
  <antv-six v-model="tempGroupJson" :height="height"></antv-six>
</template>
<script>
import AntVXSix from "@/pages/antvx6/antvx6.vue";
import { mapState} from "vuex";

export default {
  name: "Flow",
  components: {
    "antv-six": AntVXSix
  },
  computed: {
    ...mapState("setting", [
      "fixedTabs"
    ])
  },
  data() {
    return {
      height: "calc(100vh - 185px)",
      tempGroupJson: ""
    };
  },
  watch: {
    fixedTabs(val) {
      if (val) {
        this.height = "calc(100vh - 121px)";
      } else {
        this.height = "calc(100vh - 185px)";
      }
    },
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
