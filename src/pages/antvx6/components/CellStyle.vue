<template>
  <!--      编辑节点和连线样式-->
  <a-drawer
    :title="editTitle"
    :width="350"
    :visible="editDrawer"
    :body-style="{ paddingBottom: '30px' }"
    @close="closeEditForm"
  >
    <div
      v-if="editTitle === $t('cellStyle.nodeTitle')"
      :style="drawerMainHeight"
      class="form-main beauty-scroll"
    >
      <a-form ref="nodeForm" :model="form" label-width="80px">
        <a-form-item class="minInterval" :label="$t('cellStyle.nodeLabelText')">
          <a-input
            v-model="form.labelText"
            size="small"
            @input="changeNode('labelText', form.labelText)"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.nodeFontSize')">
          <a-input-number
            v-model="form.fontSize"
            size="small"
            :min="10"
            :max="30"
            @change="changeNode('fontSize', form.fontSize)"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.nodeFontFill')">
          <twitter-picker
            :defaultColors="defaultColors"
            :value="form.fontFill"
            @input="value => updateNodeValue('fontFill', value)"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.nodeFill')">
          <twitter-picker
            :defaultColors="defaultColors"
            :value="form.fill"
            @input="value => updateNodeValue('fill', value)"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.nodeStroke')">
          <twitter-picker
            :defaultColors="defaultColors"
            :value="form.stroke"
            @input="value => updateNodeValue('stroke', value)"
          />
        </a-form-item>
        <!--            <div class="see-box">-->
        <!--              <h5>预览</h5>-->
        <!--              <div class="see-item" :style="{ 'background': form.fill, 'color': form.fontFill, 'border-color': form.stroke, 'font-size': form.fontSize + 'px' }">{{ form.labelText }}</div>-->
        <!--            </div>-->
      </a-form>
    </div>
    <div
      v-if="editTitle === $t('cellStyle.edgeTitle')"
      :style="drawerMainHeight"
      class="form-main  beauty-scroll"
    >
      <a-form ref="edgeForm" :model="form" label-width="80px">
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeLabelText')">
          <a-input
            v-model="form.label"
            size="small"
            :placeholder="$t('cellStyle.edgeLabelTextph')"
            @input="
              changeEdgeLabel(
                form.label,
                labelForm.fontColor,
                labelForm.fill,
                labelForm.stroke
              )
            "
          />
          <div v-if="form.label" class="label-style">
            <a-form-item class="minInterval" :label="$t('cellStyle.edgeFontColor')">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="labelForm.fontColor"
                @input="value => updateEdgeValue('fontColor', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" :label="$t('cellStyle.edgeFill')">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="labelForm.fill"
                @input="value => updateEdgeValue('fill', value)"
              />
            </a-form-item>
            <a-form-item class="minInterval" :label="$t('cellStyle.edgeBoxStroke')">
              <twitter-picker
                :defaultColors="defaultColors"
                :value="labelForm.stroke"
                @input="value => updateEdgeValue('stroke', value)"
              />
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeStroke')">
          <twitter-picker
            :defaultColors="defaultColors"
            :value="form.stroke"
            @input="value => updateEdgeValue('stroke', value, 'edgeStroke')"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeConnector')">
          <a-select
            v-model="form.connector"
            size="small"
            @change="changeEdgeConnector"
          >
            <a-select-option value="normal">{{$t('cellStyle.edgeConnectorOptions1')}}</a-select-option>
            <a-select-option value="rounded">{{$t('cellStyle.edgeConnectorOptions2')}}</a-select-option>
            <a-select-option value="smooth">{{$t('cellStyle.edgeConnectorOptions3')}}</a-select-option>
            <a-select-option value="jumpover">{{$t('cellStyle.edgeConnectorOptions4')}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeStrokeWidth')">
          <a-input-number
            v-model="form.strokeWidth"
            size="small"
            :min="2"
            :step="2"
            :max="6"
            @change="changeEdgeStrokeWidth"
          />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeIsArrows')">
          <a-switch v-model="form.isArrows" @change="changeEdgeArrows" />
        </a-form-item>
        <a-form-item class="minInterval" :label="$t('cellStyle.edgeIsAnit')">
          <a-switch v-model="form.isAnit" @change="changeEdgeAnit" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script>
import { Twitter } from "vue-color";
export default {
  name: "MyToolbar",
  i18n: require("./i18n"),
  components: { "twitter-picker": Twitter },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      }
    },
    labelForm: {
      type: Object,
      default() {
        return {};
      }
    },
    editTitle: {
      type: String,
      default: ""
    },
    editDrawer: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "changeEdgeAnit",
    "changeEdgeArrows",
    "changeEdgeStrokeWidth",
    "changeEdgeConnector",
    "updateEdgeValue",
    "changeEdgeLabel",
    "updateNodeValue",
    "changeNode",
    "closeEditForm"
  ],
  data() {
    return {
      defaultColors: [
        //颜色选择器的颜色组
        "#000000",
        "#FCB900",
        "#7BDCB5",
        "#f7f7f7",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF"
      ],
      drawerMainHeight() {
        // 抽屉内容高度
        return { height: `calc(100vh - 120px)` };
      }
    };
  },
  mounted() {},
  methods: {
    changeEdgeAnit(val) {
      this.$emit("changeEdgeAnit", val);
    },
    changeEdgeArrows(val) {
      this.$emit("changeEdgeArrows", val);
    },
    changeEdgeStrokeWidth(val) {
      this.$emit("changeEdgeStrokeWidth", val);
    },
    changeEdgeConnector(val) {
      this.$emit("changeEdgeConnector", val);
    },
    updateEdgeValue(name, value, type) {
      this.$emit("updateEdgeValue", name, value, type);
    },
    changeEdgeLabel(label, fontColor, fill, stroke) {
      this.$emit("changeEdgeLabel", label, fontColor, fill, stroke);
    },
    updateNodeValue(name, value) {
      this.$emit("updateNodeValue", name, value);
    },
    changeNode(type, value) {
      this.$emit("changeNode", type, value);
    },
    closeEditForm() {
      this.$emit("closeEditForm");
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
      color: #555;
    }
    .toolbar-box:hover {
      background: #eee;
    }
    .toolbar-box.active {
      color: #aaaaaa;
    }
    .toolbar-box.active:hover {
      cursor: not-allowed;
    }
  }
  .small.col {
    width: 50px;
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
