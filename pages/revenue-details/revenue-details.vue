<template>
	<view>
		<view class="main">
			<showRevenue ></showRevenue>
		</view>
	</view>
</template>

<script>
	import showRevenue from "../../components/showRevenue/showRevenue.vue"
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{showRevenue,}
	}
</script>

<style>
	.main {
		width: 750rpx;
		height: 1600rpx;
		background-color: #3bceb1;
		
	}
	
</style>
