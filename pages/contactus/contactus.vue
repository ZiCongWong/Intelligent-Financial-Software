<template>
  <view class="con">
    <view class="main">
      <view class="head-right">
        <image src="../../static/sise.png" mode=""></image>
      </view>
      <view class="logo">
        <image src="../../static/logo.png" mode=""></image>
        <p>小绿记账</p>
      </view>
      <view class="tip">
        如果你在使用APP时遇到无法解决的问题，请联系我们。
      </view>
      <view class="phone">
        <p>电话：</p>
        <p>12345678910</p>
      </view>
      <view class="weichart">
        <p>微信：</p>
        <p>xiaolvjizhang</p>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
.con {
  padding: 30rpx;
}
.main {
  background-color: #fff;
  height: 460rpx;
  padding: 30rpx;
  border-radius: 20rpx;
  opacity: 1;
  box-shadow: 0 20rpx 60rpx 4rpx rgba(59, 206, 177, 0.2)
}
.head-right {
  display: flex;
  justify-content: flex-end;
}
.head-right image {
  width: 77rpx;
  height: 59rpx;
}
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 60rpx;
}
.logo image { 
  width: 120rpx;
  height: 120rpx;
}
.logo p {
  color: rgba(60, 207, 177, 1);
  font-size: 34rpx;
  font-weight: 600;
  margin-left: 20rpx;
}
.tip {
  font-size: 28rpx;
  font-weight: 600;
}
.phone,.weichart {
  display: flex;
  margin-top: 20rpx;
  font-size: 28rpx;
  font-weight: 600;
}
</style>
