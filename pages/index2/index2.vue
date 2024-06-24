<template>
	<view class="con">
		<tabbar2 :state="state" @scanentry="scanentry"></tabbar2>
		<view class="head">
			<view class="head-left">
				<image :src="iconUrl" mode="" class="weather"></image>
				<view class="weather-info-box">
				  <p class="address">{{address}}</p>
				  <p class="weather-info">{{weatheryear}}-{{weathermonth}}-{{weatherday}} {{weatherinfo}}</p>
				</view>
			</view>
			<view class="set">
				<image src="../../static/identities.png" mode="" @click="change1"></image>
			</view>
		</view>
		<view class="main">
			<banel :color="col" :bgimg="url" :col="cols" :selimg="selimg"></banel>
			<view class="consumption-information">
				<p class="title">消费消息录入</p>
				<view class="option-box">
					<view class="manual-entry" @tap="goManual_entry()">
						<image src="../../static/manual-entry2.png"></image>
						<p class="entry-title">手动录入</p> 
						<p class="samll-p">手动录入消费信息</p>
					</view>
					<view class="scan-entry" @click="scanentry">
						<image src="../../static/scan-entry2.png"></image>
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
							<view>
								<p class="name">{{item.type}}</p>
								<!-- <p class="time">12:00:15</p> -->
							</view>
						</view>
						<view class="items-right">
							<view class="items-count" :style="{color:item.income ==true?'rgba(59,206,177,1)':'rgba(237,87,88,1)'}">
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
				<picker-view :indicator-style="indicatorStyle" :value="processval" @change="bindChange" class="picker-view">
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
		<view class="model-box1" :style="{'top':top1+'rpx'}">
		  
		</view>
		<view class="model1" :style="{'bottom':bottom1 +'rpx'}">
		  <view class="model-head1">
		    <p>切换模式</p>
		    <image src="../../static/close.png" mode="" @click="close1"></image>
		  </view>
		  <view class="model-item" v-for="(item,index) in modelitem" :key="item.id" @click="changeitem(index)">
		    <view class="item-text">
		      <p>{{item.text}}</p>
		      <p v-show="move===index">(当前模块)</p>
		    </view>
		    <view class="choise-box" :class="move===index?'move':''">
		      <image src="../../static/true.png" mode="" v-show="move===index"></image>
		    </view>
		  </view>
		  <view class="sure1" @click="sure1">
		    确定
		  </view>
		</view>
	</view>
</template>

