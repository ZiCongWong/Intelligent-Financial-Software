<template>
  <view class="con">
    input
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  export default {
    data() {
      return {
        state:'3'
      }
    },
    components: {
      tabbar
    },
    onLoad() {
      uni.hideTabBar()
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
