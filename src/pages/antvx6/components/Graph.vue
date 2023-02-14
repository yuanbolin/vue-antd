<template>
  <div class="antv-menu">
    <a-tag style="margin: 10px 0;">
      {{ $t("graph.tag1") }}
    </a-tag>
    <ul class="menu-list">
      <li
        draggable="true"
        :title="$t('graph.tuoyuanxing')"
        @drag="menuDrag('defaultOval')"
      >
        <my-icon type="icon-tuoyuanxing" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.juxing')"
        @drag="menuDrag('defaultSquare')"
      >
        <my-icon type="icon-xingzhuang-juxing" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.yuanjiaojuxing')"
        @drag="menuDrag('defaultYSquare')"
      >
        <my-icon type="icon-juxing1604" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.lingxing')"
        @drag="menuDrag('defaultRhombus')"
      >
        <my-icon type="icon-tubiao" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.pingxingsibianxing')"
        @drag="menuDrag('defaultRhomboid')"
      >
        <my-icon type="icon-pinghangsibianxing" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.yuanxing')"
        @drag="menuDrag('defaultCircle')"
      >
        <my-icon type="icon-24gl-circle" />
      </li>
    </ul>
    <a-divider />
    <a-tag color="orange" style="margin-bottom: 10px;">
      {{ $t("graph.tag2") }}
    </a-tag>
    <ul class="menu-list">
      <li
        draggable="true"
        :title="$t('graph.qunzu')"
        @drag="menuDrag('Group')"
      >
        <my-icon type="icon-group24" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.chenggong')"
        @drag="menuDrag('Success')"
      >
        <a-icon type="check-circle" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.shibai')"
        @drag="menuDrag('Error')"
      >
        <a-icon type="close-circle" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.caiwu')"
        @drag="menuDrag('Money')"
      >
        <a-icon type="pay-circle" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.wuliu')"
        @drag="menuDrag('Wuliu')"
      >
        <my-icon type="icon-wuliuqiache2" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.yuanzhuti')"
        @drag="menuDrag('YuanZhuTi')"
      >
        <my-icon type="icon-yuanzhuti" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.liucheng')"
        @drag="menuDrag('LiuCheng')"
      >
        <my-icon type="icon-liucheng" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.shujuku')"
        @drag="menuDrag('ShuJuKu')"
      >
        <my-icon type="icon-database" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.yonghu')"
        @drag="menuDrag('YongHu')"
      >
        <my-icon type="icon-yonghu" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.wendang')"
        @drag="menuDrag('Note')"
      >
        <a-icon type="file-text" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.shipin')"
        @drag="menuDrag('Video')"
      >
        <my-icon type="icon-shipin" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.yinpin')"
        @drag="menuDrag('Music')"
      >
        <my-icon type="icon-yinpin" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.tupian')"
        @drag="menuDrag('Image')"
      >
        <my-icon type="icon-tupian1" />
      </li>
      <li
        draggable="true"
        :title="$t('graph.fengxian')"
        @drag="menuDrag('FengXian')"
      >
        <my-icon type="icon-fengxian" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyGraph",
  props: {},
  i18n: require("./i18n"),
  emits: ["menuDrag"],
  data() {
    return {};
  },
  methods: {
    menuDrag(type) {
      this.$emit("menuDrag", type);
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.antv-menu {
  width: 180px;
  border-right: 1px solid #d5d5d5;
  padding: 10px;
  h3 {
    padding: 10px;
  }
  .menu-list {
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    li {
      padding: 10px 5px;
      border-radius: 8px;
      border: 1px solid #555;
      background: #fff;
      margin: 5px 0;
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
      }
      i {
        font-size: 25px;
        color: #000000;
      }
    }
  }
}
</style>
