<template>
  <div class="antv-menu">
    <a-tag color="blue">
      基础图形
    </a-tag>
    <ul class="menu-list">
      <li draggable="true" @drag="menuDrag('defaultOval')">
        <i class="icon-oval" /> <strong>椭圆形</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultSquare')">
        <i class="icon-square" /><strong>矩形</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultYSquare')">
        <i class="icon-ysquare" /><strong>圆角矩形</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultRhombus')">
        <i class="icon-rhombus" /><strong>菱形</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultRhomboid')">
        <i class="icon-rhomboid" /><strong>平行四边形</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultCircle')">
        <i class="icon-circle" /><strong>圆形</strong>
      </li>
    </ul>
    <a-divider />
    <a-tag color="cyan">
      扩展图形
    </a-tag>
    <ul class="menu-list">
      <li draggable="true" @drag="menuDrag('defaultNote')">
        <a-icon type="file-text" /><strong>文档</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultSuccess')">
        <a-icon type="check-circle" /><strong>成功</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultError')">
        <a-icon type="close-circle" /><strong>失败</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultMoney')">
        <a-icon type="pay-circle" /><strong>财务</strong>
      </li>
      <li draggable="true" @drag="menuDrag('defaultWuliu')">
        <a-icon type="pay-circle" /><strong>物流</strong>
      </li>
    </ul>
    <div v-if="isChange" class="wrapper-btn">
      <a-button type="primary" @click="handlerSend">保存当前方案</a-button>
      <!--          <a-button type="success" @click="toPNG">保存为PNG图片</a-button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "MyGraph",
  props: {
    isChange: {
      type: Boolean,
      default: false
    }
  },
  emits:['menuDrag','handlerSend'],
  data() {
    return {
    };
  },
  methods: {
    menuDrag(type){
      this.$emit('menuDrag',type)
    },
    handlerSend(){
      this.$emit('handlerSend')
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
  li {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #555;
    background: #fff;
    margin: 5px 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
    i {
      font-size: 18px;
      margin-right: 10px;
    }
    strong {
      flex: 1;
    }
  }
}
</style>
