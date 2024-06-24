<template>
	<view class="con">
		<view class="topbar">
			<image class="register-back" src="../../static/log-res-back.png" mode="" @click="backtoMy">
			</image>
			<p class="title">绑定邮箱</p>
		</view>
		<view class="input-box">
			<view class="input-little1">
				<image src="../../static/set-phone.png" mode=""></image>
				<input type="number" placeholder="邮箱号" v-model="email">
			</view>
			<!-- <view class="input-little2">
				<view class="input-in-little1">
					<image src="../../static/code.png" mode=""></image>
				<input type="number" placeholder="输入验证码" v-model="code">
				</view>
				<view class="get">
					<view @click="getcode" v-show="ok == 0">获取验证码</view>
					<view v-show="ok == 1">{{countTime}}</view>
				</view>
			</view> -->
			<!-- <view class="input-little3">
				<view class="input-in-little2">
					<image src="../../static/password.png" mode=""></image>
				<input type="safe-password" password placeholder="密码" v-model="password">
				</view>
				<image src="" mode=""></image>
			</view> -->
			<view class="tips">
				绑定的邮箱可用来导出数据
			</view>
		</view>
		<view class="binding" @click="bind">
			绑定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
        code:'',
        password:'',
        usercode:'',
        get:false,
        ok:0,
        countTime:60,
			}
		},
		methods: {
			backtoMy() {
        uni.navigateBack({
          delta:1
        })
      },
      // 获取手机验证码
      async getcode() {
        //正则表达式定义邮箱正确格式
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(this.email == '') {
          uni.showModal({
            content:'请输入邮箱'
          })
        }
        else if(!reg.test(this.email)) {
          uni.showModal({
            content:'请输入正确的邮箱'
          })
        }else {
          this.ok = 1
          var Timer = setInterval(() => {
            this.countTime--
            if (this.countTime <= 0) {
              clearInterval(Timer)
              this.ok = 0
              this.countTime = 60
            }
          }, 1000)
        }
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
      },
      // 点击绑定按钮执行该方法
      bind() {
        //正则表达式定义邮箱正确格式
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(this.email == '') {
          uni.showModal({
            content:'请输入邮箱'
          })
        }
        else if(!reg.test(this.email)) {
          uni.showModal({
            content:'请输入正确的邮箱'
          })
        }
        else {
          this.modifyemail()
        }
      },
      async modifyemail() {
        await this.request({
        url:`/xlzb/updateUser`,
        method:'POST',
        data: {
          "user_id":uni.getStorageSync('userId'),
          "mail":this.email
        }
        }).then(res=> {
          if(res.code === "200") {
            uni.setStorageSync("useremail",this.email)
            uni.showToast({
              title:'绑定成功'
            })
            
            // var timer = setInterval(()=> {
            //   uni.navigateTo({
            //     url:'/pages/account-setting/account-setting'
            //   })
            //   clearInterval(timer)
            // },1500)
            
          }
        }).catch(err => {
          console.log(err)
        })
      },
		}
	}
</script>

<style>
.con {
		width: 750rpx;
		background-color: rgb(255, 247, 226);
		display: flex;
		flex-direction: column;
		align-items: center;
		/* height: 2000rpx; */
    height: 100vh;
		opacity: 1;
		background: linear-gradient(180deg, rgba(189, 242, 232, 1) 0%, rgba(59, 206, 177, 1) 100%);
	}
	
	.register-back {
		width: 50rpx;
		height: 50rpx;
	}
	
	.topbar {
		display: flex;
		justify-content: flex-start;
		margin-top: 65rpx;
		width: 690rpx;
		margin-top: 70rpx;
	}
	
	.title {
		margin-left: 220rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}
	.input-box {
		width: 530rpx;
		opacity: 1;
		border-radius: 40rpx;
		background: rgba(255, 255, 255, 1);
		padding: 80rpx;
		margin-top: 110rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.input-little1 {
		display: flex;
		justify-content: flex-start;
    align-items: center;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);   
		width: 517rpx;
		height: 80rpx;
	}
  .input-little1 image {
    margin-right: 20rpx;
  }
  .input-little1 input {
    width: 500rpx;
  }
	.input-little2 {
		display: flex;
    align-items: center;
		justify-content: space-between;
		width: 517rpx;
		height: 80rpx;
	}
	.input-in-little1 {
		display: flex;
    align-items: center;
		justify-content: flex-start;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);
		width: 320rpx;
		height: 80rpx;
	}
  .input-in-little1 image {
    margin-right: 20rpx;
  }
	.get {
		width: 188rpx;
		height: 74rpx;
		border-radius: 10rpx;
		background: rgba(59, 206, 177, 1);
		line-height: 74rpx;
		text-align: center;
		color: rgba(255, 255, 255, 1);
	}
	.input-in-little2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 320rpx;
		height: 80rpx;
	}
  .input-in-little2 image {
    margin-right: 20rpx;
  }
	.input-little3 {
		display: flex;
    align-items: center;
		justify-content: space-between;
		border-bottom: 3rpx solid rgba(71, 209, 182, 1);   
		width: 517rpx;
		height: 80rpx;
	}
		
	input {
		width: 270rpx;
		height: 80rpx;
		border: none;
	}
	.binding {
		width: 490rpx;
		height: 132rpx;
		opacity: 1;
		border-radius: 90rpx;
		background: rgba(255, 255, 255, 1);
		margin-top: 90rpx;
		line-height: 132rpx;
		text-align: center;
		font-size: 44rpx;
		color: rgba(72, 210, 183, 1);
	}
	image {
		
		width: 45rpx;height: 45rpx;
	}
	.tips {
		color: rgba(71, 209, 182, 1);
		font-size: 24rpx;
		width: 517rpx;
		height: 30rpx;
    margin-top: 60rpx;
		text-align: center;
		line-height: 30rpx;
	}
</style>
