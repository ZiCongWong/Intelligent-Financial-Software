<template>
  <view class="con">
    <mynav :text="text"></mynav>
    <tabbar :state="state"></tabbar>
    <view class="app-set">
      <image src="../../static/identities.png" mode="" @click="change"></image>
      <image src="../../static/my-set.png" mode="" @click="goSetting"></image>
    </view>
    <view class="my-box">
      <image src="../../static/avatar.jpg" mode="" class="avatar"></image>
      <view class="my-info">
        <p class="name">lanan</p>
        <p class="keep-day">坚持记账的41天</p>
      </view>
    </view>
    <view class="my-items">
      <view class="my-item">
        <p class="number">41</p>
        <p class="kind">记账天数</p>
      </view>
      <view class="my-item">
        <p class="number">30</p>
        <p class="kind">记账笔数</p>
      </view>
      <view class="my-item">
        <p class="number">1406.74</p>
        <p class="kind">今月消费</p>
      </view>
      <view class="my-item">
        <p class="number">157.08</p>
        <p class="kind">今月收入</p>
      </view>
    </view>
    <monthbudget></monthbudget>
    <image src="../../static/bg.png" mode="" class="bg" @click="goManual_entry"></image>
    <view class="function-box">
      <view class="function-head">
        <view class="border-col"></view>
        <view class="function-title">
          常用功能
        </view>
      </view>
      <view class="function-items">
        <view class="items-one">
          <view class="function-item" @click="toanalysis">
            <image src="../../static/countdelay.png" mode=""></image>
            <p>消费分析</p>
          </view>
          <view class="function-item" @click="toexportdata">
            <image src="../../static/export.png" mode=""></image>
            <p>导出数据</p>
          </view>
          <view class="function-item" @click="toaccountset">
            <image src="../../static/Personal-data.png" mode=""></image>
            <p>个人资料</p>
          </view>
          <!-- <view class="function-item" @click="tosetperiod">
            <image src="../../static/cycle.png" mode=""></image>
            <p>周期设定</p>
          </view> -->
          <view class="function-item" @click="toquestion">
            <image src="../../static/issue.png" mode=""></image>
            <p>常见问题</p>
          </view>
        </view>
        <view class="item-two">
          
          <view class="function-item" @click="tocontactus">
            <image src="../../static/contact.png" mode=""></image>
            <p>联系我们</p>
          </view>
          <view class="function-item" @click="toconcern">
            <image src="../../static/habit.png" mode=""></image>
            <p>关于我们</p>
          </view>
        </view>
      </view>
    </view>
    <view class="model-box" :style="{'top':top+'rpx'}">

    </view>
    <view class="model" :style="{'bottom':bottom +'rpx'}">
      <view class="model-head">
        <p>切换模式</p>
        <image src="../../static/close.png" mode="" @click="close"></image>
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
      <view class="sure" @click="sure">
        确定
      </view>
    </view>
    <!-- <monthchose :tt="tt" :bot="bot" @onclose="onclose" @onsure="onsure" @onbind="onbind"></monthchose> -->
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  import mynav from '../../components/mynav/mynav.vue'
  import cmdprogress from '../../components/cmd-progress/cmd-progress.vue'
  // import monthchose from '../../components/monthchose/monthchose.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        state: '5',
        tt: 2000,
        bot: -750,
        bottom: -750,
        top: 2000,
        text: '我的',
        bottom2: -750,
        percent: 100,
        current: 0,
        move: 0,
        useravatar: uni.getStorageSync('userheadAvrUrl'),
        username: uni.getStorageSync('username'),
        year: '',
        today: '',
        month: '',
        daycount: 0,
        billsCount: 0,
        monthbudget: 0,
        monthout: 0,
        budgetId: '',
        outtotal:0,
        incometotal:0,
        intotal:0,
        budgetamount: '',
        currentmonth:'',
        mode: 1,
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
    components: {
      tabbar,
      mynav,
      cmdprogress
    },
    beforeCreate() {
      uni.hideTabBar()
    },
	onLoad() {
		 
	},
    onShow() {
		this.useravatar= uni.getStorageSync('userheadAvrUrl'),
		this.username=uni.getStorageSync('username'),
      this.getuserinfo()
      this.getcurrentdate()
      this.getmonoutdetails()
      this.getmonindetails()
    },
    methods: {
      // 去手动录入页面
      goManual_entry() {
        uni.navigateTo({
          url: '/pages/manual-entry/manual-entry'
        })
      },
      toexportdata() {
        uni.navigateTo({
          url:'/pages/export-data/export-data'
        })
      },
      toconcern() {
        uni.navigateTo({
          url:'/pages/concerning/concerning'
        })
      },
      // 获取用户信息
      async getuserinfo() {
        await this.request({
          url: `/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
          method: 'GET'
        }).then(res => {
          if (res.code === "200") {
            console.log("面板数据",res.data)
            this.daycount = res.data.billsCount
            // 记账天数
            uni.setStorageSync('userdaycount', this.daycount)
            // 记账笔数
            this.billsCount = res.data.billsCount
            uni.setStorageSync('userbillsCount', this.billsCount)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取当前月份和月份
      getcurrentdate() {
        let date = new Date()
        let year = date.getFullYear() 
        let month = date.getMonth() + 1
        month = month<10?'0' + month : month
        this.currentmonth = year + '-' + month + '-01'
      },
      // 获取前月份消费情况
      async getmonoutdetails() {
        await this.request({
        url:'/xlzb/getUserBillsDetails',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":[this.currentmonth],
          "isIncome":false
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log("----out",res)
              let outnum = 0
              for(var i=0;i<res.data.length;i++) {
                outnum = outnum + res.data[i].expenses_total
              }
              this.outtotal = outnum.toFixed(2)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取当前月份收入情况
      async getmonindetails() {
        await this.request({
        url:'/xlzb/getUserBillsDetails',
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "date":[this.currentmonth],
          "isIncome":true
        }
        }).then(res=> {
          if(res.code === "200") {
            console.log("in",res)
              let intnum = 0
              for(var i=0;i<res.data.length;i++) {
                intnum = intnum + res.data[i].income_total
              }
              this.incometotal = intnum.toFixed(2)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      change() {
        // 判断现在是哪个模式(0,1,2)分别表示三个模式，作为初始值
        this.move = 1
        this.bottom = 0
        this.top = 0
      },
      changeitem(index) {
        this.move = index
        this.mode = index
      },
      close() {
        this.bottom = -750
        this.top = 2000
      },
      tosetperiod() {
        uni.navigateTo({
          url:'/pages/set-period/set-period'
        })
      },
      toaccountset() {
        uni.navigateTo({
          url:'/pages/account-setting/account-setting'
        })
      },
      toquestion() {
        uni.navigateTo({
          url:'/pages/Frequently-questions/Frequently-questions'
        })
      },
      tocontactus() {
        uni.navigateTo({
          url:'/pages/contactus/contactus'
        })
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
      sure() {
        this.bottom = -750
        this.top = 2000
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
      goSetting() {
        uni.navigateTo({
          url: '/pages/setting/setting'
        })
      },
      toanalysis() {
        console.log(101)
        uni.navigateTo({
          url:'/pages/consumption-analysis/consumption-analysis'
        })
      }
    }
  }
</script>

<style scoped>
  .con {
    padding-bottom: 150rpx;
  }

  .app-set {
    padding: 0 30rpx;
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }

  .app-set image {
    width: 55rpx;
    height: 55rpx;
    margin-left: 30rpx;
  }

  .my-box {
    padding: 10rpx 60rpx 0rpx 60rpx;
    display: flex;
    align-items: center;
  }

  .avatar {
    border-radius: 50%;
    width: 130rpx;
    height: 130rpx;
  }

  .name {
    color: rgba(18, 24, 54, 1);
    font-size: 38rpx;
    font-weight: 600;
    margin-bottom: 5rpx;
  }

  .keep-day {
    color: rgba(170, 176, 186, 1);
    font-size: 24rpx;
  }

  .my-info {
    margin-left: 20rpx;
  }

  .my-items {
    width: 690rpx;
    margin: 60rpx auto;
    display: flex;
    justify-content: space-around;
  }

  .my-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .number {
    font-weight: 700;
    font-size: 48rpx;
  }

  .kind {
    color: rgba(153, 153, 153, 1);
    font-size: 28rpx;
    margin-top: 4rpx;
  }

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

  .remaining-budget,
  .mon-budget,
  .mon-out {
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

  .bg {
    margin: 20rpx auto;
    width: 731rpx;
    height: 217rpx;
  }

  .function-head {
    display: flex;
    font-weight: 600;
    align-items: center;
  }

  .function-box {
    width: 630rpx;
    margin: 0 auto;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
  }

  .function-items {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .function-item:nth-child(4),
  .function-item:nth-child(8) {
    margin-right: 0;
  }

  .function-item {
    display: flex;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: rgba(51, 51, 51, 1);
    flex-direction: column;
    align-items: center;
  }

  .function-item image {
    width: 50rpx;
    height: 50rpx;
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

  .model {
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

  .items-one {
    width: 630rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .item-two {
    width: 630rpx;
    display: flex;
    align-items: center;
  }
  .item-two .function-item {
    margin-left: 10rpx;
    margin-right: 45rpx;
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
</style>
