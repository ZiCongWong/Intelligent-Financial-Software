<template>
  <view class="my-nav">
    {{text}}
  </view>
</template>

<script>
  export default {
    props:['text'],
    name:"mynav2",
    data() {
      return {
        
      };
    }
  }
</script>

<style scoped>
.my-nav {
  width: 100%;
  height: 130rpx;
  text-align: center;
  line-height: 180rpx;
  background-color: #3CCFB1;
  font-weight: 600;
}
</style>