<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      placeholder="名称搜索"
      @change="onChange"
    />
    <a-tree
      :show-line="true"
      :showIcon="true"
      :blockNode="true"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      :replaceFields="replaceFields"
      @expand="onExpand"
      @select="onSelect"
    >
      搜索时对应标题搜索值颜色标红
      <template v-slot:title="{ name }">
        <a-tooltip placement="right">
          <template slot="title">
            <span>{{ name }}</span>
          </template>
          <span class="tree-title" v-if="name.indexOf(searchValue) > -1">
            {{ name.substr(0, name.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ name.substr(name.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span class="tree-title" v-else>{{ name }}</span>
        </a-tooltip>
      </template>
    </a-tree>
  </div>
</template>

<script>
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  name: "SearchTree",
  props: {
    gData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      dataList: [],
      replaceFields: {
        children: "children",
        title: "name",
        key: "id",
        value: "id"
      }
    };
  },
  watch: {
    gData() {
      this.generateList(this.gData);
      console.log(this.gData);
      console.log(this.dataList);
    }
  },
  computed: {
    treeData() {
      function f(data) {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          node.isLeaf = node.type === "info";
          if (node.children) {
            f(node.children);
          }
        }
        return data;
      }
      return f(this.gData);
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = this.dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            console.log("findkey==>", item.key, this.gData);
            return getParentKey(item.key, this.gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      console.log("expandedKeys", expandedKeys);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    onSelect(selectedKeys, info) {
      this.$emit("treeSelect", selectedKeys, info);
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.id;
        this.dataList.push({
          key,
          title: node.name,
          isLeaf: node.type === "info"
        });
        if (node.children) {
          this.generateList(node.children);
        }
      }
    }
  }
};
</script>
<style>
.tree-title {
  white-space: normal;
  height: 24px;
  overflow: hidden;
  display: inline-block;
}
</style>
