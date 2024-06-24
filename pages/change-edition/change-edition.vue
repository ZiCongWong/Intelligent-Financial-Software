<template>
  <view>
    <swiper :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item>
        <view class="change-item-box">
          <view class="change-item-top">
            <image src="../../static/path2.png" mode="" class="path"></image>
            <image src="../../static/ben1.png" mode="widthFix" class="ben"></image>
          </view>
          <view class="body1">
            <view class="title1">
              情绪版：以绚丽设计为主绚丽 轻松 专业
            </view>
            <view class="samll-p1">
              百度翻译提供翻译和网页翻译服务、德等28种热门语言互译，覆盖756个翻译方向。
            </view>
          </view>
          <view class="bot">
            <view class="bot-left" @click="register(0)">
              选定版本
            </view>
            <view class="bot-right">
              <view class="dot active"></view>
              <view class="dot"></view>
              <view class="dot"></view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="change-item-box2">
          <view class="change-item-top">
            <view class="path2">
              
            </view>
            <image src="../../static/ben2.png" mode="widthFix" class="ben2"></image>
          </view>
          <view class="ben2-bot">
            <view class="body">
              <view class="title">
                情绪版：以绚丽设计为主绚丽 轻松 专业
              </view>
              <view class="samll-p">
                百度翻译提供翻译和网页翻译服务、德等28种热门语言互译，覆盖756个翻译方向。
              </view>
            </view>
            <view class="bot">
              <view class="bot-left" @click="register(1)">
                选定版本
              </view>
              <view class="bot-right">
                <view class="dot"></view>
                <view class="dot active"></view>
                <view class="dot"></view>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="change-item-box3">
          <view class="change-item-top">
            <image src="../../static/path1 (1).png" mode="" class="path"></image>
            <image src="../../static/ben3.png" mode="widthFix" class="ben3"></image>
          </view>
          <view class="body">
            <view class="title">
              情绪版：以绚丽设计为主绚丽 轻松 专业
            </view>
            <view class="samll-p">
              百度翻译提供翻译和网页翻译服务、德等28种热门语言互译，覆盖756个翻译方向。
            </view>
          </view>
          <view class="bot">
            <view class="bot-left" @click="register(2)">
              选定版本
            </view>
            <view class="bot-right">
              <view class="dot"></view>
              <view class="dot"></view>
              <view class="dot active"></view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    onLoad() {
      console.log(uni.getStorageSync('userpassword'))
    },
    methods: {
      // changeben1() {
      //   uni.switchTab({
      //     url:'/pages/index/index'
      //   })
      // },
      // changeben2() {
      //   uni.redirectTo({
      //     url:'/pages/index2/index2'
      //   })
      // },
      // changeben3() {
      //   uni.redirectTo({
      //     url:'/pages/index3/index3'
      //   })
      // },
      async register(version) {
        await this.request({
        url:'/xlzb/register',
        method:'POST',
        data: {
          "name":uni.getStorageSync('username'),
          "phone":uni.getStorageSync('userphone'),
          "password":uni.getStorageSync('userpassword') ,
          "mode":version
        }
        }).then(res=> {
          if(res.code === "200" ) {
            uni.navigateTo({
              url:'/pages/login/login'
            })
            uni.setStorageSync('usermode',version)
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
  swiper {
    height: 100vh;
  }
  .scl-x {
    width: 760rpx;
  }
  .change-item-box {
    background-color: #e9f7f7;
    height: 100vh;
  }
  .change-item-box2,.change-item-box3 {
    background-color: #d0f3ea;
    height: 100vh;
  }
  .change-item-top {
    position: relative;
    overflow: hidden;
  }
.path {
  width: 1000rpx;
  margin-left: -180rpx;
  height: 780rpx;
}
.path2 {
  width: 1000rpx;
  margin-left: -180rpx;
  height: 780rpx;
  background-color: #e9f7f7;
}
.ben,.ben2,.ben3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100rpx;
  width: 570rpx;
  height: 650rpx;
}
.ben {
  top: 50rpx;
}
.ben2 {
  left: 53%;
  top: 0;
}
.ben3 {
  left: 54%;
  top: 35rpx;
}
.body1 {
  width: 450rpx;
  margin: 20rpx auto;
}
.body {
  width: 450rpx;
  margin: 20rpx 80rpx;
}
.ben2-bot .title {
  margin-top: 40rpx;
}
.body1 .title1,.body .title {
  font-size: 40rpx;
  font-weight: 600;
}
.title1 {
  text-align: center;
}
.samll-p1 {
  text-align: center;
}
.body1 .samll-p1,.body .samll-p {
  margin-top: 40rpx;
  font-size: 28rpx;
}
.bot {
  width: 600rpx;
  margin: 100rpx auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bot-left {
  width: 220rpx;
  height: 75rpx;
  text-align: center;
  line-height: 75rpx;
  color: #fff;
  background-color: #4fc8a5;
  border-radius: 40rpx;
}
.bot-right {
  display: flex;
  justify-content: space-between;
  width: 100rpx;
}
.dot {
  width: 20rpx;
  height: 20rpx;
  background-color: #cddcd9;
  border-radius: 50%;
}
.active {
  background-color: #4fc8a5;
}
.ben2-bot {
  background-color: #d0f3ea;
}
</style>
