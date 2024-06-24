<template>
	<view>
		<view class="main">
			<showConsumption class='details' :billsId="billsId" :count="count" :imgurl="imgurl" :merchants="merchants" :method="method" :note="note" :time="time" :type="type" :productList="productList" :mode="mode" :picture="picture"></showConsumption>
		</view>
	</view>  
</template>

<script>
	import showConsumption from "../../components/showConsumption/showConsumption.vue"

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
        mode:0,
        productList:[],
        picture:''
			}
		},
    onLoad(option) {
      this.billsId = option.billsId
      this.count = option.count
      this.imgurl = option.imgurl
      this.picture = option.picture
      console.log(this.imgurl)
      this.merchants = option.merchants
      if(this.merchants == null) {
        this.merchants = '无'
      }
      this.method = option.method
      this.note = option.note
      this.mode = option.mode
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
      this.productList = JSON.parse(option.productList)
      console.log("list",this.productList)
      console.log("+++++",option)
      console.log(this.billsId)
      console.log("time",this.timestamp)
    },
		methods: {
			
		},
		components: {
			showConsumption,
		}
	}
</script>

<style>
	.main {
		width: 750rpx;
		background-color: #3bceb1;
	}

	
</style>
