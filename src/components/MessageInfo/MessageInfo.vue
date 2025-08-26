<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" :title="props.config.title" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="icon">
			<image :src="props.config.imgUrl" class='img'></image>
		</view>
		<view class="desc">
			<text>{{props.config.desc}}</text>
		</view>
		<view class="text">
			<text>{{props.config.text}}</text>
		</view>
		<view class="process" @click="jumToPrev">
			<text>{{props.config.process}}</text>
		</view>

		<view class="back" @click="jumpToIndex">
			<text>返回首页</text>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	const props= defineProps({
		 linkUrl:{
			 type:String,
			 default:"/"
		 },
		 config:{
			 type:Object,
			 default(){
				 return {}
			 }
		 }
	 })
	const jumpToIndex=()=>{
		uni.switchTab({
			url:"/pages/index/index"
		})
	}
	const jumToPrev=()=>{
		uni.navigateTo({
			url:props.linkUrl
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
		width: 506rpx;
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
		margin-bottom: 69rpx;
		text-align: center
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