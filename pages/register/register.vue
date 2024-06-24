<template>
	<view class="con">
		<view class="main">
			<view class="register">
				<image class="register-back" src="../../static/login-register/back.png" mode="" @click="backTologin"></image>
			</view>
			<view class="icon">
				<image class="logo" src="../../static/login-register/icon.png" mode=""></image>
			</view>
			<view class="text-box">
				<view class="login-text">
					<p class="black">注册</p>
				</view>
				<view class="name">
					<p class="green">小绿</p>
					<p class="black">账号</p>
				</view>
			</view>
			<view class="form">
				<view class="item" :class="'login_user ' + nameFocus">
          <input type="text" class="input-ui u-border" placeholder="请输入昵称" v-model="name">
					<input type="text" class="input-ui u-border" placeholder="请输入注册的手机号" v-model.number="phone"/>
					<!-- <view class="showPwd">
						<image class="text-icon-1" src="../../static/login-register/2.png"></image>

					</view> -->
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
			<view class="botton-ui" @click="goCertificate(phone)">
				<p class="denglu">获取短信验证码</p>
			</view>
      <uni-popup ref="popup" type="bottom" class='popup' background-color="" :mask-click="true">
      	<view class="pop">
      		<view class="text-pop">
      			<p class="popup-title">提示</p>
      			<p class="popup-tips">{{tip}}</p>
      		</view>
      
      		<view class="bt-box">
      			<view class="bt"  @click="close()">取消</view>
      			<view class="separated"></view>
      			<view class="bt-green"  @click="close()">确定</view>
      		</view>
      	</view>
      </uni-popup>
		</view>
	</view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				name: "",
				nameFocus: '',
				psd: "",
        tip:'',
				psdFocus: '',
        phone:'',
				showPassword: false,
			}
		},
		methods: {
      open() {
      	this.$refs.popup.open('center');
      },
      close() {
      	this.$refs.popup.close()
      },
      // 去获取验证码页面获取验证码
      goCertificate() {
        //正则表达式定义手机号正确格式
        let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
        // 如果没有输入手机号或者昵称
        if(this.name == '' || this.phone == '') {
          this.tip = '请完善信息',
          this.open()
          // 手机号码不对
        }else if (!reg.test(this.phone)) {
          this.tip = '请检查手机号码是否正确'
          this.open()
        }
        else {
          uni.setStorageSync('username',this.name)
          uni.setStorageSync('userphone',this.phone)
          uni.navigateTo({
            url:'/pages/get-certified/get-certified'
          })
        }
        
      },	
			backTologin(){
				uni.navigateBack({
					delta:1
				})
			}
		},
    computed:{
      ...mapState('userdata',['userphone'])
    },
	}
</script>

<style>
	.con {
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		height: 2000rpx;
		
	}

	.main {
		padding: 48rpx;
		height: 400rpx;
		background: linear-gradient(180deg, rgba(59, 206, 177, 0.4),rgba(255, 255, 255, 1));
		background-repeat:no-repeat;
		 background-size:750rpx 400rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;

	}

	.register-back {
		width: 19rpx;
		height: 34rpx;
	}

	.icon {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;

	}

	.logo {
		width: 150rpx;
		height: 150rpx;
	}

	.text-box {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;

	}


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
    margin-bottom: 20rpx;
		color: rgba(34, 37, 44, 1);
	}
	
	input::input-placeholder{
	  color:rgba(153, 153, 153, 1);
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
		font-weight: 600;
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
		width: 115rpx;
		height: 39rpx;
	}

	.forget {
		font-size: 28rpx;

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
		justify-content: center;
		margin-top: 250rpx;
	}

	.way-text {
		font-size: 26rpx;
		color: rgba(181, 187, 202, 1);
		margin: 0 10rpx 0 10rpx;
	}
	.way-icon {
		display: flex;
		justify-content: center;
		margin-top: 35rpx;
	}
	.icon-way {
		width: 70rpx;
		height: 70rpx;
		
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
  .bt-box {
  	height: 90rpx;
  	display: flex;
  	text-align: center;
  	position: absolute;
  	bottom: 0;
  }
  
  .bt {
  	width: 344rpx;
  	color: rgba(51, 51, 51, 1);
  	font-size: 36rpx;
  	font-family: "Alibaba_Medium";
  }
  
  .bt-green {
  	width: 344rpx;
  	color: rgba(60, 207, 177, 1);
  	font-size: 36rpx;
  	font-family: "Alibaba_Medium";
  }
  
  .popup-p {
  	border-radius: 30rpx;
  }
  
  .pop {
  	border-radius: 30rpx;
  	background-color: rgba(255, 255, 255, 1);
  	width: 690rpx;
  	height: 312rpx;
  }
  
  .separated {
  	width: 2rpx;
  	height: 34.05rpx;
  	background-color: rgba(175, 175, 175, 1.0);
  	margin-top: 10rpx;
  }
  
  .text-pop {
  	height: 206rpx;
  	padding: 36rpx 50rpx;
  }
  
  .popup-title {
  	color: rgba(51, 51, 51, 1);
  	font-size: 36rpx;
    text-align: center;
  	font-family: "Alibaba_Medium";
  	margin-bottom: 32rpx;
  }
  
  .popup-tips {
  	color: rgba(51, 51, 51, 1);
  	font-size: 30rpx;
    text-align: center;
  	font-family: "Alibaba_Medium";
  }
</style>
