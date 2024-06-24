<template>
  <view>
    <view class="tabbar-box" style="padding-bottom: constant(safe-area-inset-bottom);padding-bottom: env(safe-area-inset-bottom);">
      <image src="../../static/Vector.png" mode="" class="tabbar-img"></image>
    	<view class="tabbar-list-box" v-for="(item,index) in list" :key="item.id" @click="SwitchTab(item)">
    		<image :src="item.id==state?item.selectedIconPath:item.iconPath" mode="heightFix" class="img-icon"
    			:class="{rotate:item.id==3&&isAddButtonRotated==true}"></image>
    		<view class="tabbar-text" :style="{color:item.id==state?'rgba(59, 206, 177, 1)':'rgba(153, 153, 153, 1)'}">{{item.text}}</view>
    	</view>
      <view class="mask" :style="{'top':top + 'rpx'}">
        <view class="manual-entry" @click="manual">
          手动录入
        </view>
        <view class="scan-entry" @click="toscan">
          扫描录入
        </view>
      </view>
    </view>
    <view class="mask2" :style="{'top':top2 + 'rpx'}">
      
    </view>
    <view class="main" :style="{'bottom':bot + 'rpx'}">
      <view class="main-head-box">
        <view class="main-head">
          <image src="../../static/close2.png" mode="" @click="close"></image>
          <p>手动录入</p>
        </view>
        <view class="con">
          <view class="head">
            <view class="head-item" :class="move===index?'move':''" v-for="(item,index) in headitem" :key="item.id"
              @click="change(index)">
              <view class="title">{{item.title}}</view>
            </view>
          </view>
          <view class="show-box" v-show="current === 0">
            <view class="show-box-head">
              <input type="text" placeholder="0.00">
              <view class="kind-box">
                <view class="kind" v-for="(item,index) in kinditemlist" :key="item.id" @click="change2(index,item.url,item.text)">
                  <view class="kind-item">
                    <image :src="flag==index?item.urlactive:item.url" mode=""></image>
                    <p>{{item.text}}</p>
                  </view>
                </view>
              </view>
            </view>
            <view class="info">
              <view class="count-kind">
                <p class="title">消费类型</p>
                <view class="count-kind-item">
                  <image :src="img" mode=""></image>
                  <p>{{text}}</p>
                </view>
              </view>
              <view class="count-time">
                <p class="title">消费时间</p>
                <view class="count-time-box">
                  <p>2022年1月11日</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
              </view>
              <view class="count-home">
                <p class="title">消费店家</p>
                <input type="text" placeholder="请输入消费店铺的名字(如校宝贝)">
              </view>
              <view class="count-image">
                <p class="title">上传凭证</p>
                <uni-file-picker class='file-picker' fileMediatype="image" mode="grid" @select="select"
                	@progress="progress" @success="success" @fail="fail" :imageStyles="imageStyles" />
              </view>
              <view class="count-text">
                <p class="title">备注</p>
                <input type="text" placeholder="请填写相关备注...">
              </view>
              <view class="save" @click="save1">
                保存
              </view>
            </view>
          </view>
          <view class="show-box" v-show="current === 1">
            <view class="show-box-head">
              <input type="text" placeholder="0.00">
              <view class="kind-box">
                <view class="kind">
                  <view class="kind-item">
                    <image src="../../static/weixin-revenue3.png" mode=""></image>
                    <p>收入</p>
                  </view>
                </view>
              </view>
            </view>
            <view class="info">
              <view class="count-kind">
                <p class="title">消费类型</p>
                <view class="count-kind-item">
                  <image src="../../static/weixin-revenue3.png" mode=""></image>
                  <p>收入</p>
                </view>
              </view>
              <view class="count-time">
                <p class="title">收入时间</p>
                <view class="count-time-box">
                  <p>2022年1月11日</p>
                  <image src="../../static/jiaobiao.png" mode=""></image>
                </view>
              </view>
              <view class="count-image">
                <p class="title">上传凭证</p>
                <uni-file-picker class='file-picker' fileMediatype="image" mode="grid" @select="select"
                	@progress="progress" @success="success" @fail="fail" :imageStyles="imageStyles" />
              </view>
              <view class="count-text">
                <p class="title">备注</p>
                <input type="text" placeholder="请填写相关备注..." v-model="remark">
              </view>
              <view class="save" @click="save1">
                保存
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"tabbar2",
    props:{
    	state: '',
    },
    data() {
      return {
		  isAddButtonRotated: false,
        top:170,
        current: 0,
        top2:2000,
        flag:0,
        bot:-2000,
        img:'../../static/education2.png',
        text:'教育',
        move: 0,
        bottom4:-750,
        remark:'',
        headitem: [{
            id: '001',
            title: '支出'
          },
          {
            id: '002',
            title: '收入'
          }
        ],
        kinditemlist:[
          {
            id:'001',
            url:'../../static/education2.png',
            urlactive:'../../static/education2-active.png',
            text:'教育'
          },
          {
            id:'002',
            url:'../../static/eat2.png',
            urlactive:'../../static/eat2-active.png',
            text:'餐饮'
          },
          {
            id:'003',
            url:'../../static/travels2.png',
            urlactive:'../../static/travels2-active.png',
            text:'出行'
          },
          {
            id:'004',
            url:'../../static/paly2.png',
            urlactive:'../../static/play2-active.png',
            text:'娱乐'
          },
          {
            id:'005',
            url:'../../static/others2.png',
            urlactive:'../../static/others2-active.png',
            text:'其它'
          },
        ],
        imageStyles: {
        	width: '160rpx',
        	height: '160rpx',
        	border: {
        		radius: 6,
        		color:'#d5d5d5'
        	}
        },
        list: [
          {
            id:'1',
            text: "首页",
            pagePath: "/pages/index2/index2",
            iconPath: "../../static/newTab/home.png",
            selectedIconPath: "../../static/newTab/home-active.png"
          },
          {
            id:'2',
            text: "明细",
            pagePath: "/pages/details2/details2",
            iconPath: "../../static/newTab/details.png",
            selectedIconPath: "../../static/newTab/details-active.png"
          },
          {
            id:'3',
            text:'',
            iconPath: "../../static/input.png",
            selectedIconPath: "../../static/input.png"
          },
          {
            id:'4',
            text: "统计",
            pagePath: "/pages/statistics2/statistics2",
            iconPath: "../../static/newTab/statistics.png",
            selectedIconPath: "../../static/newTab/statistics-active.png"
          },
          {
            id:'5',
            text: "我的",
            pagePath: "/pages/my2/my2",
            iconPath: "../../static/newTab/my.png",
            selectedIconPath: "../../static/newTab/my-active.png"
          }
        ]
      };
    },
    methods: {
      change(index) {
        this.move = index,
        this.current = index
      },
      close() {
        this.top2 = 2000
        this.bot = -2000
      },
      save1() {
        console.log(11)
        this.top2 = 2000
        this.bot = -2000
      },
      manual() {
        this.isAddButtonRotated = false
        this.top = 170
        this.top2 = 0
        this.bot = 0
        uni.navigateTo({
        	url: '/pages/manual-entry2/manual-entry2'
        })
      },
      toscan() {
        this.isAddButtonRotated = false
        this.top = 170
        this.$emit('scanentry')
      },
      change2(index,img,text) {
        this.flag = index
        this.img = img
        this.text = text
      },
      SwitchTab(item){
        if (item.id == '3') {
        	if (this.isAddButtonRotated === false) {
        		this.top = -220
        		this.isAddButtonRotated = true
        	} else if (this.isAddButtonRotated === true) {
        		this.top = 170
        		this.isAddButtonRotated = false
        	}
        } else {
        	console.log(item)
        	uni.redirectTo({
        	    url: item.pagePath
        	});
        	this.isAddButtonRotated = false
        }
      },
	  
    }
  }
