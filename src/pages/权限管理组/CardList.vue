<template>
  <page-layout :desc="desc">
    <div class="card-list">
      <div class="search">
        <a-form-model ref="form" :model="form" :rules="rules">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-model-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18, offset: 1 }"
                ref="name"
                label="管理组名称"
                prop="name"
              >
                <a-input placeholder="请输入" v-model="form.name" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <span style="float: right; margin-top: 3px;">
            <a-button @click="search" type="primary">查询</a-button>
            <a-button @click="resetSearchForm" style="margin-left: 8px"
              >重置</a-button
            >
          </span>
        </a-form-model>
      </div>
      <a-list
        :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
        :dataSource="dataSource"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <template v-if="item.add">
            <a-button class="new-btn" type="dashed" @click="$router.push('add')">
              <a-icon type="plus" />新增产品
            </a-button>
          </template>
          <template v-else>
            <a-card :hoverable="true">
              <a-card-meta @click="()=>toDetail(item)">
                <div style="margin-bottom: 3px" slot="title">
                  {{ item.title }}
                </div>
                <a-avatar
                  class="card-avatar"
                  slot="avatar"
                  :src="item.avatar"
                  size="large"
                />
                <div class="meta-content" slot="description">
                  {{ item.content }}
                </div>
              </a-card-meta>
              <router-link slot="actions" :to="`edit/${item.id}`"
                ><a-icon type="edit" />编辑</router-link
              >
              <a slot="actions">
                <a-popconfirm
                  title="确定要启用删除此权限组吗?"
                  @confirm="() => del(item.id)"
                >
                  <a-icon type="delete" />删除
                </a-popconfirm>
              </a>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
      <a-pagination
        class="paginationBox"
        show-quick-jumper
        :hideOnSinglePage="true"
        :defaultPageSize="8"
        :default-current="1"
        :total="500"
        @change="onChange"
      />
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
const dataSource = [];
dataSource.push({
  add: true
});
for (let i = 0; i < 8; i++) {
  dataSource.push({
    id: i + 1,
    title: "权限管理组" + (i + 1),
    avatar: require("@/assets/img/23-权限管理.png"),
    content:
      "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
  });
}

export default {
  name: "CardList",
  components: { PageLayout },
  data() {
    return {
      //搜索框
      form: {
        name: ""
      },
      rules: {
        name: []
      },
      desc: '将员工以小组形式分配流程模块的操作权限，分配“编辑”权限的用户可对管理范围内的流程进行新增、编辑、查阅。分配“查看”权限的用户可对管理范围内的流程进行查阅。',
      dataSource
    };
  },
  methods: {
    del(id) {
      console.log("删除", id);
    },
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
    },
    search() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form.name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetSearchForm() {
      this.$refs.form.resetFields();
      console.log(this.form.name);
    },
    //前往详情页
    toDetail(item){
      console.log(item)
      this.$router.push(`detail/${1}`)
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.card-list {
  background: #fff;
  padding: 15px;
  clear: both;
}
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 187px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.paginationBox {
  display: flex;
  justify-content: end;
  margin: 16px 0;
}
</style>