<script>
	import process from '../../components/process/process.vue'
	import tabbar2 from '../../components/tabbar2/tabbar2.vue'
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
				havedata:0,
				month,
				days,
				day,
				selimg: '../../static/sectle2.png',
				url: '../../static/bg2.png',
				value: [9999, month - 1, day - 1],
				col: '#fff',
				cols: '#FFAD0B',
				bottom1: -750,
				top1: 2000,
				text: '我的',
				balance:'',
        monthout:0,
        monthincome:0,
        today:'',
        bugetcount:0,
        tempFilePaths:'',
        expenses:0,
        outsum:0,
        insum:0,
        todaydatalist:[],
				current: 0,
				move: 0,
        budgetId:'',
        date:'',
        iconUrl: "../../static/weather/-100.png",
        weather: {},
        address:"Loading...",
        weatherinfo:"Loading...",
        weatheryear:"",
        weathermonth:"",
        weatherday:"",
        mode:1,
				modelitem: [{
						id: '1',
						text: '中年模式'
					},
					{
						id: '2',
						text: '青年模式'
					},
					{
						id: '3',
						text: '老年模式'
					}
				]
			}
		},
		beforeCreate() {
			uni.hideTabBar()
		},
		activated() {
			
		},
		components: {
			process,
			tabbar2
		},
		onShow() {
      this.getweatherdate()
      this.getdate()
      this.getUserQuickStat()
      this.gettodaydata()
	  if(uni.getStorageSync('address')&&uni.getStorageSync('weatherinfo')&&uni.getStorageSync('iconUrl')){
	  	this.address=uni.getStorageSync('address')
	  	this.weatherinfo=uni.getStorageSync('weatherinfo')
	  	this.iconUrl=uni.getStorageSync('iconUrl')
	  }else{this.getweather()}
      
		},
		
		methods: {
      // 获取日期:2023-02-02 星期日
      getdate() {
        let date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = month<10?'0'+month : month
        var d = date.getDate()
        d = d<10?'0'+d : d
        var week = date.getDay()
        switch(week) {
          case 0 :
            week = '星期日'
            break;
          case 1 :
            week = '星期一'
            break;
          case 2 :
            week = '星期二'
            break;
          case 3 :
            week = '星期三'
            break;
          case 4 :
            week = '星期四'
            break;
          case 5 :
            week = '星期五'
            break;
          case 6 :
            week = '星期六'
            break;
        }
        this.week = week
        console.log("week",week)
        this.today = month + '月' + d + '日' + ' ' + week
        console.log(this.today)
      },
      // 获取天气相关信息
      getweatherdate() {
        let date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = month<10? '0'+ month : month
        var day = date.getDate()
        day = day<10? '0'+ day : day
        this.weatheryear = year
        this.weathermonth = month 
        this.weatherday = day
      },
      // 去看消费和收入详情
      todetails(billsId, count, imgurl, income, merchants, method, note, timestamp, type, productList ,picture) {
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
      			url: `/pages/income-details/income-details?billsId=${billsId}&count=${count}&imgurl=${imgurl}&merchants=${merchants}&method=${method}&note=${note}&timestamp=${timestamp}&type=${type}&picture=${picture}`
      		})
      	}
      },
      getWeatherIcon(icon){
            //需要添加匹配相同类型的天气数组
            let sumDay = [100]
            let windDay = [101, 102, 103, 104]
            let night = [150, 151, 152, 153]
            let sumRain = [300, 301]
            let smallThunder = [302, 303, 304]
            let smallRain = [305, 306, 307, 309, 399]
            let bigRain = [308, 310, 311, 312, 313, 314, 315, 316, 317, 318]
            let nightRain = [350, 351, 456, 457]
            let smallSnow = [400, 401, 407, 408, 409, 499]
            let bigSnow = [402, 403, 410]
            let rainSnow = [404, 405, 406]
            let cowday = [500, 501, 502]
            //需要添加匹配相同类型的天气数组
            switch (true) {
              case (sumDay.includes(icon)):
                return "../../static/weather/-100.png";
              case (windDay.includes(icon)):
                return "../../static/weather/-101.png";
              case (smallRain.includes(icon)):
                return "../../static/weather/-102.png";
              case (bigRain.includes(icon)):
                return "../../static/weather/-103.png";
              case (smallThunder.includes(icon)):
                return "../../static/weather/-104.png";
              case (night.includes(icon)):
                return "../../static/weather/-110.png";
              case (smallSnow.includes(icon)):
                return "../../static/weather/-109.png";
              case (bigSnow.includes(icon)):
                return "../../static/weather/-105.png";
              case (cowday.includes(icon)):
                return "../../static/weather/-107.png";
              default:
                return "../../static/weather/" + icon + ".svg";
            }
        },
      // 获取天气信息
      getweather() {
        var _self = this
        uni.getLocation({
          type: "wgs84",
          success: function(res) {
            uni.request({
              url: `http://139.9.197.13:8080/xlzb/weather/` + res.longitude + "," + res.latitude,
              method: 'GET',
              success: function(res){
                if (res.data.code !== "200") { 
                } else {
                  this.weather = res.data.data
                  _self.address = res.data.data.address
                  // console.log("地址",_self.address)
                  _self.weatherinfo = res.data.data.text
                  // console.log("天气情况",_self.weatherinfo)
                  _self.iconUrl = _self.getWeatherIcon(parseInt(res.data.data.icon))
				  uni.setStorageSync('address',res.data.data.address)
				  uni.setStorageSync('weatherinfo',res.data.data.text)
				  uni.setStorageSync('iconUrl',_self.getWeatherIcon(parseInt(res.data.data.icon)))
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
      async gettodaydata() {
        await this.request({
        url:'/xlzb/getBills',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId')
        }
        }).then(res=> {
          if(res.code === "200") {
            this.todaydatalist = res.data
			
			if(this.todaydatalist.length == 0) {
			  console.log("0000")
			  this.havedata = 0
			  console.log(this.havedata)
			}else {
			  this.havedata = 1
			}
            var incount = 0
            var outcount = 0
            for(var i=0;i<res.data.length;i++) {
              // 消费统计
              if(res.data[i].income == false) {
                console.log("消费")
                outcount = outcount + res.data[i].count
              }
              // 收入统计
              if(res.data[i].income == true) {
                incount = incount + res.data[i].count
              }
              if(res.data[i].type == '餐饮') {
                this.todaydatalist[i].imgurl = '../../static/catering.png'
              }
              if(res.data[i].type == '收入') {
                this.todaydatalist[i].imgurl = '../../static/weixin-revenue.png'
              }
              if(res.data[i].type == '娱乐') {
                this.todaydatalist[i].imgurl = '../../static/amusement.png'
              }
              if(res.data[i].type == '出行') {
                this.todaydatalist[i].imgurl = '../../static/travel.png'
              }
              if(res.data[i].type == '学习') {
                this.todaydatalist[i].imgurl = '../../static/manual-entry/02.png'
              }
              if(res.data[i].type == '其它') {
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
			goManual_entry() {
				uni.navigateTo({
					url: '/pages/manual-entry2/manual-entry2'
				})
			},
			goConsumptionDetail() {
				uni.navigateTo({
					url: '/pages/consumption-details/consumption-details'
				})
			},
			goRevenueDetail() {
				uni.navigateTo({
					url: '/pages/revenue-details/revenue-details'
				})
			},
			test() {
				uni.navigateTo({
					url: '/pages/revenue-details/revenue-details'
				})
			},
			test2() {
				uni.navigateTo({
					url: '/pages/manual-entry/manual-entry'
				})
			},
      // 获取用户的某个月的收入和支出
      async getUserQuickStat() {
        await this.request({
        url:'/xlzb/getUserQuickStat',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":this.year + '-' + this.month + '-' + '01'
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log("----",res)
            // 这个月的支出
            this.monthout = res.data.expenses
            this.getmonthout(this.monthout)
            // 这个月的收入
            this.monthincome = res.data.income
            this.getmonthincome(this.monthincome)
            // 这个月的结余
            this.balance = this.monthincome - this.monthout
            this.getmonnthbalance(this.balance)
            if(this.balance<0) {
              this.balance = 0
            }
          }
        }).catch(err => {
          console.log(err)
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
              mask:true,
              title:'上传中...'
            })
            uni.uploadFile({
              url: `http://139.9.197.13:8080/xlzb/autoOcr/${uni.getStorageSync('userId')}`,
              filePath: tempFilePaths[0],
              name: 'file',
              success: (res) => {
                console.log("res",res)
                console.log()
                 console.log(JSON.parse(res.data))
                 res = JSON.parse(res.data)
                if(res.code =="200" ) {
                  uni.hideLoading()
                  // 前往确认信息是否正确
                  uni.navigateTo({
                    url:`/pages/confirmbilling2/confirmbilling2?income=${res.data.income}&count=${res.data.count}&timestamp=${res.data.timestamp}&picture=${res.data.picture}&productList=${JSON.stringify(res.data.productList)}&merchants=${res.data.merchants}`
                  })
                }
              }
            });
          }
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
			change1() {
				// 判断现在是哪个模式(0,1,2)分别表示三个模式，作为初始值
				this.move = 0
			
				this.bottom1 = 0
				this.top1 = 0
			},
			changeitem(index) {
				this.move = index
        this.mode = index
			},
      // 切换模式
      async changemode() {
        console.log("change")
        await this.request({
          url: '/xlzb/updateUser',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "mode": this.mode
          }
        }).then(res => {
          if (res.code === "200") {
            uni.setStorageSync('usermode',this.mode)
          }
        }).catch(err => {
          console.log(err)
        })
      },
			close1() {
				this.bottom1 = -750
				this.top1 = 2000
			},
			sure1() {
				this.bottom1 = -750
				this.top1 = 2000
				if (this.move == 0) {
					uni.redirectTo({
						url: '/pages/index2/index2'
					})
          this.changemode()
				}
				if (this.move == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
          this.changemode()
				}
				if (this.move == 2) {
					uni.redirectTo({
						url: '/pages/index3/index3'
					})
          this.changemode()
				}
			},
		}
	}
</script>

<style scoped>
	.main {
		padding: 30rpx;
    /* padding-bottom: 150rpx; */
	}

	.weather {
		width: 96rpx;
		height: 96rpx;
		margin-right: 20rpx;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 100rpx 35rpx 0 35rpx;
	}

	.time {
		font-family: "Alibaba_Extra_bold";
		font-size: 32rpx;
	}

.address {
	font-weight: 700;
}
	.weather-info {
	  font-family: "Alibaba_Regular";
	  color: rgba(166, 166, 166, 1);
	  font-weight: 600;
	  font-size: 28rpx;
	}

	.head-left {
		display: flex;
    align-items: center;
	}
  
	.set image {
		width: 50rpx;
		height: 50rpx;
	}

	.banel-box {
		position: relative;
		height: 450rpx;
		border-radius: 20rpx;
	}

	.banel-box .bg-img {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}

	.output {
		display: flex;
		padding: 40rpx 40rpx 10rpx 40rpx;
		font-size: 28rpx;
		font-family: "Alibaba_Regular";
		justify-content: space-between;
	}

	.output-right {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		font-size: 28rpx;
		z-index: 99;
	}

	.output-right image {
		width: 16rpx;
		height: 10rpx;
		margin-left: 10rpx;
	}

	.pay {
		font-size: 54rpx;
		font-family: "Alibaba_Extra_bold";
	}

	.income-box {
		font-size: 28rpx;
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
		font-size: 36rpx;
		font-family: "Alibaba_Extra_bold";
	}

	.remainder {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		padding: 30rpx 30rpx 0 30rpx;
	}

	.process {
		width: 100%;
		height: 20rpx;
		border-radius: 20rpx;
		margin-top: 15rpx;
		background-color: rgba(59, 206, 177, 1);
	}

	.remainder {
		font-size: 26rpx;
		font-weight: 600;
	}

	.consumption-information {
		height: 288rpx;
		margin-top: 30rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
	}

	.option-box {
		
		display: flex;
		justify-content: center;
	}

	.title {
		padding: 30rpx 20rpx 0 30rpx;
		font-size: 36rpx;
		color: rgba(51, 51, 51, 1);
		font-family: "Alibaba_Extra_bold";
	}

	.entry-title {
		font-size: 34rpx;
		font-weight: 600;
		position: absolute;
		left: 40rpx;
		top: 40rpx;
	}

	.manual-entry,
	.scan-entry {
		position: relative;
		color: rgba(51, 51, 51, 1);


	}

	.manual-entry image,
	.scan-entry image {
		width: 350rpx;
		height: 220rpx;
	}

	.samll-p {
		position: absolute;
		left: 40rpx;
		top: 95rpx;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		font-size: 20rpx;
	}

	.today-info {
		margin-top: 20rpx; 
		margin-bottom: 120rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.4);
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
		font-size: 24rpx;
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
		font-size: 30rpx;
		margin-right: 10rpx;
	}

	.date {
		font-size: 24rpx;
		margin-top: 15rpx;
		color: rgba(153, 153, 153, 1);
	}

	.items {
		padding: 20rpx 35rpx 20rpx 35rpx;
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
		color: #333333;
	}

	/* .out {
		color: rgba(237, 87, 88, 1);
	}

	.in {
		color: rgba(59, 206, 177, 1);
	} */
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
  .items-count {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 44rpx;
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

	

	.model-box1 {
		position: fixed;
		transition: all 0.6s;
		top: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		background-color: rgba(51, 51, 51, 1);
	}

	.model1 {
		opacity: 1;
		position: fixed;
		padding: 30rpx 50rpx;
		transition: all 0.6s;
		z-index: 1000;
		width: 650rpx;
		height: 580rpx;
		bottom: 0rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
	}

	.model-head1 {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}

	.model-head1 image {
		width: 61rpx;
		height: 61rpx;
	}

	.model-head1 p {
		margin-left: 260rpx;
		font-size: 36rpx;
	}

	.item-text {
		display: flex;
	}

	.item-text p:nth-child(2) {
		margin-left: 15rpx;
	}

	.model-item {
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.choise-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 4rpx solid rgba(59, 206, 177, 1);
	}

	.choise-box image {
		width: 25rpx;
		height: 25rpx;
	}

	.move {
		background-color: rgba(59, 206, 177, 1);
	}

	.sure1 {
		margin: 40rpx auto;
		color: #fff;
		width: 618rpx;
		height: 85rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 60rpx;
		background-color: rgba(59, 206, 177, 1);
	}
	.nodata {
		display: flex;
		align-items: center; 
		justify-content: center;
	
	}
</style>
