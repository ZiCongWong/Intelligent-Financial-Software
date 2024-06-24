<template>
	<view class="content">
		<view class="main">
			<view class="register">
				<image class="register-back" src="../../static/login-register/back.png" mode="" @click="backToregister">
				</image>
				<p class="title">获取验证码</p>
			</view>
			<view class="icon">
				<image class="logo" src="../../static/login-register/phone.png"></image>
			</view>
			<view class="text-box">
				<view class="login-text">
					<p class="black">请输入验证码</p>
				</view>
			</view>
			<view class="send-box">
				<p class="location">已发送至+86</p>
				<p class="phone-number">{{phonenumber}}</p>
			</view>
			<view class="certificate-box">
				<certificate :usercode="usercode"></certificate>
			</view>
		</view>

	</view>
</template>

<script>
	import certificate from '../../components/certificate/certificate.vue'
	export default {
		components: {
			certificate,
		},
		data() {
			return {
        usercode:''
			}
		},
    created() {
      this.getcode()
    },
		methods: {
			backToregister(){
				uni.navigateBack({
					delta:1
				})
			},
      // 获取手机验证码
      async getcode() {
        await this.request({
        url:`/xlzb/sendSMS/${uni.getStorageSync('userphone')}`,
        method:'GET'
        }).then(res=> {
          if(res.code === "200" ) {
            // uni.navigateTo({
            //   url:'/pages/login/login'
            // })
            // console.log("___________",res.data)
            this.usercode = res.data
            console.log("usercode",this.usercode)
          } 
        }).catch(err => {
          console.log(err)
        })
      }
		},
    computed: {
      // 处理手机号码为198******38
      phonenumber() {
        var phonenumber = '"' +uni.getStorageSync('userphone') + '"'
        console.log(phonenumber)
        var prenumber = phonenumber.slice(1,4)
        var lastnumber = phonenumber.slice(-3,-1)
        console.log(prenumber)
        console.log(lastnumber)
        return prenumber + "********" + lastnumber
      }
    }
	}
</script>

<style>
	.content {
		background-color: rgba(255, 255, 255, 1);
		width: 750rpx;
		height: 2000rpx;
		
	}

	.main {
		padding: 48rpx 0 48rpx 0;
		height: 400rpx;
		background: linear-gradient(180deg, rgba(59, 206, 177, 0.4),rgba(255, 255, 255, 1));
		background-repeat:no-repeat;
		 background-size:750rpx 400rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;
		align-items: center;
		margin-left: 48rpx;
	}

	.title {
		margin-left: 220rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}

	.register-back {
		width: 19rpx;
		height: 34rpx;
	}

	.icon {
		display: flex;
		justify-content: center;
		margin-top: 80rpx;
	}

	.logo {
		width: 150rpx;
		height: 150rpx;
	}

	.text-box {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
	}

	.black {
		font-size: 40rpx;
		color: rgba(34, 37, 44, 1);
		font-family: "Alibaba_Medium";
	}

	.certificate-box {
		display: flex;
		justify-content: center;
	}

	.send-box {
		display: flex;
		justify-content: center;
		margin: 20rpx 0 45rpx 0;
	}

	.location {
		font-size: 30rpx;
		color: rgba(112, 112, 112, 1);

	}

	.phone-number {
		font-size: 30rpx;
		color: rgba(34, 37, 44, 1);
		margin-left: 10rpx;
		font-family: "Alibaba_Medium";
	}
</style>
