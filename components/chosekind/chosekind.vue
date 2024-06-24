<template>
  <view>
    <!-- 浅灰色背景遮罩 -->
    <view class="model-box" :style="{'top':ttt+'rpx'}">
      
    </view>
    <!-- 类型选择器 -->
    <view class="chose" :style="{'bottom':bott+'rpx'}">
      <view class="model-head">
        <p>请选择类型</p>
        <image src="../../static/close.png" mode="" @click="close"></image>
      </view>
      <view class="kind-box">
        <view class="kind-item" :class="index==1?'move':''" @click="changeindex1">
          全部类型
        </view>
        <view class="kind">
          <p class="kind-title">支出</p>
          <view class="kind-item-con">
            <view class="kind-item" :class="index==2?'move':''" @click="changeindex2">学习</view>
            <view class="kind-item" :class="index==3?'move':''" @click="changeindex3">餐饮</view>
            <view class="kind-item" :class="index==4?'move':''" @click="changeindex4">出行</view>
            <view class="kind-item" :class="index==5?'move':''" @click="changeindex5">娱乐</view>
            <view class="kind-item" :class="index==6?'move':''" @click="changeindex6">其它</view>
          </view>
        </view>
        <view class="kind">
          <p class="kind-title">收入</p>
          <view class="kind-item" :class="index==7?'move':''" @click="changeindex7">收入</view>
        </view>
      </view>
      <view class="sure" @click="sure">
        确定
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"chosekind",
    props: ["ttt","bott"],
    data() {
      return {
        top:2000,
        bottom:-750,
        index:1,
        text:'全部类型',
      };
    },
    methods: {
      changeindex1() {
        this.index = 1
        this.text = '全部类型'
      },
      changeindex2() {
        this.index = 2
        this.text = '学习'
      },
      changeindex3() {
        this.index = 3
        this.text = '餐饮'
      },
      changeindex4() {
        this.index = 4
        this.text = '出行'
      },
      changeindex5() {
        this.index = 5
        this.text = '娱乐'
      },
      changeindex6() {
        this.index = 6
        this.text = '其它'
      },
      changeindex7() {
        this.index = 7
        this.text = '收入'
      },
      sure() {
        this.top = 2000
        this.bottom = -750
        this.$emit('onsure2',this.top,this.bottom,this.text)
      },
      close() {
        this.top = 2000
        this.bottom = -750
        this.$emit('onclose2',this.top,this.bottom,this.text)
      },
    },
    
  }
</script>

<style scoped>
.chose {
    width: 650rpx;
    position: fixed;
    transition: all 0.6s;
    z-index: 999;
    padding: 30rpx 50rpx;
    border-radius: 40rpx 40rpx 0 0;
    background-color: #f5f6f7;
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
    z-index: 999;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: rgba(51, 51, 51, 1);
  }
  .kind-item-con {
    display: flex;
    flex-wrap: wrap;
  }
  .kind-title {
    font-size: 28rpx;
    color: #999;
  }
  .kind-item {
    width: 180rpx;
    text-align: center;
    margin: 10rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 8rpx;
    background-color: #fff;
  }
  .move {
    background-color: #3BCEB1;
    color: #fff;
  }
</style>