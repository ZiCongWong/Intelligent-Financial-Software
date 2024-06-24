<template>
  <view>
    <view class="value-box" :style="{'background-color':col,'left':width-40+'rpx'}">
      <p>{{value}}%</p>
      <view class="trangle" :style="{'border-top-color':col}">
        
      </view>
    </view>
    <view class="process-box">
      <!-- -25rpx为起点 -->
      <view class="process" :style="{'background-color':col,'width':width+'rpx'}">
    
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props:["col","width","value"],
    name:"process",
    data() {
      return {
        
      };
    }
  }
</script>

<style scoped>
.process-box {
  position: relative;
  width: 600rpx;
  margin-left: 10rpx;
  height: 16rpx;
  border-radius: 20rpx;
  background-color: #fff;
  overflow: hidden;
}
.process {
  transition: all 0.6s; 
  height: 16rpx;
}
.value-box {
  position: relative;
  transition: all 0.6s; 
  color: #fff;
  width: 100rpx;
  height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  line-height: 40rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
}
.trangle {
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  bottom: -18rpx;
  transform: translateX(-50%);
  border-top: 10rpx solid red;
  border-bottom: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-left: 10rpx solid transparent;
}
</style>