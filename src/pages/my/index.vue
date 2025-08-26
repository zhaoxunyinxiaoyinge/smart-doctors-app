<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端-->
		<uni-nav-bar title="我的"  :fixed="true" statusBar='true' height="44px">
		</uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
			<view class="header">
				<image class='avatar' :src="user.avatar"></image>
				<view class="user">
					<text class="names">{{user.username}}</text>
					<image class='doctor' src="./../../static/doctor-label.png"></image>
				</view>
				<image class="erweima" src="./../../static/erweima.png" @click="jumToScan"></image>
			</view>
			<view class="wrapper">
				<view class="cargorty-list">
					<view class="cargorty-list-item">
						<image class="icon" src="./../../static/tuidui.png"></image>
						<view class="list-cargory-content">
							<text class="text">所属团队</text>
							<text class="tuandui">阳兰广专科团队</text>
						</view>
					</view>
					<view class="cargorty-list-item">
						<image class="icon" src="./../../static/mark.png"></image>
						<view class="list-cargory-content">
							<text class="text">所属机构</text>
							<text class="tuandui">桂雅卫生服务站</text>
						</view>
					</view>
				</view>
				<view class="setting">
					<view class="setting-list-item" @click="jumToTeam">
						<view class="setting-left">
							<image class="label-icon" src="./../../static/info.png"></image>
							<text class="setting-text">我的医生团队</text>
						</view>
						<uni-icons type="right" size="14"></uni-icons>
					</view>

					<view class="setting-list-item" @click="jumToSign">
						<view class="setting-left">
							<image class="label-icon" src="./../../static/info.png"></image>
							<text class="setting-text">签约管理</text>
						</view>
						<uni-icons type="right" size="14"></uni-icons>
					</view>
					<view class="setting-list-item" @click="jumToMange">
						<view class="setting-left">
							<image class="label-icon" src="./../../static/info.png"></image>
							<text class="setting-text">服务管理</text>
						</view>
						<uni-icons type="right" size="14"></uni-icons>
					</view>
					<view class="setting-list-item" @click="jumToSettiong">
						<view class="setting-left">
							<image class="label-icon" src="./../../static/info.png"></image>
							<text class="setting-text">设置</text>
						</view>
						<uni-icons type="right" size="14"></uni-icons>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		isReactive,
		onMounted,
		reactive
	} from 'vue';
	
	let user = reactive({
		username:"gou",
		avatar:""
	});
	
	onMounted(()=>{
		getUser();
	})

	const getUser = () => {
		const users = uni.getStorageSync("uni-id-pages-userInfo");
		user.username = users.username||users.nickname;
		user.avatar=users.avatar_file.url
	}

	const jumToSettiong = () => {
		uni.navigateTo({
			url: "/packageC/settion/settion"
		})
	}
	const jumToScan = () => {
		uni.navigateTo({
			url: "/packageC/scan/scan"
		})
	}

	const jumToTeam = () => {
		uni.navigateTo({
			url: "/packageC/myTeam/myTeam"
		})
	}

	const jumToMange = () => {
		console.log(23456789)
		uni.navigateTo({
			url: "/pages/servemange/servemange"
		})
	}

	const jumToSign = () => {
		uni.navigateTo({
			url: "/pages/signmange/signmange"
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(73, 185, 173, 1);
		height: 100vh;
	}

	.content {
		padding-top: 21rpx;
	}

	.header {
		display: flex;
		align-items: center;
		width: 702rpx;
		margin: 0 auto;
		height: 190rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;

	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
	}

	.doctor {
		width: 82rpx;
		height: 28rpx;
	}

	.erweima {
		width: 40rpx;
		height: 40rpx;
	}

	.user {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 30rpx;
	}

	.names {
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
		margin-bottom: 15rpx;
	}

	.wrapper {
		background-color: #fff;
		height: calc(100vh - 211rpx);
	}

	.cargorty-list {
		display: flex;
		background-color: #EAFEFA;
		height: 128rpx;
		margin: 0 auto;
		width: 702rpx;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.cargorty-list-item {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.list-cargory-content {
		display: flex;
		flex-direction: column;
	}

	.text {
		font-size: 22rpx;
		font-weight: 700;
	}

	.tuandui {
		color: rgba(96, 105, 114, 1);
		font-size: 24rpx;
		font-weight: 400;
	}

	.setting {
		margin-top: 30rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.setting-list-item {
		margin: 0 20rpx;
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
</style>