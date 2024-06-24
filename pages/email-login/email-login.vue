<template>
  <view class="con">
    <view class="main">
      <view class="register">
        <view class="register-text" @click="tobindingemail">
          去绑定邮箱
        </view>
      </view>
      <view class="icon">
        <image class="logo" src="../../static/login-register/icon.png" mode=""></image>
      </view>
      <view class="text-box">
        <view class="login-text">
          <p class="black">登录</p>
        </view>
        <view class="name">
          <p class="green">小绿</p>
          <p class="black">账本</p>
        </view>
      </view>
      <view class="form">
        <view class="item" :class="'login_user ' + nameFocus">
          <input type="text" class="input-ui u-border" placeholder="请输入手机号" v-model="phone" />
          <view class="showPwd" @click="cleartext">
            <image class="text-icon-1" src="../../static/login-register/2.png"></image>

          </view>
        </view>
        <view class="item" :class="'login_pwd ' + psdFocus">
          <input type="text" class="input-ui u-border" placeholder="请输入密码" :type="type == 'password' ? 'text' : type"
            :password="!showPassword" v-model="password" />
          <view class="showPwd">
            <image class="text-icon-2"
              :src="showPassword ? '../../static/login-register/4.png' : '../../static/login-register/3.png'"
              @tap="showPassword = !showPassword"></image>
          </view>
        </view>
      </view>
      <view class="botton-ui" @click="login">
        <p class="denglu">登录</p>
      </view>
      <view class="center-box">
        <view class="forget-box" @click="goForget()">
          <p class="forget">忘记密码</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        name: "",
        nameFocus: '',
        password: '',
        phone: '',
        psd: "",
        psdFocus: '',
        showPassword: false,
        flag: 0,
        mode: 0,
        userid: '',
      }
    },
    onLaunch() {
      if (flag === 0) {
        uni.reLaunch({
          url: "/pages/index/index"
        })
      }
    },
    beforeMount() {
      this.getuserinfo()
    },
    methods: {
      
      // 获取用户信息
      async getuserinfo() {
        await this.request({
          url: `/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
          method: 'GET'
        }).then(res => {
          if (res.code === "200") {
            this.userid = res.data.userId
            this.mode = res.data.mode
            uni.setStorageSync('usermode', res.data.mode)
            console.log("用户ID", this.userid)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 邮箱登陆
      async emaillogin() {
        var haveemail = uni.getStorageSync('haveemail')
        if(haveemail !=1) {
          uni.showModal({
            content:'请先绑定邮箱'
          })
        }else {
          this.email()
        }
      },
      async email() {
        await this.request({
          url: `/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
          method: 'GET'
        }).then(res => {
          if (res.code === "200") {
            this.userid = res.data.userId
            this.mode = res.data.mode
            uni.setStorageSync('usermode', res.data.mode)
            console.log("用户ID", this.userid)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      goForget() {
        uni.navigateTo({
          url: '/pages/forget-id/forget-id'
        })
      },
      cleartext() {
        this.phone = ''
      },
      tobindingemail() {
        uni.navigateTo({
          url: '/pages/binding-email/binding-email'
        })
      }
    }
  }
</script>

<style>
  .con {
    background-color: rgba(255, 255, 255, 1);
    width: 750rpx;
    height: 1650rpx;

  }

  .main {
    padding: 48rpx;
    height: 400rpx;
    background: linear-gradient(180deg, rgba(59, 206, 177, 0.4), rgba(255, 255, 255, 1));
    background-repeat: no-repeat;
    background-size: 750rpx 500rpx;
  }

  .register {
    display: flex;
    justify-content: flex-end;
    margin-top: 50rpx;

  }

  .register-text {
    font-size: 30rpx;
    color: rgba(34, 37, 44, 1);
    font-family: "Alibaba_Medium";
  }

  .icon {
    display: flex;
    justify-content: center;
    margin-top: 40rpx;

  }

  .logo {
    width: 180rpx;
    height: 180rpx;
  }

  .text-box {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;

  }

  .login-text {}

  .name {
    display: flex;
  }

  .green {
    color: rgba(60, 207, 177, 1);
    font-weight: 700;
    font-size: 44rpx;
    margin-left: 15rpx;
  }

  .black {
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    font-size: 44rpx;
  }

  .form {
    margin-top: 80rpx;
  }

  .item {
    position: relative;
    margin-bottom: 42rpx;
  }

  .input-ui {
    background-color: #f8f9ff;
    height: 96rpx;
    padding: 0 40rpx;
    border-radius: 48rpx;
    font-size: 32rpx;
    color: rgba(34, 37, 44, 1);
  }

  input::input-placeholder {
    color: rgba(153, 153, 153, 1);
  }

  .showPwd {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96rpx;
    height: 96rpx;
    margin-right: 20rpx;
  }


  .botton-ui {
    width: 100%;
    display: flex;
    background: rgba(60, 207, 177, 1);
    color: #fff;
    text-align: center;
    border-radius: 48rpx;
    font-size: 32rpx;
    font-family: "Alibaba_bold";
    height: 96rpx;
    box-shadow: 0rpx 8rpx 13rpx 0rpx rgba(106, 147, 199, 0.35);
  }

  .text-icon-1 {
    width: 35rpx;
    height: 35rpx;
  }

  .text-icon-2 {
    width: 42rpx;
    height: 35rpx;
  }

  .denglu {
    margin: auto;

  }

  .tips-box {
    display: flex;
    flex-direction: column;
    width: 670rpx;
    height: 150rpx;

  }

  .tick {
    width: 35rpx;
    height: 35rpx;
    margin-right: 10rpx;
  }

  .tips {

    font-size: 26rpx;
    color: rgba(112, 112, 112, 1);
  }

  .click-1 {
    margin-left: 10rpx;
    font-size: 26rpx;
    color: rgba(60, 207, 177, 1);
  }

  .click-2 {
    margin-left: 10rpx;
    font-size: 26rpx;
    color: rgba(60, 207, 177, 1);
  }

  .all {
    display: flex;
    font-weight: 600;
    flex-wrap: nowrap;
  }

  .padding {
    margin-left: 35rpx;
    margin-top: 5rpx;
  }

  .forget-box {
    width: 120rpx;
    height: 39rpx;

  }

  .forget {
    font-size: 30rpx;
    font-weight: 600;
  }

  .center-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 45rpx;
  }

  .xian {
    width: 219rpx;
    height: 1rpx;
    opacity: 0.4;
    background: rgba(181, 187, 202, 0.5);
    margin: auto;
  }

  .way-login {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .way-text {
    font-size: 28rpx;
    color: rgba(181, 187, 202, 1);
    margin: 20rpx 10rpx 0 10rpx;
    font-weight: 600;
  }

  .way-icon {
    display: flex;
    justify-content: center;
    margin-top: 35rpx;
  }

  .icon-way {
    width: 80rpx;
    height: 80rpx;

  }

  .middle {
    margin: 0 130rpx 0 130rpx;
  }

  .date {
    display: flex;
    justify-content: center;
    margin-top: 55rpx;
  }

  .date-text {
    font-size: 26rpx;
    color: rgba(167, 172, 188, 1);
  }
</style>
