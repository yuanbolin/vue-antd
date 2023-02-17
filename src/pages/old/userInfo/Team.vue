<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      placeholder="名称搜索"
      @change="onChange"
    />
    <a-tree
      :showIcon="true"
      :blockNode="true"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      :replaceFields="replaceFields"
      @expand="onExpand"
      @select="onSelect"
    >
      <a-icon slot="group" type="bank" />
      <a-icon slot="user" type="user" />
      <!--      搜索时对应标题搜索值颜色标红-->
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
  name: "Team",
  data() {
    return {
      data: [],
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
      loading: false
    };
  },
  computed: {
    treeData() {
      function f(data) {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          node.isLeaf = node.type === "user";
          node.slots = {
            icon: node.type
          };
          if (node.children) {
            f(node.children);
          }
        }
        return data;
      }
      return f(this.data);
    }
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.data = [
        {
          id: 1, //主键id
          name: "浙江宏利汽配集团有限公司", //名称
          type: "group",
          message: "这是一个浙江宏利汽配集团有限公司的描述", //描述
          children: [
            {
              id: 13,
              name: "浙江华钜汽车零部件股份有限公司",
              type: "group",
              message: "这是一个浙江华钜汽车零部件股份有限公司的描述",
              children: [
                {
                  id: 131,
                  name: "信息中心",
                  type: "group",
                  message: "这是一个信息中心的描述",
                  children: [
                    {
                      id: 1311,
                      type: "user",
                      name: "张三-部门经理",
                      message: "这是一个软件研发部的描述"
                    },
                    {
                      id: 1312,
                      type: "user",
                      name: "李四-信息员",
                      message: "这是一个信息运营部的描述"
                    }
                  ]
                }
              ]
            },
            //子级
            {
              id: 11,
              name: "浙江宏利汽车零部件股份有限公司",
              type: "group",
              message: "这是一个浙江宏利汽车零部件股份有限公司的描述"
            },
            {
              id: 12,
              name: "浙江康普瑞汽车零部件有限公司",
              type: "group",
              message: "这是一个浙江康普瑞汽车零部件有限公司的描述",
              children: [
                {
                  id: 121,
                  type: "info",
                  name: "人力资源中心",
                  message: "这是一个人力资源中心的描述"
                }
              ]
            },
            {
              id: 14,
              type: "group",
              name: "财务中心",
              message: "这是一个财务中心的描述"
            }
          ]
        },
        {
          id: 2,
          type: "group",
          name: "嘉兴科进机械制造有限公司",
          message: "这是一个嘉兴科进机械制造有限公司的描述"
        }
      ];
      this.$nextTick(() => {
        this.generateList(this.data);
        this.loading = false;
      });
    }, 500);
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
            console.log("findkey==>", item.key, this.data);
            return getParentKey(item.key, this.data);
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
      console.log(selectedKeys, info);
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

<style scoped></style>
