<template>
	<view class="con">
		<!-- <mynav :text="text"></mynav> -->
		<view class="nav-head">
			收支明细
		</view>
		<view class="nav">
			<view class="chosekind" @click="changekind">
				<view class="bg">
				</view>
				<p>{{typetext}}</p>
				<view class="line">
				</view>
				<image src="../../static/more.png" mode=""></image>
			</view>
			<view class="nav-bot">
				<view class="nav-bot-left" @click="chosemonth">
					<p>{{year}}年{{month<10?'0'+month:month}}月</p>
					<image src="../../static/sectle2.png" mode=""></image>
				</view>
				<view class="nav-bot-right">
					<view class="total-out">
						<p>总支出</p>
						<p>￥{{outtotal}}</p>
					</view>
					<view class="total-in">
						<p>总收入</p>
						<p>￥{{incometotal}}</p>
					</view>
				</view>
			</view>
		</view>
		<chosekind :ttt="top2" :bott="bottom6" @onclose2="onclose2" @onsure2="onsure2"></chosekind>
		<view class="contaniner">
			<!-- <view v-show="current === 0">
        <view class="choise-time">
          <image src="../../static/left.png" mode="" class="left" @click="monthdown"></image>
          <view class="timer" @click="chosemonth">
            <view class="timer-head">
              <p>{{year}}年{{month<10?'0'+month:month}}月</p>
              <image src="../../static/jiaobiao.png" mode=""></image>
            </view>
            <view class="time">
              01/01-01/31
            </view>
          </view>
          <image src="../../static/right.png" mode="" class="right" @click="monthup"></image>
        </view>
      </view> -->
			<!-- <view v-show="current === 1">
        <view class="choise-time">
          <image src="../../static/left.png" mode="" class="left" @click="yeardown"></image>
          <view class="timer" @click="choseyear">
            <view class="timer-head">
              <p>{{year2}}年</p>
              <image src="../../static/jiaobiao.png" mode=""></image>
            </view>
            <view class="time">
              01/01-01/31
            </view>
          </view>
          <image src="../../static/right.png" mode="" class="right" @click="yearup"></image>
        </view>
      </view> -->
			<!-- <view v-show="current === 2">
        <view class="choise-time">
          <view class="timer" @click="customizationchose">
            <view class="timer-head">
              <p>{{year3}}-{{month2<10?'0'+month2:month2}}-{{day<10?'0'+day:day}} ~ {{year4}}-{{month3<10?'0'+month3:month3}}-{{day2<10?'0'+day2:day2}}</p>
              <view class="begin">
                {{year3}}-{{month2<10?'0'+month2:month2}}-{{day<10?'0'+day:day}}
              </view>
              <p style="margin: 0 20rpx;">~</p>
              <view class="end">
                <p v-if="isright===0">结束时间</p>
                <p v-if="isright===1">{{year4}}-{{month3<10?'0'+month3:month3}}-{{day2<10?'0'+day2:day2}}</p>
              </view>
              <image src="../../static/jiaobiao.png" mode=""></image>
            </view>
          </view>
        </view>
      </view> -->
			<view class="changetab">
				<view class="changetab-head">
					<image :src="changetaburl" mode="" class="changetab-bg"></image>
					<view class="changetab-items">
						<view class="changetab-item" @click="change2" :style="{'color':col1}">
							<p>总支出</p>
							<view class="count" v-if="flag === 0">
								{{outtotal}}
							</view>
						</view>
						<view class="changetab-item" @click="change3" :style="{'color':col2}">
							<p>总收入</p>
							<view class="count" v-if="flag === 1">
								{{incometotal}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-show="flag === 0">
				<view class="income-box">
					<view class="income" v-for="(item,index) in outtotallist" :key="item.date">
						<view class="income-items">
							<view class="income-items-head">
								<view class="items-head-left">
									<p class="date">{{item.date}}</p>
								</view>
								<view class="items-head-right">
									<view class="lebal">
										出
									</view>
									<p class="income-total">{{item.total}}</p>
								</view>
							</view>
							<!-- 支出项 -->
							<view class="items" v-for="(item2,index2) in outtotallist[index].list" :key="index2"
								@click="todetails2(item2)">
								<view class="items-left">

									<image :src="getIcon(item2.type,index,index2)" mode=""></image>
									<view>
										<p class="name">{{item2.type}}</p>
										<!-- <p class="time">12:00:15</p> -->
									</view>
								</view>
								<view class="items-right">
									<p class="items-count out">-{{item2.count}}￥</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nodata" v-if="havedata==0&&flag===0">
				<image src="../../static/nodata.png" mode=""></image>
			</view>
			<view class="nodata" v-if="havedata1==0&&flag===1">
				<image src="../../static/nodata.png" mode=""></image>
			</view>
			<view v-show="flag === 1">
				<view class="income-box">
					<view class="income" v-for="(item,index) in intotallist" :key="item.date">
						<view class="income-items">
							<view class="income-items-head">
								<view class="items-head-left">
									<p class="date">{{item.date}}</p>
								</view>
								<view class="items-head-right">
									<view class="lebal">
										入
									</view>
									<p class="income-total">{{item.total}}</p>
								</view>
							</view>
							<!-- 收入项 -->
							<view class="items" v-for="(item2,index2) in intotallist[index].list" :key="index2"
								@click="todetails2(item2)">
								<view class="items-left">
									<image src="../../static/weixin-revenue.png" mode=""></image>
									<view>
										<p class="name">收入</p>
										<!-- <p class="time">12:00:15</p> -->
									</view>
								</view>
								<view class="items-right">
									<p class="items-count in">+{{item2.count}}￥</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbar :state="state"></tabbar>
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
		<!-- 年份选择器 -->
		<!-- <view class="chose" :style="{'bottom':bottom2+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close2"></image>
      </view>
      <p class="head-time">{{year2}}</p>
      <view class="this-month">
        <p>本年</p>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange2" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure2">
        确定
      </view>
    </view> -->
		<!-- 自定义选择器 -->
		<!-- <view class="chose" :style="{'bottom':bottom3+'rpx'}">
      <view class="model-head">
        <p>选择日期</p>
        <image src="../../static/close.png" mode="" @click="close3"></image>
      </view>
      <view class="chose-box">
        <view class="time-left" @click="choseleft">
          {{year3}}/{{month2<10?'0'+month2:month2}}/{{day<10?'0'+day:day}}
        </view>
        <p>至</p>
        <view class="time-right" @click="choseright">
          <p v-if="isright===0">结束时间</p>
          <p v-if="isright===1">{{year4}}/{{month3<10?'0'+month3:month3}}/{{day2<10?'0'+day2:day2}}</p>
        </view>
      </view>
      <view class="sure" @click="sure3">
        确定
      </view>
    </view> -->
		<!-- 左边日期选择器 -->
		<!-- <view class="chose" :style="{'bottom':bottom4+'rpx'}">
      <view class="model-head">
        <p :style="{'margin-left':218+'rpx'}">选择起始日期</p>
        <image src="../../static/close.png" mode="" @click="close4"></image>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange3" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure4">
        确定
      </view>
    </view> -->
		<!-- 右边日期选择器 -->
		<!-- <view class="chose" :style="{'bottom':bottom5+'rpx'}">
      <view class="model-head">
        <p :style="{'margin-left':218+'rpx'}">选择结束日期</p>
        <image src="../../static/close.png" mode="" @click="close5"></image>
      </view>
      <view class="time">
        <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange4" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
          </picker-view-column>
        </picker-view>
      </view>
      <view class="sure" @click="sure5">
        确定
      </view>
    </view> -->
	</view>
</template>

<script>
	import chosekind from '../../components/chosekind/chosekind.vue'
	import tabbar from '../../components/tabbar/tabbar.vue'
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const year2 = date.getFullYear()
			const year3 = date.getFullYear()
			const year4 = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const month2 = date.getMonth() + 1
			const month3 = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			const day2 = date.getDate()
			for (let i = 2000; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			// for (let i = 1; i <= 31; i++) {
			//   days.push(i)
			// }
			return {
				state: '2',
				move: 0,
				flag: 0,
				incometotal: 0,
				outtotal: 0,
				isright: 0,
				col1: 'rgba(237, 87, 88, 1)',
				col2: 'black',
				current: 0,
				last: 1,
				move2: 0,
				text: '',
				isincome: false,
				typetext: '全部类型',
				top: 2000,
				outtotallist: [],
				intotallist: [],
				top2: 2000,
				bottom: -750,
				bottom2: -750,
				bottom3: -750,
				bottom4: -750,
				bottom5: -750,
				bottom6: -770,
				current2: 0,
				havedata: 0,
				havedata1: 0,
				years,
				year,
				year2,
				year3,
				year4,
				months,
				month,
				month2,
				month3,
				days,
				day,
				day2,
				value: [9999, month - 1, day - 1],
				changetaburl: '../../static/tableft.png',
				headitem: [{
						id: '001',
						title: '月'
					},
					{
						id: '002',
						title: '年'
					},
					{
						id: '003',
						title: '自定义'
					}
				],
			}
		},
		components: {
			tabbar,
			chosekind
		},
		beforeCreate() {
			uni.hideTabBar()
		},
		onShow() {
			this.getDaysInYearMonth(this.year, this.month)
			this.getmonoutdetails()
			this.getmonindetails()
		},
		methods: {
			// 去看消费和收入详情
			todetails2(item2) {
        console.log(item2)
				console.log(11)
				console.log(item2.billsId)
				console.log(item2.count)
				console.log(item2.imgurl)
				console.log(item2.income)
				console.log(item2.merchants) //没有
				console.log(item2.method)
				console.log(item2.note) //没有
				console.log(item2.timestamp)
				console.log(item2.type)
				console.log(item2.productList)
				// 消费类型
				if (item2.income == false) {
					if (item2.merchants == null) {
						item2.merchants = "无"
					}
					if (item2.note == null) {
						item2.note = '无'
					}
					uni.navigateTo({
						url: `/pages/consumption-details/consumption-details?billsId=${item2.billsId}&count=${item2.count}&imgurl=${item2.imgurl}&merchants=${item2.merchants}&method=${item2.method}&note=${item2.note}&timestamp=${item2.timestamp}&type=${item2.type}&productList=${JSON.stringify(item2.productList)}&picture=${item2.picture}`
					})
				}
				if (item2.income == true) {
					if (item2.merchants == null) {
						item2.merchants = "无"
					}
					if (item2.note == null) {
						item2.note = '无'
					}
					uni.navigateTo({
						url: `/pages/income-details/income-details?billsId=${item2.billsId}&count=${item2.count}&imgurl=${item2.imgurl}&merchants=${item2.merchants}&method=${item2.method}&note=${item2.note}&timestamp=${item2.timestamp}&type=${item2.type}&picture=${item2.picture}`
					})
				}
			},
			getIcon(type, index, index2) {
				switch (type) {
					case "餐饮":
						this.outtotallist[index].list[index2].imgurl = "../../static/catering.png";
						return "../../static/catering.png";
					case "收入":
						this.outtotallist[index].list[index2].imgurl = "../../static/weixin-revenue.png";
						return "../../static/weixin-revenue.png";
					case "娱乐":
						this.outtotallist[index].list[index2].imgurl = "../../static/amusement.png";
						return "../../static/amusement.png";
					case "出行":
						this.outtotallist[index].list[index2].imgurl = "../../static/travel.png";
						return "../../static/travel.png";
					case "学习":
						this.outtotallist[index].list[index2].imgurl = "../../static/study.png";
						return "../../static/study.png";
					case "其它":
						this.outtotallist[index].list[index2].imgurl = "../../static/others.png";
						return "../../static/others.png";
				}
			},
			// 获取全部类型前月份消费情况
			async getmonoutdetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.year + '-' + this.month + '-' + '01'],
						"isIncome": false
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("获取全部类型月份消费情况", res)
						this.outtotallist = res.data
						let outnum = 0
						for (var i = 0; i < res.data.length; i++) {
							outnum = outnum + res.data[i].expenses_total
						}
						this.outtotal = outnum.toFixed(2)
						if (this.outtotallist.length == 0) {
							this.havedata = 0
						} else {
							this.havedata = 1
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取全部类型当前月份收入情况
			async getmonindetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.year + '-' + this.month + '-' + '01'],
						"isIncome": true
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("获取全部类型当前月份收入情况", res)
						this.intotallist = res.data
						let intnum = 0
						for (var i = 0; i < res.data.length; i++) {
							intnum = intnum + res.data[i].income_total
						}
						this.incometotal = intnum.toFixed(2)
						if (this.intotallist.length == 0) {
							this.havedata1 = 0
						} else {
							this.havedata1 = 1
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取各种类型前月份消费情况
			async gettypemonoutdetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.year + '-' + this.month + '-' + '01'],
						"isIncome": false,
						"type": this.typetext
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("获取各种类型前月份消费情况", res)
						this.outtotallist = res.data
						let outnum = 0
						for (var i = 0; i < res.data.length; i++) {
							outnum = outnum + res.data[i].expenses_total
						}
						this.outtotal = outnum.toFixed(2)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取各种类型当前月份收入情况
			async gettypemonindetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.year + '-' + this.month + '-' + '01'],
						"isIncome": true,
						"type": this.typetext
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("----", res)
						this.intotallist = res.data
						let intnum = 0
						for (var i = 0; i < res.data.length; i++) {
							intnum = intnum + res.data[i].income_total
						}
						this.incometotal = intnum.toFixed(2)
					}
				}).catch(err => {
					console.log(err)
				})
			},



			// 获取该年该月的天数
			getDaysInYearMonth(year, month) {
				this.days = [],
					month = parseInt(month, 10);
				// javascript中Date()对象的getDate()是获取时间对象对应于一个月中的某一天（1~31），当设置为0的时候，getDate()返回的就是最后一天，刚好对应我们需要的值。
				var date = new Date(year, month, 0);
				console.log(date.getDate())
				for (var i = 1; i <= date.getDate(); i++) {
					this.days.push(i)
				}
			},
			changekind() {
				this.top2 = 0
				this.bottom6 = 0
			},
			change(index) {
				this.move = index,
					this.current = index
			},
			close() {
				this.top = 2000
				this.bottom = -750
			},
			close2() {
				this.top = 2000
				this.bottom2 = -750
			},
			close3() {
				this.top = 2000
				this.bottom3 = -750
			},
			close4() {
				this.bottom4 = -750
			},
			close5() {
				this.bottom5 = -750
			},
			change2() {
				this.flag = 0
				this.isincome = false
				this.changetaburl = '../../static/tableft.png'
				this.col1 = 'rgba(237, 87, 88, 1)'
				this.col2 = 'black'
			},
			change3() {
				this.flag = 1
				this.isincome = true
				this.changetaburl = '../../static/tabright.png'
				this.col2 = 'rgba(59, 206, 177, 1)'
				this.col1 = 'black'
			},
			chosemonth() {
				this.top = 0
				this.bottom = 0
			},
			customizationchose() {
				this.top = 0
				this.bottom3 = 0
			},
			sure() {
				this.top = 2000
				this.bottom = -750
				this.getmonindetails()
				this.getmonoutdetails()
			},
			sure2() {
				this.top = 2000
				this.bottom2 = -750
			},
			sure3() {
				this.top = 2000
				this.bottom3 = -750
			},
			sure4() {
				this.bottom4 = -750
			},
			sure5() {
				this.bottom5 = -750
			},
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
			},
			choseleft() {
				this.bottom4 = 0
			},
			onclose2(t2, b2, text) {
				this.top2 = t2
				this.bottom6 = b2
			},
			onsure2(t2, b2, text) {
				this.top2 = t2
				this.bottom6 = b2
				this.typetext = text
				if (this.typetext == '全部类型') {
					this.getmonindetails()
					this.getmonoutdetails()
				} else {
					this.gettypemonoutdetails()
					this.gettypemonindetails()
				}
			},
			choseright() {
				this.bottom5 = 0
			},
			choseyear() {
				this.top = 0
				this.bottom2 = 0
			},
			bindChange2: function(e) {
				const val = e.detail.value
				this.year2 = this.years[val[0]]
			},
			bindChange3: function(e) {
				const val = e.detail.value
				this.year3 = this.years[val[0]]
				this.month2 = this.months[val[1]]
				this.day = this.days[val[2]]
				this.getDaysInYearMonth(this.year3, this.month2)
			},
			bindChange4: function(e) {
				const val = e.detail.value
				this.year4 = this.years[val[0]]
				this.month3 = this.months[val[1]]
				this.day2 = this.days[val[2]]
				this.isright = 1
				this.getDaysInYearMonth(this.year4, this.month3)
			},
			// 上一年
			yeardown() {
				this.year2 = this.year2 - 1
				if (this.year2 <= 2000) {
					this.year2 = 2000
				}
			},
			// 下一年
			yearup() {
				var date = new Date()
				var yy = date.getFullYear()
				this.year2 = this.year2 + 1
				if (this.year2 >= yy) {
					this.year2 = yy
				}
			},
			// 上一月
			monthdown() {
				this.month = this.month - 1
				if (this.month <= 0) {
					this.year--
					this.month = 12
					if (this.year <= 2000) {
						this.year = 2000
					}
				}
			},
			// 下一月
			monthup() {
				var date = new Date()
				var month = date.getMonth() + 1
				var year = date.getFullYear()
				this.month = this.month + 1
				if (this.month > 12) {
					this.year++
					this.month = 1
					if (this.year >= year) {
						this.year = year
					}
				}
				if (this.month >= month && this.year >= year) {
					this.month = month
					this.year = year
				}
			}
		}
	}
