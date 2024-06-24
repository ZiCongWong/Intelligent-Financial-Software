<template>
  <view class="my-nav">
    {{text}}
  </view>
</template>

<script>
  export default {
    props:['text'],
    name:"mynav",
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
  font-weight: 600;
}
</style>