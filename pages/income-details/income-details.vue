<template>
	<view>
		<view class="main">
			<showRevenue class='details' :billsId="billsId" :count="count" :imgurl="imgurl" :merchants="merchants" :method="method" :note="note" :time="time" :type="type" :picture="picture"></showRevenue>
		</view>
	</view>
</template>

<script>
	import showRevenue from "../../components/showRevenue/showRevenue.vue"

	export default {
		data() {
			return {
        billsId:'',
        count:0,
        imgurl:'',
        merchants:'',
        method:'',
        note:'',
        timestamp:'',
        time:'',
        type:'餐饮',
        picture:''
			}
		},
    onLoad(option) {
      this.billsId = option.billsId
      this.count = option.count
      this.imgurl = option.imgurl
      this.picture = option.picture
      this.merchants = option.merchants
      if(this.merchants == null) {
        this.merchants = '无'
      }
      this.method = option.method
      this.note = option.note
      this.timestamp = option.timestamp.slice(0,10)
      var year = this.timestamp.slice(0,4)
      console.log(year)
      var month = this.timestamp.slice(5,7)
      console.log(month)
      var day = this.timestamp.slice(8,10)
      console.log(day)
      this.time = year+'年'+month+'月'+day+'日'
      console.log(this.time)
      this.type = option.type
      console.log("+++++",option)
      console.log(this.billsId)
      console.log("time",this.timestamp)
    },
		methods: {
			
		},
		components: {
			showRevenue,
		}
	}
</script>

<style>
	.main {
		width: 750rpx;
		height: 1600rpx;
		background-color: #3bceb1;
	}

	
</style>
