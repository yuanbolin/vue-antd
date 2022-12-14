<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      placeholder="名称搜索"
      @change="onChange"
    />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      @expand="onExpand"
      @select="onSelect"
    >
      <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
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
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
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
      dataList: []
    };
  },
  watch: {
    gData() {
      this.generateList(this.gData);
      console.log(this.gData);
      console.log(this.dataList);
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
    onSelect(selectedKeys, info){
      this.$emit('treeSelect', selectedKeys, info)
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        this.dataList.push({ key, title: node.title });
        if (node.children) {
          this.generateList(node.children);
        }
      }
    }
  }
};
</script>
