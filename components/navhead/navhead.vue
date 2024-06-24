<template>
  <view class="content">
    <view class="head">
      <view class="head-left">
        <image :src="iconUrl" mode="" class="weather"></image>
        <view class="weather-info-box">
          <p class="address">{{address}}</p>
          <p class="weather-info">{{year}}-{{month}}-{{day}} {{weatherinfo}}</p>
        </view>
      </view>
      <view class="set">
        <image src="../../static/identities.png" mode="" @click="change"></image>
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
  </view>
</template>

<script>
  export default {
    name: "navhead",
    data() {
      return {
        iconUrl: "../../static/weather/-100.png",
        weather: {},
        state: '5',
        bottom: -750,
        top: 2000,
        text: '我的',
        bottom2: -750,
        current: 0,
        move: 0,
        address:"Loading...",
        weatherinfo:"Loading...",
        year:"",
        month:"",
        mode:1,
        day:"",
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
    beforeCreate() {
      uni.hideTabBar()
	  
	  
    },
	created() {
		if(uni.getStorageSync('address')&&uni.getStorageSync('weatherinfo')&&uni.getStorageSync('iconUrl')){
			this.address=uni.getStorageSync('address')
			this.weatherinfo=uni.getStorageSync('weatherinfo')
			this.iconUrl=uni.getStorageSync('iconUrl')
		}else{this.getweather()}
		
	},
	
    mounted() {
      
      this.getdate()
    },
	
    methods: {
      getdate() {
        let date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = month<10? '0'+ month : month
        var day = date.getDate()
        day = day<10? '0'+ day : day
        this.year = year
        this.month = month 
        this.day = day
      },
      getWeatherIcon(icon){
            //需要添加匹配相同类型的天气数组
            // 阳天
            let sumDay = [100]
            // 阴天
            let windDay = [101, 102, 103, 104]
            // 夜晚
            let night = [150, 151, 152, 153]
            // 太阳雨
            let sumRain = [300, 301]
            // 小雷雨
            let smallThunder = [302, 303, 304]
            // 小雨
            let smallRain = [305, 306, 307, 309, 399]
            // 大雨
            let bigRain = [308, 310, 311, 312, 313, 314, 315, 316, 317, 318]
            // 夜晚有雨
            let nightRain = [350, 351, 456, 457]
            // 小雪
            let smallSnow = [400, 401, 407, 408, 409, 499]
            // 大雪
            let bigSnow = [402, 403, 410]
            // 雨夹雪
            let rainSnow = [404, 405, 406]
            // 雾天
            let cowday = [500, 501, 502]
            //需要添加匹配相同类型的天气数组
            switch (true) {
              case (sumDay.includes(icon)):
                return "../../static/weather/-100.png";
              case (windDay.includes(icon)):
                return "../../static/weather/-101.png";
              case (smallRain.includes(icon)):
                return "../../static/weather/-102.png";
              case (bigRain.includes(icon)):
                return "../../static/weather/-103.png";
              case (smallThunder.includes(icon)):
                return "../../static/weather/-104.png";
              case (night.includes(icon)):
                return "../../static/weather/-110.png";
              case (smallSnow.includes(icon)):
                return "../../static/weather/-109.png";
              case (bigSnow.includes(icon)):
                return "../../static/weather/-105.png";
              case (cowday.includes(icon)):
                return "../../static/weather/-107.png";
              default:
                return "../../static/weather/" + icon + ".svg";
            }
        },
      // 获取天气信息
      getweather() {
        var _self = this
        uni.getLocation({
          type: "wgs84",
          success: function(res) {
            uni.request({
              url: `http://139.9.197.13:8080/xlzb/weather/` + res.longitude + "," + res.latitude,
              method: 'GET',
              success: function(res){
                if (res.data.code !== "200") { 
                } else {
                  this.weather = res.data.data
                  _self.address = res.data.data.address
                  // console.log("地址",_self.address)
                  _self.weatherinfo = res.data.data.text
                  // console.log("天气情况",_self.weatherinfo)
                  _self.iconUrl = _self.getWeatherIcon(parseInt(res.data.data.icon))
				  uni.setStorageSync('address',res.data.data.address)
				  uni.setStorageSync('weatherinfo',res.data.data.text)
				  uni.setStorageSync('iconUrl',_self.getWeatherIcon(parseInt(res.data.data.icon)))
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
      change() {
        // 判断现在是哪个模式(0,1,2)分别表示三个模式，作为初始值
        this.move = 1

        this.bottom = 0
        this.top = 0
      },
      changeitem(index) {
        this.move = index
        this.mode = index
      },
      // 切换模式
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
            uni.setStorageSync('usermode',this.mode)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      close() {
        this.bottom = -750
        this.top = 2000
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
    }
  }
</script>

<style scoped>
  .content {
    height: 200rpx;
    opacity: 1;
    /* background: linear-gradient(185.49deg, rgba(59, 206, 177, 0.4) 0%, rgba(59, 206, 177, 0.01) 100%); */
    background: linear-gradient(180deg, rgba(59, 206, 177, 0.4), #d5f0ec);
  }

  .weather {
    width: 96rpx;
    height: 96rpx;
    margin-right: 20rpx;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 100rpx 35rpx 0 35rpx;
  }

  .address {
    font-family: "Alibaba_Extra_bold";
	
  }

  .weather-info {
    font-family: "Alibaba_Regular";
    color: rgba(166, 166, 166, 1);
    font-weight: 600;
    font-size: 28rpx;
  }

  .head-left {
    display: flex;
    align-items: center;
  }

  .set image {
    width: 50rpx;
    height: 50rpx;
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
</style>
