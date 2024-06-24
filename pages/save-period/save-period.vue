<template>
	<view class="con">
		<view class="main">
			<view class="register">
				<image class="register-back" src="../../static/login-register/back.png" mode=""
					@click="backTocertificate"></image>
				<p class="title">周期设置</p>
			</view>
			<view class="big-box">
				<view class="select-box">
					<view :class="{shouru1:!Inv,shouru2:Inv}" @click="Inv=false">
						<p class="text-shouzhi">支出</p>
					</view>
					<view :class="{zhichu1:Inv,zhichu2:!Inv}" @click="Inv=true">
						<p class="text-shouzhi">收入</p>
					</view>
				</view>
				<view class="out" v-show="Inv==0">
					<view class="type">
						<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
						<p class="text">消费类型</p>
						<view class="chose-type" @click="choseMonth">
							<image :src="img" mode="" class="type-picture"></image>
							<p class="text-type">
								{{text}}
							</p>
						</view>

					</view>
					<hr class="ms">
					<view class="date">
						<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
						<p class="text-date">每月记录日期</p>
						<uni-datetime-picker type="date" :clear-icon="false"   />
					</view>
					<hr class="ms">
					<view class="money">
						<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
						<p class="text">消费金额</p>
						<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" @input="input"
							maxlength="15" :inputBorder='false'></uni-easyinput>
					</view>
					<hr class="ms">
					<view class="seller">
						<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
						<p class="text">消费店家</p>
						<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入消费店家" type="text" @input="input"
							:inputBorder='false'></uni-easyinput>
					</view>
					<hr class="ms">

					<view class="button" @click="submit()">
						<view class="bt">保存</view>
					</view>
				</view>
				<view class="in" v-show="Inv==1">
					<view class="type">
						<image src="../../static/manual-entry/note.png.png (5).png" mode=""></image>
						<p class="text">收入类型</p>
						<image :src="require('../../static/manual-entry/6.png')" mode="" class="type-picture">
						</image>
						<p class='text-shouru'>收入</p>
					</view>
					<hr class="ms">
					<view class="date">
						<image src="../../static/manual-entry/note.png.png (4).png" mode=""></image>
						<p class="text-date">收入日期</p>
						<uni-datetime-picker type="date" :clear-icon="false"   />
					</view>
					<hr class="ms">
					<view class="money">
						<image src="../../static/manual-entry/note.png.png (3).png" mode=""></image>
						<p class="text">收入金额</p>
						<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入金额(单位元)" type="number" @input="input"
							maxlength="15" :inputBorder='false'></uni-easyinput>
					</view>
					<hr class="ms">
					<view class="seller">
						<image src="../../static/manual-entry/note.png.png (1).png" mode=""></image>
						<p class="text">收入来源</p>
						<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入来源" type="text" @input="input"
							:inputBorder='false'></uni-easyinput>
					</view>
					<hr class="ms">

					<view class="button" @click="submit()">
						<view class="bt">保存</view>
					</view>
				</view>
			</view>
		</view>
		<view class="model-box" :style="{'top':top+'rpx'}"></view>
		<view class="chose" :style="{'bottom':bottom+'rpx'}">
			<view class="model-head">
				<p>选择类型</p>
				<image src="../../static/close.png" mode="" @click="close"></image>
			</view>

			<!-- <view class="time">
				<picker-view   :value="value" @change="bindChange()" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in types" :key="index">
							<image :src="item.icon" mode=""></image>
							<p class="little">{{item.text}}</p>
						</view>

					</picker-view-column>
					
				</picker-view>
			</view> -->
      <view class="time">
        <picker-view  :value="value" @change="bindChange" class="picker-view">
          <picker-view-column>
            <view class="item" v-for="(item,index) in types" :key="index">
            	<image :src="item.icon" mode=""></image>
            	<p class="little">{{item.text}}</p>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
			<view class="sure" @click="sure(top,bottom)">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 2000,
				bottom: -750,
				Inv: false,
				src: '0.png',
				flag: 0,
				img: '../../static/manual-entry/01.png',
				text: '餐饮',
				value: [0],
        number:'',
				types: [{
					icon: '../../static/manual-entry/01.png',
					text: '餐饮'
				}, {
					icon: '../../static/manual-entry/04.png',

					text: '出行'
				}, {
					icon: '../../static/manual-entry/06.png',

					text: '娱乐'
				}, {
					icon: '../../static/manual-entry/02.png',

					text: '学习'
				}, {
					icon: '../../static/manual-entry/03.png',

					text: '其它'
				}, ],
			}
		},
		methods: {
			choseMonth() {
				this.top = 0
				this.bottom = 0
			},
			close() {
				this.top = 2000
				this.bottom = -750
			},
			sure() {
				this.top = 2000
				this.bottom = -750
				this.img = this.number.icon
				this.text = this.number.text
				
			},
			bindChange: function(e) {
        
			  const val = e.detail.value
        // this.year = this.years[val[0]]
        this.number = this.types[val[0]]
        
			},
		}
	}
</script>

