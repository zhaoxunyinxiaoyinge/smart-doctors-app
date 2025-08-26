<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar  :fixed="true" statusBar='true'  title="审核通过" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="icon">
			<image src="./../../static/sign-bg.png" class='img'></image>
		</view>
		<view class="desc">
			<text>签约申请审核通过，等待居民支付</text>
		</view>
		<view class="text">
			<text>您已通过该居民的签约申请，居民支付后可完成签约</text>
		</view>
		<view class="process" @click="jumpToDetail">
			<text>查看签约详情</text>
		</view>

		<view class="back" @click="jumpToIndex">
			<text>返回首页</text>
		</view>
	</view>
</template>

<script setup>
	const jumpToIndex=()=>{
		uni.switchTab({
			url:'/pages/index/index'
		})
	}
	const jumpToDetail=()=>{
		uni.navigateTo({
			url:"/src/pages/signdetail/signdetail"
		})
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon {
		margin-top: 112rpx;
		margin-bottom: 40rpx;
	}

	.img {
		width: 300rpx;
		height: 266rpx;
	}

	.desc {
		text-align: center;
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		margin-bottom: 20rpx;
	}

	.text {
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
		margin-bottom: 69rpx;
	}

	.process {
		width: 702rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: rgba(73, 185, 173, 1);
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		font-size: 30rpx;
	}

	.back {
		width: 702rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20rpx;
		border: 1rpx solid rgba(73, 185, 173, 1);
		font-size: 30rpx;
		text-align: center;
		color:rgba(73, 185, 173, 1)
	}
</style>

