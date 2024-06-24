<template>
  <view>
    <!-- 浅灰色背景遮罩 -->
    <view class="model-box" :style="{'top':tt+'rpx'}">
      
    </view>
    <!-- 月份选择器 -->
    <view class="chose" :style="{'bottom':bot+'rpx'}">
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
      <view class="sure" @click="sure">
        确定
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"monthchose",
    props: ["tt","bot"],
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
        day,
        value: [9999, month - 1, day - 1],
        indicatorStyle: `height: 50rpx;line-height: 50rpx;`,
      };
    },
    methods: {
      sure() {
        this.top = 2000
        this.bottom = -750
        this.$emit('onsure',this.top,this.bottom)
      },
      close() {
        this.top = 2000
        this.bottom = -750
        this.$emit('onclose',this.top,this.bottom)
      },
      bindChange: function(e) {
        const val = e.detail.value
        this.year = this.years[val[0]]
        this.month = this.months[val[1]]
        this.$emit('onbind',this.year,this.month)
      },
    },
    
  }
</script>

<style scoped>
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
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: rgba(51, 51, 51, 1);
  }
</style>