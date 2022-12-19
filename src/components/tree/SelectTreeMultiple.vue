<template>
  <a-tree-select
    v-model="treeVlue"
    tree-checkable
    @change="onChange"
    searchPlaceholder="名称搜索"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    placeholder="请选择"
    :replaceFields="replaceFields"
    tree-default-expand-all
    tree-node-filter-prop="title"
  >
  </a-tree-select>
</template>

<script>
export default {
  name: "SelectTreeMultiple",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    treeData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      replaceFields: {
        children: "children",
        title: "name",
        key: "id",
        value: "id"
      },
      treeVlue: this.value
    };
  },
  watch: {
    value() {
      this.treeVlue = this.value;
    }
  },
  mounted() {
    console.log(this.treeData);
    console.log(this.value);
  },
  methods: {
    onChange(value, label, extra) {
      console.log(value, label, extra);
      this.$emit("change", value);
    }
  }
};
</script>
