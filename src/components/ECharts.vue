<template>
  <div ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts/lib/component/grid';
// import { GridComponent } from 'echarts/components';
// echarts.use([GridComponent]);

export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series:[],
        };
      },
    },
  },
  watch: {
      chartData: {
          handler (val) {
              if (val && val.series.length > 0) {
                this.initChart()
              }
             
          },
          deep: true
      }
  },
  methods: {
      initChart () {
          this.initChartData()
          if (this.echart) {
              this.echart.setOption(this.options)
          }else {
              this.echart = echarts.init(this.$refs.echarts)
              this.echart.setOption(this.options)
          }
      },
      initChartData () {
          if(this.isAxisChart) {
              this.axisOption.xAxis.data = this.chartData.xData
              this.axisOption.series = this.chartData.series
          }else {
              this.normalOption.series = this.chartData.series
          }
      }
  },
  data() {
    return {
      axisOption: {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
        //   data: data.userData.map((item) => item.date),
          data: [],
          axisLine: {
            color: "#17b3a3",
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
        //   {
        //     name: "新增用户",
        //     data: data.userData.map((item) => item.new),
        //     type: "bar",
        //   },
        //   {
        //     name: "活跃用户",
        //     data: data.userData.map((item) => item.active),
        //     type: "bar",
        //   },
        ],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#0462e5",
          "#a6a6a7",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
        //   {
        //     data: data.videoData,
        //     type: "pie",
        //   },
        ],
      },
      echart: null
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
  },
};
</script>