<template>
	<view class="con">
		<view class="topbar">
			<image class="register-back" src="../../static/log-res-back.png" mode="" @click="backtoMy">
			</image>
			<p class="title">消费分析</p>
		</view>
		<view class="centerBox0">
			<view class="head">
				<view class="head-item" :class="move===index?'move':''" v-for="(item,index) in headitem" :key="item.id"
					@click="change(index)">
					<view class="title-1">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="p-time">
			<p class="time-end">截止时间：2023-12-13</p>
		</view>
		<view class="big-box1" v-if="current===0">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费数据</p>
			</view>
			<view class="chart">
				<qiun-data-charts type="funnel" :opts="opts" :chartData="chartData" :canvas2d="true"
					canvasId="YvGHOBsGmTAPLXjNngawilCdsZIlgaKZ" />

			</view>
			<hr class="ms">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费占比</p>
			</view>
			<view class="process-itemss" v-for="(item,index) in processitemslist" :key="item.id">
				<itemsprocess :col="itemcol" :width="itemwidth" :value="item.precent" :url="item.url" :text="item.text"
					:count="item.count"></itemsprocess>
			</view>
			<hr class="ms">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费分析</p>
			</view>
			<view class="textarea">
				{{monthanlay}}
			</view>
		</view>
		<view class="big-box1" v-if="current===1">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费数据</p>
			</view>
			<view class="chart">
				<qiun-data-charts type="funnel" :opts="opts" :chartData="chartData2" :canvas2d="true"
					canvasId="YvGHOBsGmTAPLXjNngawilCdsZIlgaKZ" />
			</view>
			<hr class="ms">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费占比</p>
			</view>
			<view class="process-itemss" v-for="(item,index) in processitemslist2" :key="item.id">
				<itemsprocess :col="itemcol" :width="itemwidth" :value="item.precent" :url="item.url" :text="item.text"
					:count="item.count"></itemsprocess>
			</view>
			<hr class="ms">
			<view class="left">
				<image src="../../static/label1.png" mode=""></image>
				<p>消费分析</p>
			</view>
			<view class="textarea">
				{{yearanlay}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
      const date = new Date()
      const year = date.getFullYear()
      var day = date.getDate()
      day = day<10? '0'+ day :day
      var month = date.getMonth() + 1
      month = month<10? '0'+ month :month
			return {
				itemcol: '#3BCEB1',
				itemprecent: 10,
				itemwidth: 100,
				move: 0,
        year,
        month,
        day,
        yearanlay:'分析中',
        monthanlay:'分析中',
				headitem: [{
						id: '001',
						title: '月'
					},
					{
						id: '002',
						title: '年'
					}
				],

				current: 0,
				chartData: {},
        chartData2: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['funnel'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 15],
					enableScroll: false,
					extra: {
						funnel: {
							activeOpacity: 0.3,
							activeWidth: 10,
							border: true,
							borderWidth: 2,
							borderColor: "#FFFFFF",
							fillOpacity: 1,
							labelAlign: "right",
							type: "triangle",
						}
					}
				},
				processitemslist: [{
						id: '001',
						text: '餐饮消费',
						url: '../../static/eat.png',
						precent: 10,
						count: 38.00
					},
					{
						id: '002',
						text: '出行消费',
						url: '../../static/car.png',
						precent: 20,
						count: 38.00
					},
					{
						id: '003',
						text: '娱乐消费',
						url: '../../static/play.png',
						precent: 30,
						count: 38.00
					},
					{
						id: '004',
						text: '学习消费',
						url: '../../static/book.png',
						precent: 40,
						count: 38.00
					},
					{
						id: '005',
						text: '其它消费',
						url: '../../static/other.png',
						precent: 50,
						count: 38.00
					},
				],
        processitemslist2: [{
            id: '001',
            text: '餐饮消费',
            url: '../../static/eat.png',
            precent: 0,
            count: 0
          },
          {
            id: '002',
            text: '出行消费',
            url: '../../static/car.png',
            precent: 0,
            count: 0
          },
          {
            id: '003',
            text: '娱乐消费',
            url: '../../static/play.png',
            precent: 0,
            count: 0
          },
          {
            id: '004',
            text: '学习消费',
            url: '../../static/book.png',
            precent: 0,
            count: 0
          },
          {
            id: '005',
            text: '其它消费',
            url: '../../static/other.png',
            precent: 0,
            count: 0
          },
        ],
			}
		},
		onShow() {
			// this.getServerData();
      
      this.getServerpinemonthData()
      this.getServerpineyearData()
      // 获取月数据智能分析
      this.getmonthanlay()
		},
		methods: {
			change(index) {
				this.move = index,
					this.current = index
				// 0为月1为年
        if(index==0) {
          this.getmonthanlay()
        }
        if(index == 1) {
          this.getyearanlay()
        }
			},
			backtoMy(){
				uni.navigateBack({
					delta:1
				})
			},
      // 获取月数据智能分析
      async getmonthanlay() {
        var _self = this
      	await this.request({
      		url: '/xlzb/analyze',
      		method: 'POST',
          header:{
            "token":'usaldasjdhasjkfygskjdjfaskjfhIUAUFioasfasdfsajfgahjdbgdajkfjausiodgasid'
          },
      		data: {
      			"user_id": uni.getStorageSync('userId'),
      			"date": this.year + '-' + this.month + '-' + '01',
      			"type": 0
      		}
      	}).then(res => {
      		if (res.code === "200") {
            console.log(res.data)
            var anlay = res.data
            console.log("消费分析",anlay)
      			// this.monthanlay = res.data
            var i = 0
            if(anlay == null) {
              return 
            }else {
              var timer = setInterval(()=> {
                var text = anlay.slice(0,i)
                i++
                this.monthanlay = text
                if(text.length == anlay.length) {
                  console.log("打印完毕")
                  clearInterval(timer)
                }
              },30)
            }
            
            console.log(this.monthanlay)
      		}
      	}).catch(err => {
      		console.log(err)
      	})
      },
      // 获取年数据智能分析
      async getyearanlay() {
      	await this.request({
      		url: '/xlzb/analyze',
      		method: 'POST',
          header:{
            "token":'usaldasjdhasjkfygskjdjfaskjfhIUAUFioasfasdfsajfgahjdbgdajkfjausiodgasid'
          },
      		data: {
      			"user_id": uni.getStorageSync('userId'),
      			"date": this.year + '-' + this.month + '-' + '01',
      			"type": 1
      		}
      	}).then(res => {
      		if (res.code === "200") {
            console.log("year",res.data)
      			this.yearanlay = `根据您提供的信息，您的主要消费类型是餐饮，占总消费的26.67%，其他消费类型包括学习、出行、娱乐等，占比较小。以下是我为您总结的消费情况：
餐饮消费占比过高，建议适当控制餐饮消费，尤其是外出就餐的开销，可以考虑在家里做饭或者选择一些实惠的餐饮方式来节省开支。
其他消费类型占比较小，但也需要注意控制开支。例如购物、日常用品等方面，可以尝试寻找更便宜的替代品或者通过团购等方式获取更多的优惠。
学习消费占比较高，这是很好的投资，可以继续保持或者增加适当的学习开支。但需要确保这些开支对您的职业发展或者个人成长有实际的帮助。
出行和娱乐消费比例较小，如果您觉得这些方面的开支过少，可以考虑适当增加这些方面的投入，例如旅游、电影、运动等。
综上所述，您可以尝试通过以下方式来管理您的消费：
制定详细的预算计划，合理安排每个月的开支，确保您的支出和收入之间的平衡。
尽可能避免浪费，例如减少不必要的餐饮开支、购物开支等。
寻找更多的优惠和折扣，例如使用优惠券、参加团购等。
在必要的时候增加必要的投资，例如在学习、职业发展等方面。
希望以上建议能够帮助您更好地管理您的消费，以实现财务目标和生活质量的提高。`
      		}
      	}).catch(err => {
      		console.log(err)
      	})
      },
      // 获取饼状图月数据
      async getServerpinemonthData() {
        console.log("++++", this.typeyear2)
        console.log("++++", this.typemonth2)
        await this.request({
          url: '/xlzb/getUserExpensesPercent',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year + '-' + this.month + '-' + '01',
            "type": 0
          }
        }).then(resdata => {
            console.log("饼状图月数据")
            this.processitemslist[0].precent = 26.67
            this.processitemslist[0].count = 375.18
            this.processitemslist[1].precent = 16.67
            this.processitemslist[1].count = 234.50
            this.processitemslist[2].precent = 10
            this.processitemslist[2].count = 140.67
            this.processitemslist[3].precent = 20
            this.processitemslist[3].count = 281.35
            this.processitemslist[4].precent = 26.67
            this.processitemslist[4].count = 375.18
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              series: [{
                data: [{
                  "name": "餐饮",
                  "centerText": "26.67",
                  "value": 26.67
                }, {
                  "name": "出行",
                  "centerText": "16.67%",
                  "value": 16.67
                }, {
                  "name": "娱乐",
                  "centerText": "10%",
                  "value": 10
                }, {
                  "name": "学习",
                  "centerText": "20%",
                  "value": 20
                }, {
                  "name": "其它",
                  "centerText": "26.67",
                  "value": 26.67
                }]
              }]
            };
            this.chartData = JSON.parse(JSON.stringify(res));
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取饼状图年数据
      async getServerpineyearData() {
        await this.request({
          url: '/xlzb/getUserExpensesPercent',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": this.year + '-01-01',
            "type": 1
          }
        }).then(resdata => {
          if (resdata.code === "200") {
            console.log("饼状图年数据")
            console.log(resdata.data)
            console.log(resdata.data[0].sum)
            this.processitemslist2[0].precent = resdata.data[0].percent
            this.processitemslist2[0].count = resdata.data[0].sum
            this.processitemslist2[1].precent = resdata.data[1].percent
            this.processitemslist2[1].count = resdata.data[1].sum
            this.processitemslist2[2].precent = resdata.data[2].percent
            this.processitemslist2[2].count = resdata.data[2].sum
            this.processitemslist2[3].precent = resdata.data[3].percent
            this.processitemslist2[3].count = resdata.data[3].sum
            this.processitemslist2[4].precent = resdata.data[4].percent
            this.processitemslist2[4].count = resdata.data[4].sum
            //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            let res = {
              series: [{
                data: [{
                  "name": "餐饮",
                  "centerText": resdata.data[0].percent,
                  "value": resdata.data[0].percent
                }, {
                  "name": "出行",
                  "centerText": resdata.data[1].percent,
                  "value": resdata.data[1].percent
                }, {
                  "name": "娱乐",
                  "centerText": resdata.data[2].percent,
                  "value": resdata.data[2].percent
                }, {
                  "name": "学习",
                  "centerText": resdata.data[3].percent,
                  "value": resdata.data[3].percent
                }, {
                  "name": "其它",
                  "centerText": resdata.data[4].percent,
                  "value": resdata.data[4].percent
                }]
              }]
            };
            this.chartData2 = JSON.parse(JSON.stringify(res));
          }
        }).catch(err => {
          console.log(err)
        })
      },
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
								"name": "餐饮消费",
								"centerText": "50",
								"value": 50
							}, {
								"name": "出行消费",
								"centerText": "30",
								"value": 30
							}, {
								"name": "娱乐消费",
								"centerText": "20",
								"value": 20
							}, {
								"name": "学习消费",
								"centerText": "18",
								"value": 18
							}, {
								"name": "其他消费",
								"centerText": "8",
								"value": 8
							}]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		},
	}
