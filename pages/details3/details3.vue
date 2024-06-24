<template>
	<view class="con">
		<tabbar3 :state="state"></tabbar3>
		<view class="nav-head">
			收支明细
		</view>
		<view class="nav">
			<view class="chose" @click="changekind">
				<view class="bg">
				</view>
				<p>{{typetext}}</p>
				<view class="line">
				</view>
				<image src="../../static/more.png" mode=""></image>
			</view>
			<view class="nav-bot">
				<view class="nav-bot-left" @click="chosemonth">
					<p>{{year}}</p>
					<view class="bigger">
						<view class="ten">
							{{month<10?'0'+month:month}}
						</view>
						<view class="month">
							月
						</view>
						<image src="../../static/sectle2.png" mode=""></image>
					</view>

				</view>
				<view class="nav-bot-right">
					<view class="total-out">
						<p>总支出</p>
						<view class="dollar">
							<p class="dollar-icon">￥</p>
							<p class="ten">{{outtotal}}</p>
						</view>
						
					</view>
				</view>
				<view class="nav-bot-right">
					<view class="total-in">
						<p>总收入</p>
						<view class="dollar">
							<p class="dollar-icon">￥</p>
							<p class="ten">{{incometotal}}</p>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="item-box">
		  <view class="items" v-for="(item,index) in monthdatalist" :key="item.date">
		    <view class="item">
		      <view class="item-head">
		        <view class="item-head-left">
		          <p class="time">{{item.date}}</p>
		        </view>
		        <view class="item-head-right">
		          <view class="out-box">
		            <view class="label">出</view>
		            <p>{{item.expenses_total}}</p>
		          </view>
		          <view class="in-box">
		            <view class="label">入</view>
		            <p>{{item.income_total}}</p>
		          </view>
		        </view>
		      </view>
		      <view class="info-item" v-for="(item2,index2) in monthdatalist[index].list" :key="index2" @click="todetails2(item2)">
		        <view class="info-item-left">
		          <image :src="getIcon(item2.type,index,index2)" mode=""></image>
		          <view class="information">
		            <p class="text">{{item2.type}}</p>
		          </view>
		        </view>
		        <view class="items-right">
		          <view class="items-count" :style="{color:item2.income ==true?'rgba(59,206,177,1)':'rgba(237,87,88,1)'}">
		              <view v-if="item2.income == true">+</view>
		              <view v-if="item2.income == false">-</view>
		              <view>
		                {{item2.count}}￥
		              </view>
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		<monthchose :tt="top" :bot="bottom" @onclose="onclose" @onsure="onsure" @onbind="onbind"></monthchose>
		<chosekind :ttt="top2" :bott="bottom2" @onclose2="onclose2" @onsure2="onsure2"></chosekind>
	</view>
</template>

