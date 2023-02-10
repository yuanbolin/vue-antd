<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      :placeholder="$t('searchTree.placeholder')"
      @change="onChange"
    />
    <a-tree
      :show-line="true"
      :blockNode="true"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      :replaceFields="replaceFields"
      @expand="onExpand"
      @select="onSelect"
    >
      {{ $t("searchTree.tip") }}
      <template v-slot:title="record">
        <a-tooltip placement="right">
          <template slot="title">
            <span>{{ record.name }}</span>
          </template>
          <span
            :style="{
              color: theme.color || '#f50'
            }"
            class="tree-title"
            v-if="record.name.indexOf(searchValue) > -1"
          >
            {{ record.name.substr(0, record.name.indexOf(searchValue)) }}
            <span
              :style="{
                color: '#fff',
                background: theme.color || '#f50'
              }"
              >{{ searchValue }}</span
            >
            {{
              record.name.substr(
                record.name.indexOf(searchValue) + searchValue.length
              )
            }}
          </span>
          <span
            :style="{
              color: theme.color || '#f50'
            }"
            class="tree-title"
            v-else
            >{{ record.name }}</span
          >
        </a-tooltip>
      </template>
    </a-tree>
  </div>
</template>

<script>
import { mapState } from "vuex";

/**
 * 目录类型枚举
 * @type {{CATALOGUE: string, INFO: string}}
 * CATALOGUE 普通目录
 * INFO 流程目录
 */
const CatalogueType = {
  DIRECTORY: "DIRECTORY",
  PROCESS: "PROCESS"
};
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
  i18n: require("./i18n"),
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
      },
      CatalogueType
    };
  },
  watch: {
    gData() {
      this.generateList(this.gData);
    }
  },
  computed: {
    ...mapState("setting", ["theme"]),
    treeData() {
      function f(data) {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          node.isLeaf = node?.type === CatalogueType.PROCESS;
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
            return getParentKey(item.key, this.gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    onSelect(selectedKeys) {
      const arr = [];
      function treeToList(tree) {
        for (let i = 0; i < tree.length; i++) {
          let item = tree[i];
          arr.push(item);
          if (item?.children instanceof Array) {
            treeToList(item.children);
          }
        }
      }
      treeToList(this.treeData);
      this.$emit("treeSelect", this.findById(selectedKeys[0], arr)[0]);
    },
    findById(id, arr) {
      return arr.filter(item => id === item.id);
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.id;
        this.dataList.push({
          key,
          title: node.name,
          isLeaf: node?.type === CatalogueType.PROCESS
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
