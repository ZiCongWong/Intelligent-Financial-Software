<template>
  <view class="move-box">
    <view class="container" @touchstart="touchS" @touchmove="touchM" @touchend="touchE"
      :style="{left: leftStyle + 'rpx'}">
      <view class="text">
        <!-- 商品项 -->
        <view class="goods-items">
          <view class="goods-items-head">
            <view class="goods-name">{{text}}</view>
            <view class="goosds-count">*{{amount}}</view>
          </view>
          <view class="goods-price">单价:￥{{price}}</view>     
        </view>
      </view>
      <view class="option-box">
        <!-- 编辑 -->
        <view class="delete-box" @click="toedit">
          <image src="../../static/editor.png" mode=""></image>
        </view>
        <!-- 删除 -->
        <view class="delete-box" @click="detele">
          <image src="../../static/delete.png" mode=""></image>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
  export default {
    props:["text","amount","price"],
    data() {
      return {
        leftStyle: 0,
        startX: 0,
        Ftime:'',
        hiddenFlag: true,
        delBtnWidth: 220,
      }
    },
    methods: {
      detele(id) {
        console.log(id)
        uni.showModal({
        	title: '提示',
        	content: '你确定要删除吗',
        	success: (res)=> {
        		if (res.confirm) {
        			console.log('确定')
              this.$emit('delitem')
              // this.del(id)
        		} else if (res.cancel) {
        			console.log('取消');
        		}
        	}
        });
      },
      toedit() {
        this.$emit("edit")
      },
      // 开始移动时
      touchS({
        touches
      }) {
        // startX记录开始移动的位置
        if (touches.length === 1) {
          this.startX = touches[0].clientX;
        }
        // hiddenFlag为true则是从右向左，为false则是从左向右
        if (this.leftStyle === 0) {
          this.hiddenFlag = true;
        } else {
          this.hiddenFlag = false;
        }
      },
      touchM({
        touches
      }) {
        if (touches.length === 1) {
          //手指移动时水平方向位置
          const moveX = touches[0].clientX;
          this.moveFunc(moveX);
        }
      },
      touchE({
        touches
      }) {
        const {
          leftStyle
        } = this;
        const {
          delBtnWidth
        } = this;
        // 如果停止滑动的距离大于二分之一则直接弹出删除按钮，不然则left为0
        if (-leftStyle > delBtnWidth / 2) {
          this.leftStyle = -delBtnWidth;
        } else {
          this.leftStyle = 0;
        }
      },
      moveFunc(moveX) {
        // 原始位置向左，leftStyle为小于0；原始位置向右，leftStyle为大于0
        // disX为相对最初位置的左右距离
        // 大于0为向右，小于0为向左
        const disX = moveX - this.startX;
        const delBtnWidth = this.delBtnWidth;
        let offsetNum = 0;
        if (-disX >= delBtnWidth && this.leftStyle === -delBtnWidth) {
          return;
        }
        console.log(disX, this.hiddenFlag);
        // this.hiddenFlag为true则是从左到右，则应该将container向左移动
        // this.hiddenFlag为false则是从右向左，则应该将container向右移动
        if (this.hiddenFlag) {
          // 此时container为最右边，则应该将container向左移动
          // disX大于0为相对原始位置的向右移动，则直接将offsetNum置为0
          // 否则为向左移动，offsetNum为disX相反的值，判断是否超过设置的最大位置
          if (disX == 0 || disX > 0) {
            offsetNum = 0;
          } else {
            offsetNum = disX;
            if (disX <= -delBtnWidth) {
              //控制手指移动距离最大值为删除按钮的宽度
              offsetNum = -delBtnWidth;
            }
          }
        } else {
          // 此时container为最左边，应该向右移动
          // disX小于0为相对原始位置的向左移动，则直接将offsetNum置为-this.delBtnWidth
          // 否则为相对原始位置的向右移动，此时应该将最大位置与向右位置的差值为此刻位置，判断是否为大于0
          if (disX < 0) {
            offsetNum = -this.delBtnWidth;
          } else {
            offsetNum = -this.delBtnWidth + disX;
            if (offsetNum > 0) {
              offsetNum = 0;
            }
          }
        }
        this.leftStyle = offsetNum;
      }
    }
  }
</script>

<style scoped>
  .move-box {
    overflow: hidden;
  }
  .container {
    position: relative;
  }
  .option-box {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: -210rpx;
    width: 210rpx;
    height: 94rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #FFFFFF;
    background: rgba(59, 206, 177, 1);
  }
  .delete-box image {
    width: 40rpx;
    height: 40rpx;
  }
  .text {
    width: 600rpx;
  }
  .delete-box {
    display: flex;
    align-items: center;
  }
  .goods-items {
    width: 570rpx;
    font-size: 28rpx;
    margin: 10rpx 0;
    padding: 10rpx 0;
    border-bottom: 2rpx dashed #ccc;
  }
  .goods-items-head {
    display: flex;
    justify-content: space-between;
  }
  .goods-price {
    display: flex;
    justify-content: flex-end;
  }
</style>