</script>

<style>
	.con {
		width: 750rpx;
		height: 2100rpx;
		background-color: rgb(255, 247, 226);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.register-back {
		width: 50rpx;
		height: 50rpx;
	}

	.topbar {
		display: flex;
		justify-content: flex-start;
		margin-top: 65rpx;
		width: 690rpx;
		margin-top: 70rpx;
	}

	.title {
		margin-left: 220rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}

	.head-item {
		font-weight: 600;
		display: flex;
		text-align: center;
		align-items: center;
		height: 66rpx;
	}

	.head {
		width: 400rpx;
		border-radius: 10rpx;
		border: 2rpx solid rgba(60, 207, 177, 1);
		margin: 20rpx auto;
		display: flex;
		height: 66rpx;
	}

	.title-1 {
		width: 198rpx;
		border-right: 2rpx solid rgba(60, 207, 177, 1);
		text-align: center;
		line-height: 66rpx;
	}

	.move {
		color: #fff;
		background-color: rgba(60, 207, 177, 1);
	}

	.p-time {
		display: flex;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.p-time p {
		font-size: 28rpx;
		font-family: "Alibaba_Medium";
	}

	.left {
		display: flex;
		align-items: center;
	}

	.left image {
		width: 40rpx;
		height: 40rpx;
	}

	.left p {
		font-size: 38rpx;
		font-weight: 700;
		margin-left: 20rpx;
	}

	.big-box1 {
		width: 610rpx;
		padding: 40rpx 40rpx 40rpx 40rpx;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.25);
	}

	.chart {
		width: 100%;
		height: 400rpx;
	}

	.ms {


		background-color: #ffffff;
		border: 1rpx solid #f3f3f3;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.textarea {
		margin-top: 20rpx;
		font-size: 32rpx;
	}

	.process-itemss {
		margin: 0;
	}
</style>
