<template>
  <antv-six v-model="tempGroupJson" :height="height"></antv-six>
</template>
<script>
import AntVXSix from "@/pages/antvx6/antvx6.vue";
import { mapState } from "vuex";
import { process } from "@/services";
export default {
  name: "Flow",
  components: {
    "antv-six": AntVXSix
  },
  computed: {
    ...mapState("setting", ["fixedTabs"])
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
    console.log("流程id==》", this.$route.params.id);
    if (this.$route.params.id) {
      this.getContent(this.$route.params.id);
    }
  },
  methods: {
    //获取流程图
    getContent(id) {
      this.loading = true;
      process
        .getContent({ id })
        .then(({ data }) => {
          if (data.code === "1000") {
            console.log("data", data);
          } else {
            this.$message.error(data.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less"></style>