</script>

<style scoped>
.tabbar-box {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
    /* background-color: rgba(255, 255, 255, 1); */
    justify-content: space-around;
    align-items: center;
	padding: 15rpx 0rpx 15rpx 0;
  /* box-shadow: 10rpx 10rpx 20rpx #a2a2a2; */
	
  }
  .tabbar-list-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
	
  }
  .tabbar-list-box:nth-child(4) {
	margin: -100rpx -50rpx 0 -50rpx;
  }
   .tabbar-list-box:nth-child(4) image {
   	width: 120rpx;
   	height: 120rpx;
   	transition-duration: 0.3s;
   	transition-delay: 0.1s;
   	transition-timing-function: ease-in;
   
   }
   
   .rotate {
   	transform: rotate(45deg);
   
   }
.img-icon {
  width: 50rpx;
  height: 50rpx;
}
.tabbar-text {
  margin-top: 5rpx;
  font-size: 26rpx;
}
.mask {
  font-size: 28rpx;
  position: absolute;
  top: 150rpx;
  text-align: center;
  line-height: 75rpx;
  border-radius: 10rpx;
  transition: all 0.6s ease-in-out;
  width: 151rpx;
  z-index: 99;
  height: 162rpx;
}
.manual-entry {
  width: 151rpx;
  height: 75rpx;
  border-radius: 10rpx;
  background-color: #ffffff;
  color: #3BCEB1;
  box-shadow: 0 0 5rpx 2rpx #3bceb1;
}
.scan-entry {
  width: 151rpx;
  height: 75rpx;
  color: #ffffff;
  border-radius: 10rpx;
  background-color: rgba(59, 206, 177, 1);
  box-shadow: 0 0 5rpx 2rpx #3bceb1;
}
.mask::after {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  left: 65rpx;
  bottom: -14rpx;
  border-top: 15rpx solid rgba(59, 206, 177, 1);
  border-bottom: 15rpx solid transparent;
  border-right: 15rpx solid transparent;
  border-left: 15rpx solid transparent;
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
  .mask2 {
    position: fixed;
    display: block;
    transition: all 0.6s;
    top: 0;
    left: 0;
    background-color: rgba(51, 51, 51, 1);
    opacity: 0.3;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .main {
    position: fixed;
    bottom: 0rpx;
    z-index: 101;
    transition: all 0.6s;
  }
  .main-head image {
    width: 61rpx;
    height: 61rpx;
  }
  .main-head {
    width: 690rpx;
    background-color: #3BCEB1;
    display: flex;
    padding: 30rpx;
    color: #ffffff;
    align-items: center;
	border-radius: 40rpx 40rpx 0 0;
  }
  .main-head p {
    margin-left: 230rpx;
    font-weight: 600;
  }
  .head {
    width: 690rpx;
    padding: 0 30rpx 30rpx 30rpx;
    background-color: #3BCEB1;
    display: flex;
    align-items: center;
  }
  .head-item {
    opacity: 0.6;
    color: #fff;
    margin-right: 50rpx;
  }
  .move {
    font-size: 34rpx;
    font-weight: 600;
    opacity: 1;
    color: #fff;
  }
  .show-box-head {
    padding:  20rpx 30rpx 50rpx 30rpx;
    background-color: #3BCEB1;
  }
  .show-box-head input {
    width: 690rpx;
    height: 105rpx;
    font-size: 70rpx;
    padding-bottom: 20rpx;
    color: #FFFFFF;
    border-bottom: 2rpx solid #FFFFFF;
  }
  .kind-item {
    display: flex;
    font-size: 28rpx;
    flex-direction: column;
    color: #FFFFFF;
    align-items: center;
  }
  .kind-item image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }
  .kind-item p {
    margin-top: 10rpx;
  }
  .kind-box {
    padding: 30rpx 20rpx 0rpx 20rpx;
    /* padding-top: 40rpx; */
    display: flex;
    justify-content: space-between;
  }
.info {
  padding: 30rpx;
  background-color: #FFFFFF;
  margin-top: -20rpx;
  border-radius: 30rpx 30rpx 0 0 ;
}
.count-kind-item image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.count-kind-item {
  display: flex;
  font-size: 28rpx;
  flex-direction: column;
}
.count-kind-item p {
  margin-left: 10rpx;
}
.count-time-box {
  display: flex;
  width: 308rpx;
  height: 60rpx;
  margin-top: 10rpx;
  line-height: 60rpx;
  border-radius: 50rpx;
  background-color: #f5f6f7;
  align-items: center;
}
.count-time {
  margin-top: 30rpx;
}
.count-time-box image {
  width: 27rpx;
  margin-left: 8rpx;
  height: 19rpx;
}
.count-time-box p {
  margin-left: 20rpx;
}
.count-home {
  margin-top: 30rpx;
}
.count-home input,.count-text input {
  font-size: 26rpx;
  margin-top: 10rpx;
  color: #999999;
}
.title {
  font-weight: 600;
}
.con {
  overflow: auto;
  height: 1300rpx;
  
}
.count-image {
  margin-top: 30rpx;
}
.count-image .title {
  margin-bottom: 20rpx;
}
.count-text {
  margin-top: 30rpx;
  padding-bottom: 30rpx;
}
.save {
  background-color: #3BCEB1;
  width: 626rpx;
  height: 100rpx;
  margin: 30rpx auto;
  border-radius: 20rpx;
  text-align: center;
  line-height: 100rpx;
  color: #FFFFFF;
  font-size: 36rpx;
}
.tabbar-img {
    position: absolute;
    width: 100%;
    z-index: -1;
    left: 0;
    bottom: 0;
    height: 118rpx;
    /* height: 30rpx; */
  }
</style>