</script>

<style scoped>
	.nav-head {
	  width: 100%;
	  text-align: center;
	  color: #fff;
	  line-height: 180rpx;
	  height: 130rpx;
	  background-color: #3BCEB1;
	  font-weight: 600;
	
	}
	.con {
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		last: 1;
		width: 100%;
		height: 100%;
    padding-bottom: 100rpx;
		/* background-color: skyblue; */
	}

	.head {
		width: 500rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
	}

	.head-item {
		color: rgba(153, 153, 153, 1);
		font-weight: 600;
		padding: 0 5rpx 10rpx 5rpx;
	}

	.move {
		font-size: 34rpx;
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		border-bottom: 6rpx solid rgba(59, 206, 177, 1);
	}

	.choise-time {
		width: 650rpx;
		margin: 40rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.choise-time .left {
		width: 40rpx;
		height: 40rpx;
	}

	.choise-time .right {
		width: 40rpx;
		height: 40rpx;
	}

	.timer {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.timer-head {
		display: flex;
		color: rgba(0, 0, 0, 1);
		align-items: center;
	}

	.timer-head image {
		width: 16rpx;
		margin-left: 10rpx;
		height: 14rpx;
	}

	.time {
		font-size: 24rpx;
		color: rgba(153, 153, 153, 1);
	}

	.changetab {
		padding: 40rpx 30rpx 0 30rpx;
	}

	.changetab-head {
		position: relative;
		width: 690rpx;
		height: 129rpx;
		display: flex;
		justify-content: space-around;
	}

	.changetab-bg {
		position: absolute;
		width: 690rpx;
		height: 129rpx;
	}

	.changetab-items {
		width: 690rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 2;
	}

	.changetab-item {
		padding: 40rpx 100rpx;
	}

	.col1 {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(237, 87, 88, 1);
	}

	.col2 {
		font-weight: 600;
		font-size: 32rpx;
		color: rgba(59, 206, 177, 1);
	}

	/* .income-box {
		padding-bottom: 100rpx;
	} */

	.income {
		width: 630rpx;
		margin: 0 auto;
		padding: 0 30rpx;
		border-radius: 30rpx;
		background-color: #fff;
	}

	.nodata {
		width: 630rpx;
		margin: 0 auto;
		padding: 0 30rpx;
		border-radius: 0 0 30rpx 30rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.income-items {
		background-color: #fff;
		border-bottom: 2rpx dashed #ccc;
	}

	.income:first-child {
		border-radius: 0 0 30rpx 30rpx;
	}

	.income:last-child {
		/* padding-bottom: 85rpx; */
	}

	.income-items-head {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.items-head-left {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
	}

	.items-head-left .date {
		color: rgba(0, 0, 0, 1);
		margin-right: 10rpx;
	}

	.items-head-right {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.items-head-right .lebal {
		text-align: center;
		line-height: 36rpx;
		margin-right: 10rpx;
		width: 36rpx;
		height: 36rpx;
		color: rgba(153, 153, 153, 1);
		background-color: #f5f6f7;
	}

	.items {
		padding-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.items image {
		width: 77rpx;
		height: 77rpx;
		margin-right: 20rpx;
	}

	.items-left {
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.items-left .time {
		font-size: 24rpx;
		color: rgba(153, 153, 153, 1);
	}

	.items-count {
		font-size: 44rpx;
		font-weight: 600;
	}

	.count {
		text-align: center;
	}

	.out {
		color: rgba(237, 87, 88, 1);
	}

	.in {
		color: rgba(59, 206, 177, 1);
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

	.chose {
		width: 650rpx;
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
		font-size: 36rpx;
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
		text-align: center;
	}

	.time {
		display: flex;
		justify-content: space-around;
	}

	.head-time {
		text-align: center;
		color: rgba(153, 153, 153, 1);
		font-size: 26rpx;
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
		font-size: 26rpx;
		color: rgba(59, 206, 177, 1);
		border: 2rpx solid rgba(59, 206, 177, 1);
	}

	.sure {
		margin: 40rpx auto;
		color: #fff;
		width: 618rpx;
		height: 85rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 60rpx;
		background-color: rgba(59, 206, 177, 1);
	}

	.chose-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.time-left {
		border: 2rpx solid #3BCEB1;
		border-radius: 60rpx;
		color: #3BCEB1;
		width: 213rpx;
		height: 60rpx;
		margin: 20rpx 0;
		line-height: 60rpx;
		text-align: center;
		font-size: 26rpx;
	}

	.time-right {
		border: 2rpx solid rgba(153, 153, 153, 1);
		border-radius: 60rpx;
		color: rgba(153, 153, 153, 1);
		width: 213rpx;
		height: 60rpx;
		margin: 20rpx 0;
		line-height: 60rpx;
		text-align: center;
		font-size: 26rpx;
	}


	.nav .chosekind image {
		width: 34rpx;
		height: 34rpx;
	}

	.nav {
		padding: 30rpx;
		background-color: #3BCEB1;
	}

	.nav .chosekind {
		width: 259rpx;
		position: relative;
		color: #fff;
		font-size: 26rpx;
		font-weight: 600 ;
		display: flex;
		background-color: none;
		justify-content: space-around;
		align-items: center;
	}

	.nav .bg {
		position: absolute;
		width: 259rpx;
		height: 68rpx;
		border-radius: 6rpx;
		background-color: #fff;
		opacity: 0.2;
	}

	.nav .line {
		width: 2rpx;
		height: 28rpx;
		opacity: 0.4;
		background-color: #fff;
	}

	.nav-bot-left {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
	}

	.nav-bot-left image {
		width: 15rpx;
		margin-left: 10rpx;
		height: 10rpx;
	}

	.total-in {
		display: flex;
		margin-left: 10rpx;
	}

	.nav-bot-right {
		color: #fff;
		display: flex;
	}

	.nav-bot {
		margin-top: 40rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	.total-out {
		display: flex;
	}
</style>