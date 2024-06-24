<template>
	<view class="con">
		<tabbar3 :state="state" @scanentry="scanentry"></tabbar3>
		<navhead1></navhead1>
		<view class="main">
			<view class="banel-box">
				<image src="../../static/bg-img.png" mode="" class="bg-img"></image>
				<view class="banel">
					<view class="output">
						<view class="output-left">
							<p class="pay">{{monthout}}</p>
							<p class="benyue">本月支出</p>
						</view>
						<view class="output-right" @click="chosemonth">
							<p>{{year}}年{{month<10?'0'+month:month}}月</p>
							<image src='../../static/select.png' @click="tosetting"></image>
						</view>
					</view>
					<view class="income-box">
						<view class="income">
							<p class="count">{{monthincome}}</p>
							<p>收入</p>
						</view>
						<view class="line"></view>
						<view class="balance">
							<p class="count">{{balance}}</p>
							<p>结余</p>
						</view>
					</view>
					<view class="remainder">
						<p>剩余预算</p>
						<process :col="cols" :width="width" :value="processval"></process>
					</view>
				</view>
			</view>
			<view class="consumption-information">
				<p class="title">消费消息录入</p>
				<view class="option-box">
					<view class="manual-entry" @tap="goManual_entry3()">
						<image src="../../static/me.png"></image>
						<p class="entry-title">手动录入</p>
						<p class="samll-p">手动录入消费信息</p>
					</view>
					<view class="scan-entry" @click="scanentry">
						<image src="../../static/se.png"></image>
						<p class="entry-title">扫描录入</p>
						<p class="samll-p">扫码录入消费信息</p>
					</view>
				</view>
			</view>
			<view class="today-info">
				<view class="today-info-head">
					<view class="today-info-head-left">
						<p class="today">今天</p>
						<p class="date">{{today}}</p>
					</view>
					<view class="today-info-head-right">
						<view class="shou">
							<p>收</p>
							<p class="shou-count">{{insum}}</p>
						</view>
						<view class="zhi">
							<p>支</p>
							<p class="zhi-count">{{outsum}}</p>
						</view>
					</view>
				</view>
				<view class="nodata" v-if="havedata==0">
					<image src="../../static/nodata.png" mode=""></image>
				</view>
				<view class="info-items" v-for="(item,index) in todaydatalist" :key="item.billsId" @click="todetails(item.billsId,item.count,item.imgurl,item.income,item.merchants,item.method,item.note,item.timestamp,item.type,item.productList,item.picture)">
					<view class="items">
						<view class="items-left">
							<image :src="item.imgurl" mode=""></image>
							<p class="name">{{item.type}}</p>
						</view>
						<view class="items-right">
							<view class="items-count"
								:style="{color:item.income ==true?'rgba(59,206,177,1)':'rgba(237,87,88,1)'}">
								<view v-if="item.income == true">+</view>
								<view v-if="item.income == false">-</view>
								<view>
									{{item.count}}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 浅灰色背景遮罩 -->
		<view class="model-box" :style="{'top':top+'rpx'}">

		</view>
		<!-- 月份选择器 -->
		<view class="chose" :style="{'bottom':bottom+'rpx'}">
			<view class="model-head">
				<p>选择日期</p>
				<image src="../../static/close.png" mode="" @click="close"></image>
			</view>
			<p class="head-time">{{year}}/{{month<10?'0'+month:month}}</p>
			<view class="this-month">
				<p>本月</p>
			</view>
			<view class="time">
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="sure" @click="sure(top,bottom)">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import tabbar3 from '../../components/tabbar3/tabbar3.vue'
	import navhead1 from '../../components/navhead1/navhead1.vue'
	import process from '../../components/process/process.vue'
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 2000; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			return {
				state: '1',
				top: 2000,
				bottom: -750,
				years,
				year,
				months,
				havedata: 0,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				cols: '#3BCEB1',
				width: 100,
				processval: 10,
				balance: 0,
				monthout: 0,
				monthincome: 0,
				today: '',
				bugetcount: 0,
				expenses: 0,
				outsum: 0,
				insum: 0,
				todaydatalist: [],
				budgetId: '',
				date: '',
			}
		},
		beforeCreate() {
			uni.hideTabBar()
		},
		components: {
			navhead1,
			tabbar3,
			process
		},
		onShow() {
			this.getdate()
			// 获取进度条所需传的时间
			this.get_date()
			// 获取进度条相关信息
			this.getuserbid()
			this.getUserQuickStat()
			this.gettodaydata()


		},
		methods: {
			// 获取日期:2023-02-02
			get_date() {
				this.date = this.year + '-' + this.month + '-' + '01'
				console.log(this.date)
			},
			// 1.获取用户的预算信息和账单id用来计算进度条
			// 获取用户的预算信息，账单id，进度条百分比
			async getuserbid() {
				console.log(11)
				await this.request({
					url: '/xlzb/getUserBudget',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": this.date
					}
				}).then(res => {
					if (res.code === "200") {
						console.log(res.data)
						this.budgetId = res.data.budgetId
						console.log("-----", res.data.budgetId)
						this.monthbudget = res.data.budgetCount
						// this.getmonthbudget(this.monthbudget )
						this.monthout = res.data.expenses
						// this.getmonthout(this.monthout)
						console.log("next")
						// this.getpercent()
						// 获取进度条比例
						this.processval = res.data.process.slice(0, -1)
						console.log(this.processval)
						this.processvalue()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 2.根据进度条的百分比计算进度条的宽度
			processvalue() {
				var w = 600 * this.processval / 100
				this.width = w
				console.log(w)
			},
      // 去看消费和收入详情
      todetails(billsId, count, imgurl, income, merchants, method, note, timestamp, type, productList,picture) {
      	// 消费类型
      	if (income == false) {
      		if (merchants == null) {
      			merchants = "无"
      		}
      		if (note == '') {
      			note = '无'
      		}
      		uni.navigateTo({
      			url: `/pages/consumption-details/consumption-details?billsId=${billsId}&count=${count}&imgurl=${imgurl}&merchants=${merchants}&method=${method}&note=${note}&timestamp=${timestamp}&type=${type}&productList=${JSON.stringify(productList)}&picture=${picture}`
      		})
      	}
      	if (income == true) {
      		if (merchants == null) {
      			merchants = "无"
      		}
          if (note == '') {
          	note = '无'
          }
      		uni.navigateTo({
      			url: `/pages/income-details/income-details?billsId=${billsId}&count=${count}&imgurl=${imgurl}&merchants=${merchants}&method=${method}&note=${note}&timestamp=${timestamp}&type=${type}`
      		})
      	}
      },
			// 获取日期:2023-02-02 星期日
			getdate() {
				let date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				month = month < 10 ? '0' + month : month
				var d = date.getDate()
				d = d < 10 ? '0' + d : d
				var week = date.getDay()
				switch (week) {
					case 0:
						week = '星期日'
						break;
					case 1:
						week = '星期一'
						break;
					case 2:
						week = '星期二'
						break;
					case 3:
						week = '星期三'
						break;
					case 4:
						week = '星期四'
						break;
					case 5:
						week = '星期五'
						break;
					case 6:
						week = '星期六'
						break;
				}
				this.week = week
				console.log("week", week)
				this.today = month + '月' + d + '日' + ' ' + week
				console.log(this.today)
			},
			async gettodaydata() {
				await this.request({
					url: '/xlzb/getBills',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId')
					}
				}).then(res => {
					if (res.code === "200") {
						this.todaydatalist = res.data
						if (this.todaydatalist.length == 0) {
							console.log("0000")
							this.havedata = 0
							console.log(this.havedata)
						} else {
							this.havedata = 1
						}
						var incount = 0
						var outcount = 0
						for (var i = 0; i < res.data.length; i++) {
							// 消费统计
							if (res.data[i].income == false) {
								console.log("消费")
								outcount = outcount + res.data[i].count
							}
							// 收入统计
							if (res.data[i].income == true) {
								incount = incount + res.data[i].count
							}
							if (res.data[i].type == '餐饮') {
								this.todaydatalist[i].imgurl = '../../static/catering.png'
							}
							if (res.data[i].type == '收入') {
								this.todaydatalist[i].imgurl = '../../static/weixin-revenue.png'
							}
							if (res.data[i].type == '娱乐') {
								this.todaydatalist[i].imgurl = '../../static/amusement.png'
							}
							if (res.data[i].type == '出行') {
								this.todaydatalist[i].imgurl = '../../static/travel.png'
							}
							if (res.data[i].type == '学习') {
								this.todaydatalist[i].imgurl = '../../static/manual-entry/02.png'
							}
							if (res.data[i].type == '其它') {
								this.todaydatalist[i].imgurl = '../../static/manual-entry/03.png'
							}
						}
						this.insum = incount
						this.outsum = outcount

						console.log(this.todaydatalist)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取用户的某个月的收入和支出
			async getUserQuickStat() {
				await this.request({
					url: '/xlzb/getUserQuickStat',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": this.year + '-' + this.month + '-' + '01'
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("----", res)
						// 这个月的支出
						this.monthout = res.data.expenses
						// this.getmonthout(this.monthout)
						// 这个月的收入
						this.monthincome = res.data.income
						// this.getmonthincome(this.monthincome)
						// 这个月的结余
						this.balance = this.monthincome - this.monthout
						// this.getmonnthbalance(this.balance)
						if (this.balance < 0) {
							this.balance = 0
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getweather() {
				uni.getLocation({
					type: "wgs84",
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.request({
							url: `http://139.9.197.13:8080/xlzb/weather/` + res.longitude + "," + res
								.latitude,
							method: 'GET',
							success: (res) => {
								if (res.data.code !== "200") {
									console.log(JSON.stringify(res.data));
								} else {
									console.log("成功")
									console.log(res.data.data)
								}
							},
						});
					},
					complete: (res) => {
						if (res.errCode === 2 && res.code === 2) {
							uni.showToast({
								icon: 'error',
								title: "缺少定位权限"
							})
						}
					}
				});
			},
			goManual_entry3() {
				uni.navigateTo({
					url: '/pages/manual-entry3/manual-entry3'
				})
			},
			// 扫描录入信息
			scanentry() {
				console.log("扫描录入")
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(chooseImageRes.tempFilePaths[0])
						uni.showLoading({
							mask: true,
							title: '上传中...'
						})
						uni.uploadFile({
							url: `http://139.9.197.13:8080/xlzb/autoOcr/${uni.getStorageSync('userId')}`,
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								console.log("res", res)
								console.log()
								console.log(JSON.parse(res.data))
								res = JSON.parse(res.data)
								if (res.code == "200") {
									uni.hideLoading()
									// 前往确认信息是否正确
									uni.navigateTo({
										url: `/pages/confirmbilling3/confirmbilling3?income=${res.data.income}&count=${res.data.count}&timestamp=${res.data.timestamp}&picture=${res.data.picture}&productList=${JSON.stringify(res.data.productList)}&merchants=${res.data.merchants}`
									})
								}
							}
						});
					}
				})
			},
			goConsumptionDetail() {
				// console.log(11)
				uni.navigateTo({
					url: '/pages/consumption-details/consumption-details'
				})
			},
			goRevenueDetail() {
				uni.navigateTo({
					url: '/pages/revenue-details/revenue-details'
				})
			},
			close() {
				this.top = 2000
				this.bottom = -750
			},
			sure() {
				this.top = 2000
				this.bottom = -750
			},
			chosemonth() {
				console.log(11)
				this.top = 0
				this.bottom = 0
			},
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
			},
		}
	}
</script>

<style scoped>
	.main {
		padding: 30rpx;
		background: linear-gradient(180deg, #d5f0ec, rgba(59, 206, 177, 0.01));
	}

	.banel-box {
		position: relative;
		height: 480rpx;
		border-radius: 20rpx;
	}

	.banel-box .bg-img {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}

	.nodata {
		display: flex;
		align-items: center;

	}

	.output {
		display: flex;
		padding: 40rpx 40rpx 10rpx 40rpx;
		font-size: 32rpx;
		font-weight: 700;
		justify-content: space-between;
	}

	.output-right {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		font-size: 35rpx;
		z-index: 99;
	}

	.output-right>p {
		font-weight: 600;
	}

	.output-right image {
		width: 16rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}

	.pay {
		font-size: 70rpx;
		font-weight: 700;
	}

	.income-box {
		font-size: 28rpx;
		font-weight: 600;
		display: flex;
		padding: 20rpx 40rpx;
		border-bottom: 2rpx solid rgba(10, 171, 139, 0.2);
		justify-content: space-between;
		align-items: center;
	}

	.line {
		width: 4rpx;
		height: 50rpx;
		background-color: rgba(59, 206, 177, 0.9);
	}

	.balance {
		margin-right: 30rpx;
	}

	.count {
		font-size: 41rpx;
		font-weight: 700;
	}




	.process {
		width: 100%;
		height: 20rpx;
		border-radius: 20rpx;

		background-color: rgba(59, 206, 177, 1);
	}

	.remainder {
		font-size: 33rpx;
		font-weight: 600;
	}



	.consumption-information {
		height: 560rpx;
		margin-top: 30rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
	}

	.option-box {
		padding: 5rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.title {
		padding: 30rpx 20rpx 0 30rpx;
		font-size: 36rpx;
		color: rgba(51, 51, 51, 1);
		font-family: "Alibaba_Extra_bold";
	}

	.entry-title {
		font-size: 55rpx;
		font-weight: 700;
		position: absolute;
		left: 50rpx;
		top: 50rpx;
	}

	.manual-entry,
	.scan-entry {
		position: relative;
		color: rgba(51, 51, 51, 1);
		margin-top: 10rpx;
	}

	.manual-entry image {
		width: 650rpx;
		height: 200rpx;
	}

	.scan-entry image {
		width: 670rpx;
		height: 325rpx;
	}

	.samll-p {
		position: absolute;
		left: 50rpx;
		top: 135rpx;
		font-weight: 600;
		color: rgba(153, 153, 153, 1);
		font-size: 30rpx;
		
	}

	.today-info {
		margin-top: 25rpx;
		margin-bottom: 120rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(0, 0, 0, 0.02);
	}

	.today-info-head {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.today-info-head-left {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.today-info-head-right {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600;
	}

	.shou {
		display: flex;
		margin-top: 10rpx;
		margin-right: 20rpx;
		color: rgba(153, 153, 153, 1);
	}

	.zhi {
		display: flex;
		color: rgba(153, 153, 153, 1);
		margin-right: 15rpx;
		margin-top: 10rpx;
	}

	.shou-count,
	.zhi-count {
		color: rgba(51, 51, 51, 1);
		margin-left: 10rpx;
	}

	.today {
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		margin-left: 15rpx;
		margin-top: 10rpx;
		font-size: 40rpx;
		margin-right: 10rpx;
	}

	.date {
		font-size: 30rpx;
		font-weight: 600;
		margin-top: 15rpx;
		color: rgba(153, 153, 153, 1);
	}

	.items-count {
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 44rpx;
		font-weight: 600;
	}

	.items {
		padding: 15rpx 35rpx 20rpx 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.items image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.items-left {
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		font-size: 40rpx;
		display: flex;
		align-items: center;
	}

	.items-left .time {
		font-size: 24rpx;
		color: rgba(153, 153, 153, 1);
	}

	.items-count {
		font-size: 50rpx;
		font-weight: 600;
	}

	.out {
		color: rgba(237, 87, 88, 1);
	}

	.in {
		color: rgba(59, 206, 177, 1);
	}

	.chose {
		width: 650rpx;
		height: 500rpx;
		position: fixed;
		transition: all 0.6s;
		z-index: 99;
		padding: 30rpx 50rpx;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #fff;
	}

	.model-head {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}

	.model-head image {
		width: 61rpx;
		height: 61rpx;
	}

	.model-head p {
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		margin-left: 260rpx;
		font-size: 45rpx;
	}

	.picker-view {
		width: 500rpx;
		height: 200rpx;
		font-weight: 600;
		font-size: 34rpx;
		margin-top: 20rpx;
	}

	.item {
		color: rgba(51, 51, 51, 1);
		display: flex;
		line-height: 50rpx;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		text-align: center;
	}

	.time {
		display: flex;
		justify-content: space-around;
	}

	.head-time {
		text-align: center;
		color: rgba(153, 153, 153, 1);
		font-size: 35rpx;
		font-weight: 600;
	}

	.this-month {
		display: flex;
		font-weight: 600;
		justify-content: flex-end;
	}

	.this-month p {
		width: 121rpx;
		height: 55rpx;
		text-align: center;
		line-height: 55rpx;
		border-radius: 60rpx;
		font-size: 35rpx;
		color: rgba(59, 206, 177, 1);
		border: 2rpx solid rgba(59, 206, 177, 1);
	}

	.sure {
		margin: 40rpx auto;
		color: #fff;
		width: 618rpx;
		height: 85rpx;
		line-height: 85rpx;
		font-weight: 600;
		text-align: center;
		border-radius: 60rpx;
		background-color: rgba(59, 206, 177, 1);
	}

	.model-box {
		position: fixed;
		transition: all 0.6s;
		top: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		background-color: rgba(51, 51, 51, 1);
	}

	.remainder {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		padding: 30rpx 30rpx 0 30rpx;
	}

	.benyue {
		font-weight: 700;
	}
</style>