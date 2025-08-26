<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="加入申请" :border="false" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<uni-segmented-control class='tab' :current="current" :values="tabs" :style-type="'text'"
			active-color="rgba(73, 185, 173, 1)" @clickItem="onClickItem" />
		<view class="content">
			<scroll-view class="scroll" :scroll-y="true" :refresher-threshold="50" :refresher-enabled='true'
				:refresher-triggered='loading' @refresherrefresh="refreshPull" @scrolltolower="scrollLower">
				<view class="list">
					<view class="list-item" v-for="(item,index) in list" @click="handleJumpDetail">
						<view class="status"><text class="shenhe" @click="watingShenHe">待审核</text></view>
						<view class="list-content">
							<view class="img">
								<image class="avatar" :src="item.avatar" :lazy-load='true'></image>
								<view class="icon">使用中</view>
							</view>
							<view class="text">
								<view><text class="first left">栗柔学</text><text>2512541</text></view>
								<view><text class="left">职位:</text><text>2512541</text></view>
								<view><text class="left">联系电话:</text><text>2512541</text></view>
								<view><text class="left">申请时间</text><text>2512541</text></view>
							</view>
						</view>

					</view>

				</view>
				<uni-load-more :status="status"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from "vue"
	const tabs = reactive(["待审", "通过", "已拒绝"]);
	const list = reactive([
	]);
	const status = ref('loading');
	const loading = ref(false);
	
	
	onMounted(()=>{
		getData();
	})
	
	const getData=()=>{
		status.value='loading';
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve([
					{
							avatar: "./../../static/list-pic.png",
					
						},
						{
							avatar: "./../../static/list-pic.png",
					
						},
						{
							avatar: "./../../static/list-pic.png",
					
						},
						{
							avatar: "./../../static/list-pic.png",
					
						}
				])
			},2000)
		}).then(res=>{
			loading.value=false;
			list.push(...res);
			if(list.length>20){
				status.value='no-more';
			}else{
				status.value='more';
			}
		})
	}
	
	const watingShenHe = () => {
		uni.navigateTo({
			url:"/packageC/applyJoinTeam/applyJoinTeam"
		})
	}

	const refreshPull = () => {
			loading.value=true;
			list.length=0;
			getData();
	}

	const scrollLower = () => {
		if(list.length>20){return }
		getData();
	}

	const onClickItem = () => {

	}
	
	const handleJumpDetail=()=>{
		uni.navigateTo({
			url:"/packageC/applyJoinTeam/applyJoinTeam?auditTeam="+true
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		})
	}
</script>

<style scoped lang="scss">
	.container {
		background-color: rgba(245, 247, 251, 1);
		height: 100vh;
	}
	
	/* #ifndef MP-WEIXIN */
	.content {
		height: calc(100vh - 88rpx - 88rpx);
		box-sizing: border-box;
	   background-color: #fff;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */
	.content {
		height: calc(100vh - 88rpx);
		box-sizing: border-box;
		background-color: #fff;
	}

	/* #endif */

	.scroll {
		height: 100%;
	}

	.tab {
		height: 88rpx;
		border-bottom: 1rpx solid #eee;
		background-color: #fff;
	}

	.list {
		padding-left: 24rpx;
		padding-right: 24rpx;
	}

	.list-item {
		border-bottom: 1rpx solid #eee;
		padding: 30rpx 0 32rpx 0;
	}

	.list-content {
		display: flex;
		align-items: center;
	}

	.status {
		display: flex;
		justify-content: flex-end;
	}

	.shenhe {
		background-color: rgba(73, 185, 173, 1);
		border-radius: 10rpx;
		color: #fff;
		font-size: 24rpx;
		font-weight: 400;
		text-align: center;
		padding: 10rpx 17rpx;
		margin-bottom: 30rpx;
	}

	.img {
		position: relative;
		display: flex;
	}

	.icon {
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 10rpx 0 40rpx 0;
		background-color: rgba(246, 87, 85, 1);
		width: 118rpx;
		height: 40rpx;
		font-size: 20rpx;
		color: rgba(255, 255, 255, 1);
		font-weight: 400;
		text-align: center;
		line-height: 40rpx;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
		margin-right: 40rpx;
		border-radius: 10rpx;
	}

	.text {
		display: flex;
		flex-direction: column;
		height: 180rpx;
		color: rgba(96, 105, 114, 1);
		font-size: 24rpx;
		font-weight: 400;
		justify-content: space-around;

		.first {
			color: rgba(28, 32, 35, 1);
			font-size: 32rpx;
			font-weight: 700;
		}
	}

	.left {
		display: inline-block;
		width: 105rpx;
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
	}

	.bottom {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-top: 9rpx;
		padding-bottom: 9rpx;
		justify-content: center;
		z-index: 5;
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

