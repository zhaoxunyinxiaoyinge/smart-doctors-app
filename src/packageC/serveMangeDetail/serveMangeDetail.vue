<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" left-text="返回" :border="false" title="服务包详情" backgroundColor="rbga(255,255,255,.1)"
			:fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
			<image class="bg" src="./../../static/shoufei.png"></image>
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<view class="header">
					<text>老人服务包</text>
					<text class="money">￥120</text>
				</view>
				<view class="list-content">
					<view class="tag"><text>低血糖</text></view>
					<view class="tag"><text>低血糖</text></view>
				</view>
			</view>
			<view class="list">
				<view class="header">
					<text>服务对象</text>
				</view>
				<view class="list-content">
					<textarea disabled :auto-height="true" class="text-input" placeholder-class="textArea-input"
						value="55岁以上的老人">
					</textarea>
				</view>
			</view>
			<view class="list">
				<view class="header">
					<text>服务介绍</text>
				</view>
				<view class="list-content">
					<textarea disabled :auto-height="true" class="text-input"
						value="主要以基本医疗服务和公共卫生服务为主，如部分常见病或 多发病的治疗和用药指导、重症的就医指导和转诊预约、居民健康档案的管理和 慢病管理指导等"></textarea>
				</view>
			</view>
			<view class="list">
				<view class="header">
					<text>服务项目</text>
				</view>
				<scroll-view scroll-x="true" class="scroll"   :scroll-with-animation="true" :show-scrollbar='false'>
					<view class="list-content-item">
						<text class="num">2次</text>
						<text class="desc">高血压随访</text>
					</view>
					<view class="list-content-item">
						<text class="num">2次</text>
						<text class="desc">高血压随访</text>
					</view>
					<view class="list-content-item">
						<text class="num">2次</text>
						<text class="desc">高血压随访</text>
					</view>
					<view class="list-content-item">
						<text class="num">2次</text>
						<text class="desc">高血压随访</text>
					</view>
					<view class="list-content-item">
						<text class="num">2次</text>
						<text class="desc">高血压随访</text>
					</view>
				</scroll-view>
			</view>
			<view class="list">
				<view class="header">
					<text>服务周期</text>
				</view>
				<view class="list-content">
					<textarea disabled :auto-height="true" class="text-input" value="一年（可续签)"></textarea>
				</view>
			</view>
			<view class="bottom">
				<button class="btn" hover-class='press-button'>去审核</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	const back=()=>{
		uni.navigateBack({
			delta:0
		})
	}
</script>

<style scoped>
	
	.container {
		height: 100vh;
	}
	
	
	/* #ifndef MP-WEIXIN */
	.container {
		height: 100vh;
		background: url("../../static/shoufei.png") no-repeat;
		background-size: 100% auto;
	}

	.content {
		margin-top: 268rpx;
		height: calc(100vh - 88rpx - 268rpx);
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		padding: 30rpx 24rpx 0;
		padding-bottom: 96rpx;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	.content {
		/* margin-top: 268rpx; */
		height: calc(100vh - 268rpx);
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		box-sizing: border-box;
		padding: 30rpx 24rpx 0;
		padding-bottom: 96rpx;
	}

	/* #endif */
	
	.bg {
		width: 100%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.tag {
		color: rgba(250, 84, 28, 1);
		font-size: 20rpx;
		font-weight: 400;
		background: rgba(255, 242, 232, 1);
		border: 1px solid rgba(250, 84, 28, 1);
		text-align: center;
		line-height: 34rpx;
		margin-right: 20rpx;
		padding: 3rpx 28rpx;
		border-radius: 10rpx;
	}

	.list-content {
		display: flex;
		margin: 20rpx 0 30rpx;
		flex-wrap: nowrap;
	}

	.scroll {
		white-space: nowrap;
		width: 100%;
	}

	.money {
		color: rgba(246, 87, 85, 1);
		font-size: 40rpx;
		font-weight: 700;
	}

	.list-content-item {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		margin-right: 40rpx;
		padding: 11rpx 56rpx 11rpx 0;
	}
	
	.text-input {
		padding: 20rpx 15rpx;
		width: 100%;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(64, 69, 75, 1);
		background-color: rgba(245, 247, 251, 1);
	}

    /* #ifndef MP-WEIXIN */
    	.text-input {
		padding: 20rpx 15rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(64, 69, 75, 1);
		background-color: rgba(245, 247, 251, 1);
	}
    /* #endif */

	
	/deep/ .textArea-input {
		background-color: rgba(245, 247, 251, 1);
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(64, 69, 75, 1);
	}

	.num {
		font-size: 24rpx;
		font-weight: 700;
		color: rgba(73, 185, 173, 1);
		margin-bottom: 4rpx;
	}

	.desc {
		font-size: 28rpx;
		font-weight: 700;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-top: 9rpx;
		padding-bottom: 9rpx;
		display: flex;
		justify-content: center;
		z-index: 5;
		background-color: #fff;
	}

	.btn {
		width: 702rpx;
		background-color: rgba(73, 185, 173, 1);
		color: #fff;
		text-align: center;
		font-size: 30rpx;
		font-weight: 400;
		line-height: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
	}

	.press-button {
		background-color: rgba(73, 185, 173, .8);
	}
</style>
