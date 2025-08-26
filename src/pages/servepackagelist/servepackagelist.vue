<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" title="服务包列表" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<uni-segmented-control border class="tab" :current="current" :values="items" @clickItem="onClickItem"
			styleType="text" activeColor="rgba(73, 185, 173, 1)"></uni-segmented-control>
		<scroll-view :scroll-y="true" class="scroll" :refresher-enabled='true' :refresher-triggered='loading'
		:lower-threshold='20'	:refresher-threshold="50" @refresherrefresh="refreshPull" @scrolltolower="scrollLower">
			<view class="list" v-if='current==0'>
				<view class="list-item" :key='index' v-for="(item,index) in list">
					<view class="img-wrap">
						<image class="img" :src="item.img"></image>
					</view>
					<view class="content">
						<view class="title"><text>{{item.title}}</text></view>
						<view class="desc">{{item.desc}}<text class="time">{{item.time}}</text>次</view>
						<view class="btn"><text>服务记录</text></view>
					</view>
				</view>
			</view>
			<view class="list" v-if='current==1'>
				<view class="list-item" :key='index' v-for="(item,index) in list">
					<view class="img-wrap">
						<image class="img" :src="item.img"></image>
					</view>
					<view class="content">
						<view class="title"><text>{{item.title}}</text></view>
						<view class="desc">{{item.desc}}<text class="time">{{item.time}}</text>次</view>
						<view class="btn"><text>服务记录</text></view>
					</view>
				</view>
			</view>
			<view class="list" v-if='current==2'>
				<view class="list-item" :key='index' v-for="(item,index) in list">
					<view class="img-wrap">
						<image class="img" :src="item.img"></image>
					</view>
					<view class="content">
						<view class="title"><text>{{item.title}}</text></view>
						<view class="desc">{{item.desc}}<text class="time">{{item.time}}</text>次</view>
						<view class="btn"><text>服务记录</text></view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>

	</view>
</template>
<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	const total = ref(20);
	const items = reactive(["全部", "付费项目", "免费项目"]);
	const current = ref(0);
	const status = ref("loading");
	const loading = ref(true);
	const list = reactive([])
	onMounted(() => {
		getData()
	})

	const getData = () => {
		list.length = [];
		status.value = 'loading'
		new Promise((resolve, rejct) => {
			setTimeout(() => {
				resolve(true)
			}, 2000)
		}).then(res => {
			status.value = "more";
			for (let i = 0; i < 6; i++) {
				list.push({
					img: "./../../static/shoufei.png",
					title: '限时优惠/血糖测量服务包',
					desc: "剩余次数:",
					time: "6"
				})
			}
		})
	}


	const refreshPull = function() {
		loading.value = true;
		list.length = [];
		status.value = "more";
		new Promise((resolve, rejct) => {
			setTimeout(() => {
				resolve(true)
			}, 500)
		}).then(res => {
			loading.value = false;
			status.value = "more";
			for (let i = 0; i < 6; i++) {
				list.push({
					img: "./../../static/shoufei.png",
					title: '限时优惠/血糖测量服务包',
					desc: "剩余次数:",
					time: "6"
				})
			}
		})
	}

	const scrollLower = function() {
		if (list.length >= total.value) {
			status.value = 'no-more'
			return
		}
		status.value = 'loading';
		new Promise((resolve, rejct) => {
			setTimeout(() => {
				resolve(true)
			}, 2000);
		}).then(res => {
			for (let i = 0; i < 5; i++) {
				list.push({
					img: "./../../static/shoufei.png",
					title: '限时优惠/血糖测量服务包',
					desc: "剩余次数:",
					time: "6"
				})
				status.value = "more";
			}
		})
	}

	const onClickItem = (event) => {
		current.value = event.currentIndex;
		total.value = 20;
		getData()

	}

	const back = () => {
		uni.navigateBack({
			delta: 2
		})
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: rgba(245, 247, 251, 1);
	}

	.tab {
		line-height: 80rpx;
		height: 80rpx;
	}

	.scroll {
		height: calc(100vh - 88rpx - 80rpx);
	}

	.list {
		padding: 30rpx 24rpx 0;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.list-item {
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
	}

	.img,
	.img-wrap {
		width: 180rpx;
		height: 180rpx;
		margin-right: 40rpx;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.title {
		font-size: 30rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		margin: 10rpx 0;
	}

	.desc {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(96, 105, 114, 1);
		margin-bottom: 10rpx;
	}

	.btn {
		display: inline-block;
		font-size: 24rpx;
		font-weight: 400;
		color: #fff;
		background-color: rgba(73, 185, 173, 1);
		padding: 10rpx 15rpx 10rpx 15rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.time {
		font-size: 24rpx;
		color: rgba(246, 87, 85, 1);
		font-weight: 700;
		margin: 0 9rpx;
	}
</style>
