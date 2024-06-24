<template>
  <view class="banel-box" :style="{'color':color}">
  	<image :src="bgimg" mode="" class="bg-img"></image>
  	<view class="banel">
  		<view class="output">
  			<view class="output-left">
  				<p class="pay">{{monthout}}</p>
  				<p>本月支出</p>
  			</view>
  			<view class="output-right" @click="chosemonth">
  				<p>{{year}}年{{month<10?'0'+month:month}}月</p>
  				<image :src="selimg"></image>
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
  			<process :col="col" :width="width" :value="value"></process>
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
        <picker-view :indicator-style="indicatorStyle" :value="values" @change="bindChange" class="picker-view">
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
  import process from '../../components/process/process.vue'
  export default {
    name:"banel",
    props:['color','bgimg',"col","selimg"],
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
        top:2000,
        bottom:-750,
        years,
        year,
        months,
        month,
        days,
        width:100,
        day,
        balance:0,
        monthout:0,
        monthincome:0,
        today:'',
        bugetcount:0,
        value:'',
        processval:0,
        values: [9999, month - 1, day - 1],
      };
    },
    components: {
      process
    },
	created() {
		this.get_date()
		this.getuserbid()
		// this.processvalue()
		this.getUserQuickStat()
	},
    methods: {
		update(){
			this.get_date()
			this.getuserbid()
			// this.processvalue()
			this.getUserQuickStat()
		},
      // 获取日期:2023-02-02
      get_date() {
        this.date = this.year + '-' + this.month + '-' + '01'
        console.log(this.date)
      },
      // 获取用户的预算信息，账单id，进度条百分比
      async getuserbid() {
        console.log(11)
        await this.request({
        url:'/xlzb/getUserBudget',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":this.date
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log(res.data)
            this.budgetId = res.data.budgetId
            console.log("-----",res.data.budgetId)
            this.monthbudget = res.data.budgetCount
            // this.getmonthbudget(this.monthbudget )
            this.monthout = res.data.expenses
            // this.getmonthout(this.monthout)
            console.log("next")
            // this.getpercent()
            // 获取进度条比例
            this.value = res.data.process.slice(0,-1)
            console.log(this.value)
            this.processvalue()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 2.根据进度条的百分比计算进度条的宽度
      processvalue() {
        var w = 600 * this.value / 100
        this.width = w
        console.log(w)
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
            // this.getmonthout(this.monthout)
            // 这个月的收入
            this.monthincome = res.data.income
            // this.getmonthincome(this.monthincome)
            // 这个月的结余
            this.balance = this.monthincome - this.monthout
            // this.getmonnthbalance(this.balance)
            if(this.balance<0) {
              this.balance = 0
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      bindChange: function(e) {
        const val = e.detail.value
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
      },
      close() {
        this.top = 2000
        this.bottom = -750
      },
      sure() {
        this.top = 2000
        this.bottom = -750
        this.get_date()
        this.getuserbid()
        this.getUserQuickStat()
      },
      chosemonth() {
        console.log(11)
        this.top = 0
        this.bottom = 0
      },
    }
    
  }
</script>

<style scoped>
  .banel {
    position: absolute;
    z-index: 99;
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
    width: 610rpx;
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
	}
	.output-right image {
		width: 16rpx;
    margin-left: 10rpx;
		height: 10rpx;
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
  .chose {
    width: 650rpx;
    height: 500rpx;
    position: fixed;
    left: 0rpx;
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
  .model-box {
    position: fixed;
    transition: all 0.6s;
    top: 0;
    left: 0rpx;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: rgba(51, 51, 51, 1);
  }
</style>