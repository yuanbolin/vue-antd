<template>
  <div class="toolbar-container">
    <div class="col line1">
      <a-dropdown
        placement="bottomCenter"
        v-model="visible"
        :trigger="['click']"
      >
        <a
          class="toolbar-box"
          title="查看（鼠标按住并拖拽以移动画布）"
          @click="e => e.preventDefault()"
        >
          <a-icon type="control" style="color: #555;margin-right: 3px;" />
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay" class="menu">
          <a-menu-item style="border-bottom: 1px dashed #ccc;">
            <div class="option">
              <a class="title" href="javascript:;" @click="changePortsShow"
                >链接桩常显</a
              >
              <div class="state">
                <a-icon v-if="isPortsShow" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="changeGrid"
                >网格显示/隐藏</a
              >
              <div class="state">
                <a-icon v-if="visiableGrid" type="check" />
              </div>
            </div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-divider class="divider" type="vertical" />
    <div class="col line2">
      <a-dropdown placement="bottomCenter" :trigger="['click']">
        <a
          class="toolbar-box"
          title="缩放（按住Alt+鼠标滚轮）"
          @click="e => e.preventDefault()"
        >
          <span style="color: #555;">{{ parseInt(zoom * 100) }}%</span>
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay" class="menu">
          <a-menu-item style="border-bottom: 1px dashed #ccc;">
            <div class="option">
              <a class="title" href="javascript:;" @click="transform('center')"
                >内容居中</a
              >
              <div class="state"></div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(0.25)"
                >25%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 0.25" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(0.5)"
                >50%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 0.5" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(0.75)"
                >75%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 0.75" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(1)"
                >100%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 1" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(1.25)"
                >125%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 1.25" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(1.5)"
                >150%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 1.5" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item style="border-bottom: 1px dashed #ccc;">
            <div class="option">
              <a class="title" href="javascript:;" @click="transform(2)"
                >200%</a
              >
              <div class="state">
                <a-icon v-if="zoom === 2" type="check" />
              </div>
            </div>
          </a-menu-item>
          <a-menu-item>
            <div class="option">
              <a
                class="title"
                href="javascript:;"
                @click="transform('zoomToFit')"
                >整页显示</a
              >
              <div class="state"></div>
            </div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-divider class="divider" type="vertical" />
    <div class="col line3">
      <a
        class="toolbar-box"
        title="放大（按住Alt+鼠标滚轮向上滚动）"
        href="javascript:;"
        @click="transform(zoom + 0.1)"
      >
        <a-icon type="zoom-in" style="color: #555;" />
      </a>
      <a
        class="toolbar-box"
        title="缩小（按住Alt+鼠标滚轮向下滚动）"
        href="javascript:;"
        @click="transform(zoom - 0.1)"
      >
        <a-icon type="zoom-out" style="color: #555;" />
      </a>
    </div>
    <a-divider class="divider" type="vertical" />
    <div class="col line3">
      <a
        class="toolbar-box"
        title="撤销（按住ctrl+z）"
        href="javascript:;"
        @click="transform(zoom + 0.1)"
      >
        <my-icon type="icon-editor-undo" style="color: #555;" />
      </a>
      <a
        class="toolbar-box"
        title="重做（按住Shift+ctrl+z）"
        href="javascript:;"
        @click="transform(zoom - 0.1)"
      >
        <my-icon type="icon-editor-redo" style="color: #555;" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyToolbar",
  props: {
    isPortsShow: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Number,
      default: 100
    },
    visiableGrid: {
      type: Boolean,
      default: true
    }
  },
  emits: ["changePortsShow", "changeZoom", "changeContent", "changeGrid"],
  data() {
    return {
      visible: false
    };
  },
  mounted() {},
  methods: {
    changePortsShow() {
      this.$emit("changePortsShow", !this.isPortsShow);
    },
    changeGrid() {
      this.$emit("changeGrid", !this.visiableGrid);
    },
    transform(val) {
      //限制缩放比例在0.2-2
      if (val < 0.2 || parseFloat(val.toFixed(2)) > 2) {
        return;
      }
      if (typeof val === "string") {
        this.$emit("changeContent", val);
      }
      if (typeof val === "number") {
        this.$emit("changeZoom", val);
      }
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.toolbar-container {
  width: 100%;
  height: 38px;
  background: #f1f3f4;
  border-width: 1px;
  border-color: lightgray;
  border-style: none none solid none;
  display: flex;
  flex-direction: row;
  align-items: center;
  .col {
    width: 100px;
    .toolbar-box {
      display: block;
      text-align: center;
      height: 38px;
      line-height: 38px;
    }
    .toolbar-box:hover {
      background: #eee;
    }
  }
  .line3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .toolbar-box {
      width: 30px;
    }
  }
}
.ant-dropdown-link {
  font-size: 18px;
}
.divider {
  background: #aaa;
}
.menu {
  .option {
    display: flex;
    flex-direction: row;
    .title {
      color: #555;
      width: 100px;
    }
    .state {
      width: 40px;
      text-align: center;
    }
  }
}
</style>
