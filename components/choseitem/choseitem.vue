<template>
  <view :class="chose == 1? 'items move' : 'items' ">
    {{text}}
  </view>
</template>

<script>
  export default {
    props:["text","chose"],
    name:"choseitem",
    data() {
      return {
        flag:false
      };
    },
    methods : {
      
    }
  }
</script>

<style scoped>
.items {
    margin: 20rpx 0;
    width: 170rpx;
    height: 65rpx;
    border-radius: 70rpx;
    margin-right: 40rpx;
    background: rgba(204, 204, 204, 0.2);
    line-height: 65rpx;
    text-align: center;
    font-size: 28rpx;
  }
  .move {
    color: rgba(255, 255, 255, 1);
    background: rgba(59, 206, 177, 1);
  }
</style>