<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="服务包管理" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->

		<uni-segmented-control class='tab' :current="current" :values="tabs" :style-type="'text'"
			active-color="rgba(73, 185, 173, 1)" @clickItem="onClickItem" />
		<view class="content">
			<scroll-view class="scroll" :scroll-y="true" :refresher-threshold="50" :refresher-enabled='true'
				:refresher-triggered='loading' @refresherrefresh="refreshPull" @scrolltolower="scrollLower">
				<view class="list">
					<view class="list-item" v-for="(item,index) in list" @click="handleJumpDetail">
						<view class="img">
							<image class="avatar" :src="item.avatar" :lazy-load='true'></image>
							<view class="icon">使用中</view>
						</view>

						<view class="text">
							<text class="first">{{item.title}}</text>
							<text>{{item.desc}}</text>
						</view>
					</view>

				</view>
				<uni-load-more :status="status"></uni-load-more>
			</scroll-view>
			<view class="bottom">
				<button class="btn" @click="handleJumpTo" hover-class='press-button' type="">新增</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"

	onMounted(async () => {
		getData();
	})

	const getData = () => {
		status.value = 'loading';
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve([{
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					},
					{
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					},
					{
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					}, {
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					},
					{
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					},
					{
						avatar: "https://picb4.photophoto.cn/39/678/39678534_1.jpg",
						title: '基础包',
						desc: "基础医疗"
					}
				])
			}, 2000)
		}).then(res => {
			if (isRefsh.value) {
				list.push(...res);
			} else {
				list.push(...res);
			}
			loading.value = false;
			isRefsh.value = true;
			if (list.length < 20) {
				status.value = 'more';
			} else {
				status.value = 'no-more';
			}

		})
	}

	const onClickItem = () => {};

	const refreshPull = () => {
		list.length = 0;
		loading.value = true;
		getData();
	};
	const scrollLower = () => {
		if (list.length > 20) {
			return
		};
		isRefsh.value = false;
		getData();
	};

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	
	const handleJumpTo=()=>{
		uni.navigateTo({
			url:"/packageC/checkTeamMange/checkTeamMange"
		})
	}
	
	const handleJumpDetail=()=>{
		uni.navigateTo({
			url:"/packageC/serveMangeDetail/serveMangeDetail"
		})
	}
	
	const loading = ref(false);
	const isRefsh = ref(true);
	const list = reactive([]);
	const current = ref(0);
	const tabs = reactive(["全部", "使用", "停用"]);
	const status = ref("loading");
	
	
	
</script>

<style scoped lang="scss">
	/* #ifndef MP-WEIXIN */
	.content {
		height: calc(100vh - 88rpx - 88rpx);
		padding-bottom: 98rpx;
		box-sizing: border-box;
	}
	/* #endif */

	/* #ifdef MP-WEIXIN */
	.content {
		height: calc(100vh - 88rpx);
		padding-bottom: 98rpx;
		box-sizing: border-box;
	}

	/* #endif */

	.scroll {
		height: 100%;
	}

	.tab {
		height: 88rpx;
	}

	.list {
		padding-top: 30rpx;
	}

	.list-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		padding: 0 24rpx;
	}

	.img {
		position: relative;
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
		color: rgba(96, 105, 114, 1);
		font-size: 24rpx;
		font-weight: 400;

		.first {
			color: rgba(28, 32, 35, 1);
			font-size: 32rpx;
			font-weight: 700;
			margin-bottom: 10rpx;
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
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
