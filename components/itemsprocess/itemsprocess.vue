<template>
  <view class="pie-process-item">
    <view class="pie-process-left">
      <view class="left-head">
        <image :src="url" mode=""></image>
        <p class="kind">{{text}}</p>
        <p class="pro">({{value}}%)</p>
      </view>
      <view class="process-box">
        <!-- -25rpx为起点 -->
        <view class="process" :style="{'background-color':col,'width':400*value/100+'rpx'}">

        </view>
      </view>
    </view>
    <view class="pie-process-right">
      <p class="value">{{count>0?count : '0'}}</p>
    </view>
  </view>
</template>

<script>
  export default {
    props: ["col","width","value","url","text","count"],
    name: "itemsprocess",
    data() {
      return {
        // width:100,
      };
    },
    mounted() {
      // this.processvalue()
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .pie-process-item {
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .process-box {
    width: 400rpx;
    margin-top: 10rpx;
    height: 11rpx;
    border-radius: 20rpx;
    background-color: #f5f6f7;
    overflow: hidden;
  }

  .process {
    transition: all 0.6s;
    height: 11rpx;
  }

  .left-head image {
    width: 30rpx;
    margin-right: 6rpx;
    height: 30rpx;
  }

  .pro {
    font-weight: 600;
	font-size: 43rpx;
    margin-left: 10rpx;
    color: rgba(153, 153, 153, 1);
  }

  .left-head {
    font-weight: 600;
    display: flex;
    font-size: 43rpx;
    align-items: center;
  }

  .pie-process-right {
    font-size: 45rpx;
    font-weight: 600;
    display: flex;
  }

  .pie-process-right image {
    width: 40rpx;
    height: 40rpx;
    margin-left: 8rpx;
  }
</style>
