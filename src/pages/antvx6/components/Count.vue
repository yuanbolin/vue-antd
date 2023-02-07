<!--自定义vue子组件demo。仅供参考，目前无用-->
<template>
  <div class="red-box">
    <a-button @click="add()">内部Add: {{ num }} </a-button>
  </div>
</template>

<script>
export default {
  name: "Count",
  inject: ["getGraph", "getNode"],
  data() {
    return {
      num: 0
    };
  },
  mounted() {
    const self = this;
    const node = this.getNode();
    const graph = this.getGraph();
    console.log(node);
    console.log(graph);
    // 监听数据改变事件
    node.on("change:data", ({ current }) => {
      console.log(node);
      self.num = current.num;
    });
  },
  methods: {
    add() {
      const node = this.getNode();
      const { num } = node.getData();
      node.setData({
        num: num + 1
      });
      this.$emit("test1");
    }
  }
};
</script>
<style>
.red-box {
  height: 100%;
  background: red;
}
</style>
