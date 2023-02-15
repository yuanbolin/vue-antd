<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">
        {{ welcome.timeFix[lang] }}，{{ currUser.name }}，{{
          welcome.message[lang]
        }}
      </div>
      <div>{{ currUser.description }}</div>
    </div>
    <template slot="extra">
      <head-info
        class="split-right"
        :title="$t('project')"
        :content="countData.total_count"
      />
      <head-info
        class="split-right"
        :title="$t('progress')"
        :content="countData.unpublished_count"
      />
    </template>
    <template>
      <a-row style="margin: 0 -12px">
        <a-col
          style="padding: 0 12px"
          :xl="24"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
        >
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            :title="$t('progress')"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra" @click="toFlow">{{ $t("all") }}</a>
            <div>
              <a-card-grid :key="i" v-for="(item, i) in projects">
                <a-card
                  @click="toProcess(item.id)"
                  :bordered="false"
                  :body-style="{ padding: 0, cursor: 'pointer' }"
                >
                  <a-card-meta :description="item.description">
                    <div slot="title" class="card-title">
                      <a-tag color="orange">
                        {{ $t("level") }} : {{ parseInt(item.level) - 1 }}
                      </a-tag>
                      <span>{{ item.name }}</span>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a class="group"
                      ><b>{{ $t("generated_time") }}</b> :
                      {{ formatTime(item.generated_time) }}</a
                    >
                    <span class="datetime"
                      ><b>{{ $t("modified_time") }}</b> :
                      {{ changeTime(item.modified_time) }}</span
                    >
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </page-layout>
</template>

<script>
import moment from "moment";
import PageLayout from "@/layouts/PageLayout";
import HeadInfo from "@/components/tool/HeadInfo";
import { mapState } from "vuex";
import { workPlace } from "@/services";
import avatar from "@/assets/img/avatar.png";
import { getMomentLanguage } from "@/utils/i18nUtil";
const timeList = [
  {
    CN: "早上好",
    HK: "早晨啊",
    US: "Good morning"
  },
  {
    CN: "上午好",
    HK: "上午好",
    US: "Good morning"
  },
  {
    CN: "中午好",
    HK: "中午好",
    US: "Good afternoon"
  },
  {
    CN: "下午好",
    HK: "下午好",
    US: "Good afternoon"
  },
  {
    CN: "晚上好",
    HK: "晚上好",
    US: "Good evening"
  }
];
const welcomeMessages = [
  {
    CN: "休息一会儿吧",
    HK: "休息一會兒吧",
    US: "you may need a break"
  },
  {
    CN: "准备吃什么呢",
    HK: "準備吃什麼呢",
    US: "what are you going to eat"
  },
  {
    CN: "新的一天，工作加油！",
    HK: "新的一天，工作加油！",
    US: "A new day, work come on!"
  },
  {
    CN: "我猜你可能累了",
    HK: "我猜你可能累了",
    US: "i guess you might be tired"
  }
];
export default {
  name: "WorkPlace",
  components: { PageLayout, HeadInfo },
  i18n: require("./i18n"),
  data() {
    return {
      avatar,
      projects: [],
      countData: {
        published_count: 0,
        total_count: 0,
        unpublished_count: 0
      },
      loading: true,
      teams: [],
      welcome: {
        timeFix: "",
        message: ""
      }
    };
  },
  computed: {
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"])
  },
  created() {
    workPlace.getCount().then(({ data }) => {
      if (data.code === "1000") {
        if (data.data) {
          this.countData = { ...data.data };
        }
      } else {
        this.$message.error(data.msg);
      }
    });

    workPlace
      .getList()
      .then(({ data }) => {
        if (data.code === "1000") {
          if (data.data) {
            console.log(data.data);
            this.projects = data.data;
          }
        } else {
          this.$message.error(data.msg);
        }
      })
      .finally(() => {
        this.loading = false;
      });

    const time = new Date();
    const hour = time.getHours();
    this.welcome = {
      timeFix:
        hour < 9
          ? timeList[0]
          : hour <= 11
          ? timeList[1]
          : hour <= 13
          ? timeList[2]
          : hour <= 20
          ? timeList[3]
          : timeList[4],
      message: welcomeMessages[parseInt(Math.random() * 3)]
    };
  },
  methods: {
    formatTime(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    changeTime(time) {
      if (time) {
        return (
          moment(time)
            .locale(getMomentLanguage(this.lang))
            .fromNow(true) +
          " " +
          this.$t("ago")
        );
      } else {
        return this.$t("unrevised");
      }
    },
    toFlow() {
      this.$router.push("/flow");
    },
    toProcess(id) {
      if (id) this.$router.push(`/antvx6/${id}`);
    }
  }
};
</script>

<style lang="less">
@import "index";
</style>
