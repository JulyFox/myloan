<template>
  <div>
    <!-- 展示框 -->
    <div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" v-for="(list,i) in lists" :key="i">
          <div class="grid-content bg-purple home-show" :style="{background:list.color}">
            <h1>{{list.name}}</h1>
            <count-to
              :start-val="0"
              :end-val="list.number"
              :duration="list.duration"
              class="text-style"
            ></count-to>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 图表 -->
    <div id="mycharts" style="width:100%;height:500px;"></div>
  </div>
</template>
<script>
import countTo from "vue-count-to";
import echarts from "echarts";
export default {
  data() {
    return {
      lists: [
        {
          name: "最高可借金额",
          number: 1359,
          duration: 1000,
          color: "#67ca3a"
        },
        { name: "回报率", number: 9833, duration: 1000, color: "#f60" },
        { name: "业绩跑分", number: 8888, duration: 1000, color: "#f56c6c" },
        { name: "安稳底薪战队", number: 6666, duration: 1000, color: "#409eff" }
      ],
      charts: null
    };
  },
  components: {
    countTo
  },
  methods: {
    initCharts() {
      this.charts = echarts.init(document.getElementById("mycharts"));
      let option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      this.charts.setOption(option);
    }
  },
  mounted(){
    this.initCharts();
    window.onresize = ()=>{
      this.charts.resize();
    }
  }
};
</script>
<style >
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.home-show {
  height: 200px;
  margin-bottom: 10px;
  text-align: center;
}
.home-show h1 {
  padding-top: 40px;
  padding-bottom: 30px;
  font-size: 24px;
}
.text-style {
  color: #fff;
  font-size: 26px;
}
</style>