<script>
	import tabbar3 from '../../components/tabbar3/tabbar3.vue'
	import monthchose from '../../components/monthchose/monthchose.vue'
	import chosekind from '../../components/chosekind/chosekind.vue'
	export default {
		data() {
			const date = new Date()
			const year = date.getFullYear()
			const month = date.getMonth() + 1
			return {
				top: 2000,
				bottom: -750,
				top2: 2000,
				state: '2',
				bottom2: -770,
				typetext: '全部类型',
				year,
				month,
        incometotal: 0,
        outtotal: 0,
        monthdatalist:[],
			}
		},
		components: {
			monthchose,
			chosekind,
			tabbar3
		},
    onShow() {
      // 获取全部类型前月份消费情况
      this.getmonthdetails()
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
      // 获取全部类型前月份消费情况
      async getmonthdetails() {
        await this.request({
          url: '/xlzb/getUserBillsDetails',
          method: 'POST',
          data: {
            "user_id": uni.getStorageSync('userId'),
            "date": [this.year + '-' + this.month + '-' + '01'],
          }
        }).then(res => {
          if (res.code === "200") {
            console.log("----", res)
            this.monthdatalist = res.data
            let outnum = 0
            let innum = 0
            for(var i=0;i<res.data.length;i++) {
              outnum = outnum + res.data[i].expenses_total
              innum = innum + res.data[i].income_total
            }
            this.outtotal = outnum.toFixed(2)
            this.incometotal = innum.toFixed(2)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取各种类型前月份消费情况
      async gettypemondetails() {
        await this.request({
        url:'/xlzb/getUserBillsDetails',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":[this.year + '-' + this.month + '-' + '01'],
          "type":this.typetext
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log("获取各种类型前月份消费情况",res)
              this.monthdatalist = res.data
              let outnum = 0
              let innum = 0
              for(var i=0;i<res.data.length;i++) {
                outnum = outnum + res.data[i].expenses_total
                innum = innum + res.data[i].income_total
              }
              this.outtotal = outnum.toFixed(2)
              this.incometotal = innum.toFixed(2)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getIcon(type, index, index2) {
        switch (type) {
          case "餐饮":
            this.monthdatalist[index].list[index2].imgurl = "../../static/catering.png";
            return "../../static/catering.png";
          case "收入":
            this.monthdatalist[index].list[index2].imgurl = "../../static/weixin-revenue.png";
            return "../../static/weixin-revenue.png";
          case "娱乐":
            this.monthdatalist[index].list[index2].imgurl = "../../static/amusement.png";
            return "../../static/amusement.png";
          case "出行":
            this.monthdatalist[index].list[index2].imgurl = "../../static/travel.png";
            return "../../static/travel.png";
          case "学习":
            this.monthdatalist[index].list[index2].imgurl = "../../static/study.png";
            return "../../static/study.png";
          case "其它":
            this.monthdatalist[index].list[index2].imgurl = "../../static/others.png";
            return "../../static/others.png";
        }
      },
			chosemonth() {
				this.top = 0
				this.bottom = 0
			},
			changekind() {
				this.top2 = 0
				this.bottom2 = 0
			},
			onclose(t, b) {
				this.top = t
				this.bottom = b
			},
			onsure(t, b) {
				this.top = t
				this.bottom = b
        this.getmonthdetails()
			},
			onbind(yy, mm) {
				this.year = yy
				this.month = mm
			},
			onclose2(t2, b2, text) {
				this.top2 = t2
				this.bottom2 = b2
			},
			onsure2(t2, b2, text) {
				this.top2 = t2
				this.bottom2 = b2
				this.typetext = text
        this.gettypemondetails()
			},
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

	.chose image {
		width: 34rpx;
		height: 34rpx;
	}

	.nav {
		padding: 30rpx;
		background-color: #3BCEB1;
	}

	.chose {
		width: 259rpx;
		position: relative;
		color: #fff;
		font-size: 35rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.bg {
		position: absolute;
		width: 259rpx;
		height: 68rpx;
		border-radius: 6rpx;
		background-color: #fff;
		opacity: 0.2;
	}

	.line {
		width: 2rpx;
		height: 28rpx;
		opacity: 0.4;
		background-color: #fff;
	}

	.nav-bot-left {

		align-items: center;
		font-size: 36rpx;
		color: #fff;
	}

	.bigger {
		display: flex;
		justify-content: center;
		align-items: baseline;
	}

	.ten {
		font-size: 46rpx;
		font-family: "Alibaba_bold";
	}

	.month {
		font-size: 35rpx;
	}

	.nav-bot-left image {
		width: 15rpx;
		margin-left: 10rpx;
		height: 10rpx;
	}

	.total-in {
		font-size: 35rpx;
	}
	
	.dollar {
		display: flex;
		align-items: baseline;
		font-family: "Alibaba_bold";
	}

	.nav-bot-right {
		color: #fff;
		display: flex;
	}

	.nav-bot {
		margin-top: 40rpx;
		padding: 0 20rpx;
		font-size: 35rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.total-out {font-size: 30rpx;}

	.items {
		padding: 0rpx 30rpx 0rpx 30rpx;
	}
  .item-box {
    padding-bottom: 120rpx;
    padding-top: 20rpx;
  }
	.item {
		background-color: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0px 6px 20px 4px rgba(219, 219, 219, 0.3);
	}

	.item-head-left {
		display: flex;
	}

	.item-head-left p {
		font-size: 36rpx;
		font-weight: 600;
		font-weight: 600;
	}

	.time {
		margin-right: 10rpx;
	}

	.item-head-right {
		display: flex;
	}

	.item-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.label {
		text-align: center;
		line-height: 36rpx;
		margin-right: 10rpx;
		width: 36rpx;
		border-radius: 3rpx;
		font-size: 35rpx;
		font-weight: 600;
		font-family: "Alibaba_bold";
		height: 36rpx;
		color: rgba(153, 153, 153, 1);
		background-color: #f5f6f7;
	}
	
	.out-box,
	.in-box {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}

	.info-item-left {
		display: flex;
		align-items: center;
	}

	.text {
		font-size: 45rpx;
		font-weight: 700;
	}

	.info-item-left image {
		margin-right: 10rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.info-item-right {
		font-size: 50rpx;
		font-weight: 700;
	}

	.info-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		justify-content: space-between;
	}
  .items-count {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 44rpx;
    font-weight: 600;
  }

	.out {
		color: rgba(237, 87, 88, 1);
	}

	.in {
		color: rgba(59, 206, 177, 1);
	}

	.text-info {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 22rpx;
	}

	.line2 {
		margin-right: 10rpx;
		margin-left: 10rpx;
		width: 2rpx;
		height: 14rpx;
		background-color: #999;
	}
</style>