<style>
	.con {
		background-color: rgba(255, 255, 255, 1);
		/* width: 750rpx; */
		height: 2000rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main {
		padding: 48rpx;
		height: 400rpx;
		background: linear-gradient(180deg, rgba(59, 206, 177, 0.4), rgba(255, 255, 255, 1));
		background-repeat: no-repeat;
		background-size: 100% 400rpx;
	}

	.register {
		display: flex;
		justify-content: flex-start;
		margin-top: 50rpx;

	}

	.title {
		margin-left: 245rpx;
		font-size: 36rpx;
		font-family: "Alibaba_Medium";
	}


	.register-back {
		width: 19rpx;
		height: 34rpx;
	}

	.big-box {
		width: 590rpx;
		height: 850rpx;
		opacity: 1;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 6rpx 20rpx 4rpx rgba(219, 219, 219, 0.3);
		padding: 50rpx 30rpx 50rpx 30rpx;
		margin-top: 63rpx;
	}

	.select-box {
		width: 253rpx;
		height: 86rpx;
		border-radius: 90rpx;
		background: rgba(236, 239, 245, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.shouru1,
	.zhichu1 {
		width: 115rpx;
		height: 65rpx;
		border-radius: 90rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		align-items: center;


	}

	.shouru2,
	.zhichu2 {
		width: 115rpx;
		height: 65rpx;
		border-radius: 90rpx;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.text-shouzhi {
		font-size: 32rpx;
		font-weight: 600;
	}

	.type,
	.date,
	.money,
	.seller,
	.upload-left,
	.tips {
		display: flex;
		font-size: 32rpx;
		height: 38rpx;
		line-height: 45rpx;
	}

	.chose-type {
		display: flex;
	}

	.type {
		margin-top: 70rpx;
	}

	.tips {
		display: flex;
		justify-content: space-between;
	}

	.date,
	.money,
	.seller,
	.upload,
	.tips
	{
		margin-top: 45rpx;
	}

.button {
	margin-top: 100rpx;
}
	.click {
		font-size: 38rpx;
		font-family: "Alibaba_Extra_bold";
	}

	.hengxian {
		height: 6rpx;
		background-color: #3BCEB1;
		margin: 15rpx 15rpx;
	}

	hr {
		background-color: #ffffff;
		border: 1rpx solid #f3f3f3;
		margin-top: 60rpx;
	}

	.ms {
		margin-left: 55rpx;
		margin-top: 45rpx;
	}

	.type image,
	.date image,
	.money image,
	.seller image,
	.upload image,
	.tips image {
		width: 44rpx;
		height: 44rpx;
	}

	.text {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: 20rpx;
	}

	.text-tips {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: -20rpx;
	}

	.text-date {
		font-size: 34rpx;
		font-family: "Alibaba_Extra_bold";
		margin-left: 20rpx;
		margin-right: 45rpx;
	}

	.text-shouru {
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.type-picture {
		width: 30rpx;
		height: 30rpx;
		margin-left: 45rpx;
	}

	.uni-mt-5 {
		margin-top: -15rpx;
		margin-left: 20rpx;
	}

	.file-picker {
		margin: 40rpx 0 0 60rpx;
	}

	textarea {
		width: 370rpx;
		height: 52rpx;
		margin-left: 30rpx;
		font-size: 26rpx;
		padding: 10rpx 0rpx 0 30rpx;
		border-radius: 90rpx;
		margin-top: -10rpx;

	}

	.edit {
		position: absolute;
		right: 100rpx;
		width: 30rpx;
		height: 30rpx;

	}

	.bt {
		width: 580rpx;
		height: 100rpx;
    margin: 0 auto;
		margin-top: 70rpx;
		background-color: rgba(59, 206, 177, 1);
		color: #ffffff;
		border-radius: 90rpx;
		border-style: none;
		text-align: center;
		text-decoration: none;
		outline: none;
		font-size: 42rpx;
		line-height: 100rpx;
	}

	.text-type {
		font-size: 29rpx;
		margin-left: 20rpx;
		font-family: "Alibaba_bold";
	}

	.text-shouru {
		font-size: 29rpx;
		margin-left: 20rpx;
		font-family: "Alibaba_bold";
	}

	.chose {
		width: 650rpx;
		position: fixed;
		transition: all 0.6s;
		z-index: 99;
		padding: 30rpx 50rpx;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #fff;
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
		color: rgba(51, 51, 51, 1);
		font-weight: 600;
		margin-left: 260rpx;
		font-size: 36rpx;
	}

	.picker-view {
		width: 500rpx;
		height: 200rpx;
		font-weight: 600;
		font-size: 34rpx;
		margin-top: 20rpx;
	}

	.item {
		color: rgba(51, 51, 51, 1);
		display: flex;
		line-height: 50rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.item image {
		width: 40rpx;
		height: 40rpx;
	}
	.little {
		margin-left: 20rpx;
	}

	.time {
		display: flex;
		justify-content: space-around;
	}

	.head-time {
		text-align: center;
		color: rgba(153, 153, 153, 1);
		font-size: 26rpx;
	}

	.this-month {
		display: flex;
		font-weight: 600;
		justify-content: flex-end;
	}

	.this-month p {
		width: 121rpx;
		height: 55rpx;
		text-align: center;
		line-height: 55rpx;
		border-radius: 60rpx;
		font-size: 26rpx;
		color: rgba(59, 206, 177, 1);
		border: 2rpx solid rgba(59, 206, 177, 1);
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
</style>
