<template>
  <view class="con">
    <view class="main">
      <view class="register">
        <view class="register-text" @click="goRegister">
          点击注册
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
      <!-- <view class="tips-box">

        <view class="all">
          <image class="tick" src="../../static/login-register/1.png" mode=""></image>
          <view class="tips">我已阅读并同意</view>
          <view class="click-1">《小绿账本用户注册协议》</view>
          <view class="click-2">《法律声</view>

        </view>
        <view class="all padding">
          <view class="click-2">
            明及隐私权政策》。
          </view>
          <view class="tips">
            我承诺接受并同意协议中的条款。
          </view>
        </view>
      </view> -->
      <view class="botton-ui" @click="login">
        <p class="denglu">登录</p>
      </view>
      <view class="center-box">
        <view class="forget-box" @click="goForget()">
          <p class="forget">忘记密码</p>
        </view>
      </view>
      <view class="way-login">
        <view class="xian">

        </view>
        <view class="way-text">
          其他登陆方式
        </view>
        <view class="xian">

        </view>
      </view>
      <view class="way-icon">
        <image class="icon-way" src="../../static/login-register/alipay.png" mode="" @click="wait"></image>
        <image class="icon-way middle" src="../../static/login-register/wechat.png" mode="" @click="wait">
        </image>
        <image class="icon-way" src="../../static/login-register/qq.png" mode="" @click="qqlogin"></image>

      </view>
      <!-- <view class="date">
        <p class='date-text'>2023.02.02-17.51.18</p>
      </view> -->
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
        mode:0,
        userid:'',
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
      // 判断进去app
      // inapp() {
      //   let userID = uni.getStorageSync('userId')
      //   if(this.userid == userID) {
      //     console.log(true)
      //     if(this.mode == 0) {
      //       console.log(0)
      //       uni.redirectTo({
      //         url:'/pages/index2/index2'
      //       })
      //     }
      //     if(this.mode == 1) {
      //       console.log(1)
      //       uni.switchTab({
      //         url:'/pages/index/index'
      //       })
      //     }
      //     if(this.mode == 2) {
      //       console.log(2)
      //       uni.redirectTo({
      //         url:'/pages/index3/index3'
      //       })
      //     }
      //   }
      // },
      // 获取用户信息
      async getuserinfo() {
        await this.request({
          url: `/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
          method: 'GET'
        }).then(res => {
          if (res.code === "200") {
            this.userid =  res.data.userId
            this.mode = res.data.mode
            uni.setStorageSync('usermode',res.data.mode)
            console.log("用户ID",this.userid)
          }
        }).catch(err => {
          console.log(err)
        })
        // this.inapp()
      },
      qqlogin() {
        uni.login({
          provider: 'qq',
          // loginRes是authResult
          success: function(loginRes) {
            // uni.setStorageSync('userId',loginRes.openid)
            console.log("登录请求:" + JSON.stringify(loginRes))
            // 登录成功
            uni.getUserInfo({
              provider: 'qq',
              // info是userInfo
              success: function(info) {
                // 获取用户信息成功, info.authResult保存用户信息
                console.log("登录信息:" + JSON.stringify(info))
                 // qq授权成功后,选择用户模式
                uni.setStorageSync('username',info.userInfo.nickname)
                uni.setStorageSync('userheadAvrUrl',info.userInfo.avatarUrl)
                uni.setStorageSync('userId',info.userInfo.openId)
                uni.navigateTo({
                  url:'/pages/change-edition2/change-edition2'
                })
                // this.debug = JSON.stringify(info)
              }
            })
          },
          fail: function(err) {
            // 登录授权失败  
            // err.code是错误码
            // this.debug = JSON.stringify(err)
          }
        });
      },
     
      wait() {
        uni.showModal({
          content:'研发中,敬请期待'
        })
      },
      async login() {
        // let _self = this
        await this.request({
          url: "/xlzb/login",
          method: 'POST',
          data: {
            "phone": this.phone,
            "password": this.password
          }
        }).then(res => {
          if (res.code === '200') {
            // 保存用户头像
            uni.setStorageSync('userheadAvrUrl', res.data.headAvrUrl)
            // 保存用户昵称
            uni.setStorageSync('username', res.data.name)
            // 保存用户id
            // _self.userid = res.data.name
            uni.setStorageSync('userId', res.data.userId)
            // 保存用户手机号码
            uni.setStorageSync('userphone', res.data.phone)
            // 保存用户模式
            uni.setStorageSync('usermode', res.data.mode)
            uni.setStorageSync('useremail',res.data.mail)
            if (res.data.mode == 0) {
              uni.redirectTo({
                url: '/pages/index2/index2'
              })
            }
            if (res.data.mode == 1) {
              uni.switchTab({
                url: '/pages/index/index'
              })
            }
            if (res.data.mode == 2) {
              uni.redirectTo({
                url: '/pages/index3/index3'
              })
            }
          }
		  else if(res.code==='100'){
			  console.log(111)
			  console.log(res.msg)
			  if(res.msg=="账号或密码错误"){
				 uni.showModal({
          content:'账号或密码错误'
			  })
			  }else{
				  uni.showModal({
            content:'账号密码不能为空'
				  }) 
			  }
			  
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
	  cleartext(){
		  this.phone=''
	  },
      goRegister() {
        uni.navigateTo({
          url: '/pages/register/register'
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
