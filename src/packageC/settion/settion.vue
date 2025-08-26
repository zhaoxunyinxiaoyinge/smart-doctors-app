<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" title="设置" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
			<view class="setting">
				<view class="setting-list-item" @click="jumToPersonData">
					<view class="setting-left">
						<text class="setting-text">个人资料</text>
					</view>
					<uni-icons type="right" size="14"></uni-icons>
				</view>
				<view class="setting-list-item" @click="jumpToUpdatePassword">
					<view class="setting-left">
						<text class="setting-text">修改密码</text>
					</view>
					<uni-icons type="right" size="14"></uni-icons>
				</view>
				<view class="setting-list-item">
					<view class="setting-left">
						<text class="setting-text">消息通知</text>
					</view>
					<switch checked @change="switch1Change" style="transform:scale(0.7)" />
				</view>
				<view class="setting-list-item">
					<view class="setting-left">
						<text class="setting-text">清除缓存</text>
					</view>
					<view>
						<text class="right-text"> 6.4M</text>
						<uni-icons type="right" size="14"></uni-icons>
					</view>

				</view>
				<view class="setting-list-item">
					<view class="setting-left">
						<text class="setting-text">升级版本</text>
					</view>
					<view>
						<text class="right-text">{{version}}</text>
						<uni-icons type="right" size="14"></uni-icons>
					</view>

				</view>
<!-- 				<view class="setting-list-item">
					<view class="setting-left">
						<text class="setting-text">关于我们</text>
					</view>
					<uni-icons type="right" size="14"></uni-icons>
				</view> -->
			</view>
			<view class="btn" @tap="logout">
				<text>退出账号</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {mutations} from "./../../uni_modules/uni-id-pages/common/store.js"
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"



	const version = ref("");

	onLoad(() => {
		// #ifdef APP-PLUS
		version.value = plus.runtime.version
		// #endif
	})

	const jumToPersonData = () => {
		uni.navigateTo({
			url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
		})
	}

	const checked = ref(true);
	const switch1Change = () => {

	}
	const jumpToUpdatePassword = () => {
		uni.navigateTo({
			url: "/packageC/updatepassword/updatepassword"
		})
	}

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	const logout = async () => {
		mutations.logout();
	}
</script>

<style scoped>
	.content {
		padding: 0 24rpx;
	}

	.setting {
		margin-bottom: 100rpx;
	}

	.setting-list-item {
		/* margin:0 20rpx; */
		height: 105rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(28, 32, 35, 1);
		border-bottom: 1rpx solid rgba(227, 228, 229, 1);
	}

	.setting-left {
		display: flex;
		align-items: center;
	}

	.label-icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.right-text {
		font-size: 26rpx;
		font-weight: 400;
		color: rgba(197, 200, 203, 1);
		margin-right: 10rpx;
	}

	.btn {
		color: rgba(73, 185, 173, 1);
		width: 702rpx;
		height: 80rpx;
		margin: 0 atuo;
		border: 1rpx solid rgba(73, 185, 173, 1);
		border-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		font-weight: 400;
	}
</style>