<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <!-- shadow="hover" -->
      <el-card>
        <div class="user">
          <img :src="userImg" />
          <div class="ueserinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆的时间:<span>2021-7-19</span></p>
          <p>上次登陆的地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card class="s-two" style="margin-top: 10px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :style="{ padding: 0 }" :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name">
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <ul class="detail">
            <li class="num-one">¥{{ item.value }}</li>
            <li class="txt">{{ item.name }}</li>
          </ul>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
           <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card class="c-two" style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../../api/data.js";
// import * as echarts from "echarts";
import Echart from "@/components/ECharts.vue"

export default {
  name: "home",
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("@/assets/images/cat.jpg"),
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买量",
      },
      echartData: {
        order: {
          xData:[],
          series:[]
        },
        user: {
          xData:[],
          series:[]
        },
        video: {
          series:[]
        }
      }
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);
        // 用户图
        // const userOption = {
        //   legend: {
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category",
        //     data: data.userData.map((item) => item.date),
        //     axisLine: {
        //       color: "#17b3a3",
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "category",
        //       axisLine: {
        //         lineStyle: {
        //         color: "#17b3a3",
        //         }
        //       },
        //     },
        //   ],
        //   color: ['#2ec7c9','#b6a2de'],
        //   series: [{
        //     name:'新增用户',
        //     data:data.userData.map((item) => item.new),
        //     type:'bar'
        //   },{
        //     name:'活跃用户',
        //     data:data.userData.map((item) => item.active),
        //     type:'bar'
        //   }
        //   ]
        // };
        this.echartData.user.xData = data.userData.map((item) => item.date)
        this.echartData.user.series = [{
            name:'新增用户',
            data:data.userData.map((item) => item.new),
            type:'bar'
          },{
            name:'活跃用户',
            data:data.userData.map((item) => item.active),
            type:'bar'
          }
        ]
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)
        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item"
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#0462e5",
        //     "#a6a6a7",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf"
        //   ],
        //   series:[
        //     {
        //       data: data.videoData,
        //       type: 'pie'
        //     }
        //   ]
        // }
        // const V = echarts.init(this.$refs.videoEcharts);
        // V.setOption(videoOption)
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
      }
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    img {
      width: 125px;
      height: 125px;
      border-radius: 50%;
    }
    .ueserinfo {
      margin-left: 20px;
      .name {
        margin: 0;
        font-size: 24px;
      }
      .access {
        font-size: 12px;
        margin: 0;
        color: rgb(148, 148, 148);
      }
    }
  }
  .login-info {
    margin-top: 20px;
    padding-top: 12px;
    border-top: 1px solid rgb(148, 148, 148);
    p {
      margin: 0;
      font-size: 12px;
      padding-top: 8px;
      color: rgb(148, 148, 148);
    }
    span {
      padding-left: 35px;
      color: rgb(32, 32, 32);
    }
  }
}

.num {
  // margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  /deep/.el-card__body {
    padding: 0;
  }
  .el-card {
    display: flex;
    min-width: 327px;
    margin: 0 20px 10px 0;
    .icon {
      float: left;
      width: 60px;
      color: #fff;
      text-align: center;
      line-height: 60px;
    }
    .detail {
      margin: 0;
      padding: 0 0 0 10px;
      float: right;
      list-style-type: none;
      .num-one {
        font-size: 24px;
      }
      .txt {
        font-size: 10px;
        color: rgb(175, 175, 175);
      }
    }
  }
}
.graph {
  display: flex;
  margin-top: 10px;
  .el-card {
    padding: 5px 0 5px 0;
    width: 600px;
  }
  .c-two {
    margin-left: 10px;
  }
}
</style>