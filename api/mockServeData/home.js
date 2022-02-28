import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0;i<7;i++) {
            List.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    华为:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                videoData: [
                    {
                        name:'苹果',
                        value:299
                    },{
                        name:'小米',
                        value:999
                    },{
                        name:'华为',
                        value:1999
                    },{
                        name:'三星',
                        value:2999
                    },{
                        name:'vivo',
                        value:3999
                    },{
                        name:'oppo',
                        value:4999
                    }
                ],
                userData: [
                    {
                        date:'周一',
                        new:5,
                        active:20
                    },{
                        date:'周二',
                        new:5,
                        active:80
                    },{
                        date:'周三',
                        new:5,
                        active:100
                    },{
                        date:'周四',
                        new:5,
                        active:150
                    },{
                        date:'周五',
                        new:5,
                        active:200
                    },{
                        date:'周六',
                        new:5,
                        active:320
                    }
                ],
                orderData:{
                    date:['20191001','20191002','20191003','20191004','20191005','20191006','20191007'],
                    data:List
                },
                tableData: [
                    {
                      name: "oppo",
                      todayBuy: 100,
                      monthBuy: 300,
                      totalBuy: 800,
                    },
                    {
                      name: "vivo",
                      todayBuy: 100,
                      monthBuy: 300,
                      totalBuy: 800,
                    },
                    {
                      name: "苹果",
                      todayBuy: 100,
                      monthBuy: 300,
                      totalBuy: 800,
                    },
                    {
                      name: "三星",
                      todayBuy: 100,
                      monthBuy: 300,
                      totalBuy: 800,
                    },
                    {
                      name: "魅族",
                      todayBuy: 100,
                      monthBuy: 300,
                      totalBuy: 800,
                    },
                  ]
            }
        }
    }
}