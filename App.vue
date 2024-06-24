<script>
	export default {
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLaunch: function() {
			let userID = uni.getStorageSync('userId')
			let mode = uni.getStorageSync('usermode')
			console.log('11', userID)
			if (userID != '') {
				console.log(true)
				uni.removeStorageSync('address')
				uni.removeStorageSync('weatherinfo')
				uni.removeStorageSync('iconUrl')
				this.getweather()

				if (mode == 0) {
					console.log(0)
					uni.redirectTo({
						url: '/pages/index2/index2'
					})
				}
				if (mode == 1) {
					console.log(1)
					uni.switchTab({
						url: '/pages/index/index'

					})
				}
				if (mode == 2) {
					console.log(2)
					uni.redirectTo({
						url: '/pages/index3/index3'
					})
				}
			} else {
				console.log("空")
			}
		},
		methods: {

			// 获取天气信息
			getweather() {
				var _self = this
				uni.getLocation({
					type: "wgs84",
					success: function(res) {
						uni.request({
							url: `http://139.9.197.13:8080/xlzb/weather/` + res.longitude + "," + res
								.latitude,
							method: 'GET',
							success: function(res) {
								if (res.data.code !== "200") {} else {
									// this.weather = res.data.data
									// _self.address = res.data.data.address
									// // console.log("地址",_self.address)
									// _self.weatherinfo = res.data.data.text
									// // console.log("天气情况",_self.weatherinfo)
									// _self.iconUrl = _self.getWeatherIcon(parseInt(res.data.data.icon))
									uni.setStorageSync('address', res.data.data.address)
									uni.setStorageSync('weatherinfo', res.data.data.text)
									uni.setStorageSync('iconUrl', _self.getWeatherIcon(parseInt(res
										.data.data.icon)))
								}
							},
						});
					},
					complete: (res) => {
						if (res.errCode === 2 && res.code === 2) {
							uni.showToast({
								icon: 'error',
								title: "缺少定位权限"
							})
						}
					}
				});
			},
		},
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
		font-family: "Alibaba_Extra_bold";
		src: url('font/Alibaba_PuHuiTi_2.0_95_ExtraBold_95_ExtraBold.ttf');
	}

	@font-face {
		font-family: "Alibaba_Regular";
		src: url('font/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.ttf');
	}

	@font-face {
		font-family: "Alibaba_Medium";
		src: url('font/Alibaba_PuHuiTi_2.0_65_Medium_65_Medium.ttf');
	}

	@font-face {
		font-family: "Alibaba_bold";
		src: url('font/Alibaba_PuHuiTi_2.0_75_SemiBold_75_SemiBold.ttf');
	}

	body {
		background: rgba(249, 249, 249, 1.0);
		color: rgba(51, 51, 51, 1);
		font-family: "Alibaba_Regular";
	}
</style>