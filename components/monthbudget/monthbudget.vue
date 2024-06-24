<template>
  <view>
    <view class="budget-box">
      <view class="budget-head">
        <view class="budget-head-left">
          <view class="border-col"></view>
          <view class="budget-chose">
            03月总预算
          </view>
          <image src="../../static/jiaobiao.png" mode="" @click="openmonth"></image>
        </view>
        <view class="budget-head-right" @click="setbudget">
          设置预算
        </view>
      </view>
      <view class="chart">
        <cmdprogress type="circle" :percent="97.5" stroke-color="#3bceb1" class="charts-box"></cmdprogress>
        <view class="chart-banel">
          <view class="remaining-budget">
            <p>剩余预算:</p>
            <p>54862</p>
          </view>
          <view class="mon-budget">
            <p>本月预算:</p>
            <p>56269</p>
          </view>
          <view class="mon-out">
            <p>本月支出:</p>
            <p>1406.74</p>
          </view>
        </view>
      </view>   
    </view>
    <monthchose :tt="tt" :bot="bot" @onclose="onclose" @onsure="onsure" @onbind="onbind"></monthchose>
    <view class="set-budget" :style="{'bottom':bottom2+'rpx'}">
      <view class="model-head">
        <p>预算设定</p>
        <image src="../../static/close.png" mode="" @click="close2"></image>
      </view>
      <view class="input-budget">
        <input type="digit" placeholder="请输入预算金额" v-model="budgetamount">
      </view>
      <view class="sure" @click="setbudgetdone">
        确定
      </view>
    </view>
    <view class="model-box" :style="{'top':top+'rpx'}">
      
    </view>
  </view>
</template>

<script>
  import monthchose from '../../components/monthchose/monthchose.vue'
  import cmdprogress from '../../components/cmd-progress/cmd-progress.vue'
  // import { mapState,mapMutations} from 'vuex'
  export default {
    name:"monthbudget",
    data() {
      return {
        billsCount:0,
        monthbudget:0,
        percent:100,
        bottom2:-750,
        top:2000,
        tt:2000,
        bot:-750,
        year:'',
        today:'',
        monthout:0,
        budgetId:'',
        month: '',
        budgetamount:'',
      };
    },
    computed: {
      // ...mapState('monthbudget',['monthout']),
      // ...mapState('monthbudget',['monthincome']),
      // ...mapState('userdata',['uId']),
      // ...mapState('userdata',['cart']),
      // 计算出剩余的预算
      remainbudget() {
        let budget = this.monthbudget - this.monthout
        if(budget<=0) {
          budget = 0
        }
        return budget
      }
    },
    components: {
      cmdprogress,monthchose
    },
    mounted() {
      this.getmonth()
      this.getdate()
      this.getuserbid()
    },
    methods: {
      // ...mapMutations('monthbudget',['getmonthbudget','getmonthout']),
      // 获取用户的预算信息，账单id，进度条百分比
      async getuserbid() {
        console.log(11)
        await this.request({
        url:'/xlzb/getUserBudget',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":this.today
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
            this.percent = res.data.process.slice(0,-1)
            console.log(this.percent)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async setbudgetdone() {
        this.bottom2 = -750
        this.top = 2000
        console.log(this.budgetamount)
        await this.request({
        url:'/xlzb/setUserBudget',
        method:'POST',
        data: {
          "budget_id":this.budgetId,
          "amount":this.budgetamount
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log("=======",res)
            this.budgetamount = res.data
            this.getdate()
            this.getuserbid()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      openmonth() {
        this.tt = 0
        this.bot = 0
      },
      onclose() {
        this.tt = 2000
        this.bot = -750
      },
      onsure() {
        this.tt = 2000
        this.bot = -750
      },
      onbind(y,m) {
        this.year = y
        this.month = m
      },
      setbudget() {
        this.bottom2 = 0
        this.top = 0
      },
      close2() {
        this.top = 2000
        this.bottom2 = -750
      },
      // 获取日期:2023-02-02
      getdate() {
        let date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = month<10?'0'+month : month
        var d = date.getDate()
        d = d<10?'0'+d : d
        this.today = year + '-' + month + '-' + d
        console.log(this.today)
      },
      getmonth() {
        let date = new Date()
        this.month = date.getMonth() +1
      },
      // getpercent() {
      //   // console.log(this.remainbudget)
      //   console.log(this.monthbudget,"=====")
      //   let pcent = (this.remainbudget / this.monthbudget)*100
      //   this.percent = pcent.toFixed(2)
      //   uni.setStorageSync('monthpercent',this.percent)
      // },
    }
  }
</script>

<style scoped>
.budget-box {
    margin: 0 auto;
    padding: 30rpx;
    width: 630rpx;
    border-radius: 20rpx;
    box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.03);
    background-color: #fff;
  }

  .budget-head {
    display: flex;
    font-weight: 600;
    justify-content: space-between;
    align-items: center;
  }

  .budget-head-left {
    font-size: 32rpx;
    padding-left: 10rpx;
    display: flex;
    align-items: center;
  }

  .budget-head-left image {
    width: 24rpx;
    height: 18rpx;
    margin-left: 15rpx;
  }

  .border-col {
    width: 8rpx;
    height: 30rpx;
    margin-right: 15rpx;
    background-color: rgba(60, 207, 177, 1);
    border-radius: 30rpx;
  }

  .budget-head-right {
    width: 131rpx;
    height: 49rpx;
    border-radius: 60rpx;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    line-height: 49rpx;
    background-color: rgba(59, 206, 177, 1);
  }
  .chart {
    display: flex;
    align-items: center;
    margin-top: 50rpx;
    justify-content: space-between;
  }
  .chart-banel {
    width: 360rpx;
  }
  .remaining-budget,.mon-budget,.mon-out {
    display: flex;
    margin-bottom: 10rpx;
    justify-content: space-between;
    align-items: center;
    color: rgba(153, 153, 153, 1);
    font-size: 28rpx;
  }
  .remaining-budget {
    margin-bottom: 30rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: rgba(13, 14, 16, 1);
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
  .set-budget {
    background-color: #fff;
    height: 415rpx;
    position: fixed;
    transition: all 0.6s; 
    z-index: 100;
    width: 650rpx;
    bottom: 0;
    padding: 30rpx 50rpx;
    border-radius: 40rpx 40rpx 0 0;
  }
  .items-one,.item-two {
    width: 630rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
  .input-budget {
    margin-top: 100rpx;
    height: 60rpx;
    margin-bottom: 80rpx;
    border-bottom: 2rpx solid rgba(166, 166, 166, 1);
  }
  .input-budget input {
    padding-left: 10rpx;
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
</style>