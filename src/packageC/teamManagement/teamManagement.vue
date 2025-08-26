<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" leftText="返回" color="#fff" title="团队管理" backgroundColor="rgba(73, 185, 173, 1)"
			:fixed="true" statusBar='true' :border="false" left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="bg">
		</view>
		<view class="content">
			<view class="top">
				<view class="left">
					<view class="avatar">
						<image src="./../../static/avatar_doctor.png" class="avatar"></image>
					</view>
					<view class="user">
						<text class="name">周璟荣</text>
						<text class="team-num">团队编号：0152415</text>
					</view>
				</view>

				<view class="edit" @click="joinTeam">
					<text>{{isMyTeam?'查看':'编辑团队'}}</text>
				</view>
			</view>
			<view class="column-name">
				<view class="column-name-item" @click="handleTeamMember">
					<image class="column-img" src="./../../static/serve-one.png"></image>
					<text>团队成员</text>
				</view>
				<view class="column-name-item" @click="handleJumpeTo">
					<image class="column-img" src="./../../static/serve-one.png"></image>
					<text>服务包管理</text>
				</view>
				<view class="column-name-item" @click="handleJoinApply" v-if="!isMyTeam">
					<image class="column-img" src="./../../static/serve-one.png"></image>
					<text>加入申请</text>
				</view>
				<view class="column-name-item" @click="handleYaoQing">
					<image class="column-img" src="./../../static/serve-one.png"></image>
					<text>邀请加入</text>
				</view>
				<view class="column-name-item" @click="handleSetHead" v-if="!isMyTeam">
					<image class="column-img" src="./../../static/serve-one.png"></image>
					<text>设置团队长</text>
				</view>
			</view>
		</view>
		<view class="bottom">
			<text class="btn" @click="disbandTeam">{{isMyTeam?'退出团队':'解散团队'}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";

	const isMyTeam = ref(false);

	onLoad((options) => {
		if (options.isMyTeam && JSON.parse(options.isMyTeam)) {
			console.log(isMyTeam, 666)
			isMyTeam.value = true;
		}
	})


	const joinTeam = () => {
		uni.redirectTo({
			url: "/packageC/setTeamInfo/setTeamInfo"
		})
	}

	const handleTeamMember = () => {
		uni.navigateTo({
			url: "/packageC/teamMember/teamMember"
		})
	}

	const handleJumpeTo = () => {
		uni.navigateTo({
			url: "/packageC/myserveMange/myserveMange"
		})
	}

	const handleJoinApply = () => {
		uni.navigateTo({
			url: "/packageD/joinApply/joinApply"
		})
	}

	const handleYaoQing = () => {
		uni.navigateTo({
			url: '/packageC/scan/scan'
		})
	}

	const handleSetHead = () => {
		uni.navigateTo({
			url: "/packageD/setHead/setHead"
		})
	}

	const disbandTeam = () => {
		let url = "/packageD/disband/disband";
		url = isMyTeam.value ? url + "?isMyteam=" + true : url
		uni.navigateTo({
			url
		})
	}

	const back = () => {
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/my/index'
			})
		})

	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		height: 100vh;
	}

	.bg {
		height: 120rpx;
		background-color: rgba(73, 185, 173, 1);
	}

	.content {
		padding: 0 24rpx;
		margin-top: -90rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 702rpx;
		height: 180rpx;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.team-num {
		color: rgba(96, 105, 114, 1);
		font-size: 24rpx;
		font-weight: 400;
		margin-top: 10rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-left: 30rpx;
	}

	.edit {
		width: 140rpx;
		height: 50rpx;
		color: rgba(73, 185, 173, 1);
		background-color: ;
		font-size: 24rpx;
		font-weight: 400;
		background-color: rgba(234, 254, 250, 1);
		border-radius: 25px 0px 0px 25px;
		text-align: center;
		line-height: 50rpx;
	}

	.column-name {
		padding: 40rpx;
		padding-bottom: 0;
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		color: rgba(28, 32, 35, 1);
		font-size: 24rpx;
		font-weight: 400;
	}

	.column-img {
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 10rpx;

	}

	.column-name-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 147rpx;
		margin-bottom: 40rpx;
		margin-right: 90rpx;
	}

	.column-name-item:nth-child(3n) {
		margin-right: 0;
	}

	.bottom {
		position: fixed;
		padding-bottom: 79rpx;
		width: 100%;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		background-color: #fff;
	}

	.btn {
		width: 702rpx;
		border-radius: 20rpx;
		color: rgba(246, 87, 85, 1);
		border: 1rpx solid rgba(246, 87, 85, 1);
		font-size: 30rpx;
		font-weight: 400;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;

	}
</style>