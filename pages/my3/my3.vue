<template>
	<view class="con">
		<mynav :text="text"></mynav>
		<tabbar3 :state="state"></tabbar3>
		<view class="app-set">
			<image src="../../static/identities.png" mode="" @click="change"></image>
		</view>
		<view class="my-box">
			<view class="left-in">
				<image :src="useravatar" mode="" class="avatar"></image>
				<view class="my-info">
					<p class="name">{{username}}</p>
					<p class="keep-day">坚持记账的{{daycount}}天</p>
				</view>
			</view>
			<view class="gosetting" @click="goSetting">
				<image src="../../static/my3/IntoSetting.png" mode="" class="setting3"></image>
			</view>
		</view>
		<view class="biggest">
			<view class="p-text">
				<p class="title-text">我的数据</p>
			</view>

			<view class="my-items">
				<view class="my-item">
					<p class="number">{{daycount}}</p>
					<p class="kind">记账天数</p>
				</view>
				<view class="my-item">
					<p class="number">{{billsCount}}</p>
					<p class="kind">记账笔数</p>
				</view>
				<view class="my-item">
					<p class="number">{{outtotal}}</p>
					<p class="kind">今月消费</p>
				</view>
				<view class="my-item">
					<p class="number">{{incometotal}}</p>
					<p class="kind">今月收入</p>
				</view>
			</view>
		</view>
    <monthbudget></monthbudget>
    <image src="../../static/bg.png" mode="" class="bg" @click="goManual_entry"></image>
		<view class="more-box">
			<view class="zhidao" @click="toanalysis">
				<view class="icon-text">
					<image src="../../static/export.png" mode=""></image>
					<p class="more-text">消费指导</p>
				</view>
				<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
			</view>
			<view class="zhidao" @click="toexportdata">
				<view class="icon-text">
					<image src="../../static/summary.png" mode=""></image>
					<p class="more-text">导出数据</p>
				</view>
				<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
			</view>
			<view class="zhidao" @click="toaccountset">
				<view class="icon-text">
					<image src="../../static/Personal-data.png" mode=""></image>
					<p class="more-text">个人资料</p>
				</view>
				<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
			</view>
			<view class="zhidao" @click="toquestion">
				<view class="icon-text">
					<image src="../../static/issue.png" mode=""></image>
					<p class="more-text">常见问题</p>
				</view>
				<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
			</view>
			<view class="zhidao" @click="tocontactus">
				<view class="icon-text">
					<image src="../../static/contact.png" mode=""></image>
					<p class="more-text">联系我们</p>
				</view>
				<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
			</view>
      <view class="zhidao" @click="toconcern">
      	<view class="icon-text">
      		<image src="../../static/habit.png" mode=""></image>
      		<p class="more-text">关于我们</p>
      	</view>
      	<image class="gotoNext" src="../../static/my3/IntoSetting.png"></image>
      </view>
		</view>
		<view class="model-box" :style="{'top':top+'rpx'}">

		</view>
		<view class="model" :style="{'bottom':bottom +'rpx'}">
			<view class="model-head">
				<p>切换模式</p>
				<image src="../../static/close.png" mode="" @click="close"></image>
			</view>
			<view class="model-item" v-for="(item,index) in modelitem" :key="item.id" @click="changeitem(index)">
				<view class="item-text">
					<p>{{item.text}}</p>
					<p v-show="move===index">(当前模块)</p>
				</view>
				<view class="choise-box" :class="move===index?'move':''">
					<image src="../../static/true.png" mode="" v-show="move===index"></image>
				</view>
			</view>
			<view class="sure" @click="sure">
				确定
			</view>
		</view>
		<view class="set-budget" :style="{'bottom':bottom2+'rpx'}">
			<view class="model-head">
				<p>预算设定</p>
				<image src="../../static/close.png" mode="" @click="close2"></image>
			</view>
			<view class="input-budget">
				<input type="text" placeholder="请输入预算金额">
			</view>
			<view class="sure" @click="sure2">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import tabbar3 from '../../components/tabbar3/tabbar3.vue'
	import mynav from '../../components/mynav/mynav.vue'
	// import { mapState } from 'vuex'
	export default {
		data() {
			return {
				state: '5',
				bottom: -750,
				top: 2000,
				text: '我的',
				bottom2: -750,
				current: 0,
				move: 0,
				daycount: 0,
				outtotal: 0,
				incometotal: 0,
				billsCount: 0,
				monthbudget: 0,
				monthout: 0,
				mode: 2,
				useravatar: uni.getStorageSync('userheadAvrUrl'),
				username: uni.getStorageSync('username'),
				modelitem: [{
						id: '1',
						text: '中年模式'
					},
					{
						id: '2',
						text: '青年模式'
					},
					{
						id: '3',
						text: '老年模式'
					}
				]
			}
		},
		components: {
			tabbar3,
			mynav
		},
		onShow() {
			this.getuserinfo()
			this.getcurrentdate()
			this.getmonoutdetails()
			this.getmonindetails()
		},
		beforeCreate() {
			uni.hideTabBar()
		},
		// computed:{
		//   ...mapState('userdata',['username']),
		//   ...mapState('userdata',['userheadAvrUrl']),
		// },
		methods: {
			toexportdata() {
				uni.navigateTo({
					url: '/pages/export-data/export-data'
				})
			},
			// 获取用户信息
			async getuserinfo() {
				await this.request({
					url: `/xlzb/getUserInfo/${uni.getStorageSync('userId')}`,
					method: 'GET'
				}).then(res => {
					if (res.code === "200") {
						this.daycount = res.data.billsCount
						// 记账天数
						uni.setStorageSync('userdaycount', this.daycount)
						// 记账笔数
						this.billsCount = res.data.billsCount
						uni.setStorageSync('userbillsCount', this.billsCount)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取当前月份和月份
			getcurrentdate() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				month = month < 10 ? '0' + month : month
				this.currentmonth = year + '-' + month + '-01'
			},
			// 获取前月份消费情况
			async getmonoutdetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.currentmonth],
						"isIncome": false
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("----", res)
						let outnum = 0
						for (var i = 0; i < res.data.length; i++) {
							outnum = outnum + res.data[i].expenses_total
						}
						this.outtotal = outnum.toFixed(2)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取当前月份收入情况
			async getmonindetails() {
				await this.request({
					url: '/xlzb/getUserBillsDetails',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"date": [this.currentmonth],
						"isIncome": true
					}
				}).then(res => {
					if (res.code === "200") {
						console.log("----", res)
						let intnum = 0
						for (var i = 0; i < res.data.length; i++) {
							intnum = intnum + res.data[i].income_total
						}
						this.incometotal = intnum.toFixed(2)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			async changemode() {
				console.log("change")
				await this.request({
					url: '/xlzb/updateUser',
					method: 'POST',
					data: {
						"user_id": uni.getStorageSync('userId'),
						"mode": this.mode
					}
				}).then(res => {
					if (res.code === "200") {
						uni.setStorageSync('usermode', this.mode)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			change() {
				// 判断现在是哪个模式(0,1,2)分别表示三个模式，作为初始值
				this.move = 2

				this.bottom = 0
				this.top = 0
			},
			changeitem(index) {
				this.move = index
				this.mode = index
			},
			close() {
				this.bottom = -750
				this.top = 2000
			},
			close2() {
				this.top = 2000
				this.bottom2 = -750
			},
			setbudget() {
				this.bottom2 = 0
				this.top = 0
			},
			tocontactus() {
				uni.navigateTo({
					url: '/pages/contactus/contactus'
				})
			},
			toquestion() {
				uni.navigateTo({
					url: '/pages/Frequently-questions/Frequently-questions'
				})
			},
      toconcern() {
        uni.navigateTo({
          url:'/pages/concerning/concerning'
        })
      },
			toaccountset() {
				uni.navigateTo({
					url: '/pages/account-setting/account-setting'
				})
			},
			toanalysis() {
				uni.navigateTo({
					url: '/pages/consumption-analysis/consumption-analysis'
				})
			},
			sure() {
				this.bottom = -750
				this.top = 2000
				if (this.move == 0) {
					uni.redirectTo({
						url: '/pages/index2/index2'
					})
					this.changemode()
				}
				if (this.move == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
					this.changemode()
				}
				if (this.move == 2) {
					uni.redirectTo({
						url: '/pages/index3/index3'
					})
					this.changemode()
				}
			},
			sure2() {
				this.bottom2 = -750
				this.top = 2000
			},
      // 去手动录入页面
      goManual_entry() {
        uni.navigateTo({
          url: '/pages/manual-entry/manual-entry'
        })
      },
			goSetting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
		}
	}
</script>

<style scoped>
	.con {
		width: 750rpx;
		height: 1500rpx;
		background: linear-gradient(180deg, rgba(121, 241, 218, 0.4), rgba(255, 255, 255, 0));
		background-repeat: no-repeat;
		background-size: 750rpx 400rpx;

	}


	.app-set {
		padding: 5rpx 30rpx;
		align-items: center;
		justify-content: flex-end;
		display: flex;
	}

	.app-set image {
		width: 55rpx;
		height: 55rpx;
		margin-left: 30rpx;
	}

	.my-box {
		padding: 20rpx 40rpx 0rpx 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		justify-items: center;
	}

	.avatar {
		border-radius: 50%;
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.name {
		color: rgba(18, 24, 54, 1);
		font-size: 45rpx;
		font-weight: 700;
		margin-bottom: 5rpx;
	}

	.keep-day {
		color: rgba(170, 176, 186, 1);
		font-size: 35rpx;
		font-weight: 600;
	}

	.my-items {
		width: 650rpx;
		height: 200rpx;
		margin: 25rpx 0 0 40rpx;
		display: flex;
		justify-content: space-around;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		align-items: center;
	}

	.my-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.number {
		font-weight: 700;
		font-size: 45rpx;
	}

	.kind {
		color: rgba(153, 153, 153, 1);
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 4rpx;
	}


	.model-box {
		position: fixed;
		transition: all 0.6s;
		top: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		background-color: rgba(51, 51, 51, 1);
	}

	.model {
		opacity: 1;
		position: fixed;
		padding: 30rpx 50rpx;
		transition: all 0.6s;
		z-index: 1000;
		width: 650rpx;
		height: 580rpx;
		bottom: 0rpx;
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
	}

	.model-head {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}

	.model-head image {
		width: 61rpx;
		height: 61rpx;
	}

	.model-head p {
		margin-left: 260rpx;
		font-size: 36rpx;
	}

	.item-text {
		display: flex;
	}

	.item-text p:nth-child(2) {
		margin-left: 15rpx;
	}

	.model-item {
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.choise-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 4rpx solid rgba(59, 206, 177, 1);
	}

	.choise-box image {
		width: 25rpx;
		height: 25rpx;
	}

	.move {
		background-color: rgba(59, 206, 177, 1);
	}
  .bg {
    margin: 20rpx auto;
    width: 731rpx;
    height: 217rpx;
  }

	.set-budget {
		background-color: #fff;
		height: 415rpx;
		position: fixed;
		transition: all 0.6s;
		z-index: 100;
		width: 650rpx;
		bottom: 0;
		padding: 30rpx 50rpx;
		border-radius: 40rpx 40rpx 0 0;
	}

	.items-one {
		width: 630rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.item-two {
		width: 630rpx;
		display: flex;
		align-items: center;
	}

	.item-two .function-item {
		margin-left: 10rpx;
		margin-right: 45rpx;
	}

	.sure {
		margin: 40rpx auto;
		color: #fff;
		width: 618rpx;
		height: 85rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 60rpx;
		background-color: rgba(59, 206, 177, 1);
	}

	.input-budget {
		margin-top: 100rpx;
		height: 60rpx;
		margin-bottom: 80rpx;
		border-bottom: 2rpx solid rgba(166, 166, 166, 1);
	}

	.input-budget input {
		padding-left: 10rpx;
	}

	.setting3 {
		width: 45rpx;
		height: 45rpx;
		margin-left: 173rpx;
	}

	.biggest {
		width: 730rpx;
		height: 360rpx;
		background: url("../../static/my3/color.png");
		background-repeat: no-repeat;
		background-size: 730rpx 370rpx;
		margin-left: 10rpx;
		border-radius: 20rpx;
		margin-top: 40rpx;

	}

	.p-text {
		/* width: 690rpx; */
		display: flex;
		justify-content: flex-start;

		margin-left: 60rpx;

	}

	.title-text {
		font-size: 43rpx;
		font-weight: 600;
		margin-top: 50rpx;
	}

	.zhidao {
		width: 620rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
	}

	.icon-text {
		display: flex;

	}

	.gotoNext {
		width: 45rpx;
		height: 45rpx;
	}

	.more-box {
		width: 640rpx;
		height: 603rpx;
		opacity: 1;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.3);
		padding: 30rpx 20rpx;
		margin-left: 35rpx;
    padding-bottom: 250rpx;
	}

	.icon-text image {
		width: 50rpx;
		height: 50rpx;
	}

	.more-text {
		font-size: 40rpx;
		font-family: "Alibaba_bold";
		margin-left: 15rpx;
	}
	.left-in {
		display: flex;
		align-items: center;
		
	}
</style>