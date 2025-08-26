<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" title="服务管理" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<uni-segmented-control class="tab" :current="current" :values="items" @clickItem="onClickItem" styleType="text"
			activeColor="rgba(73, 185, 173, 1)"></uni-segmented-control>
		<scroll-view class="content" :scroll-y='true' :refresher-threshold="50" :refresher-enabled='true'
			:refresher-triggered='status' @refresherrefresh="refreshPull" @scrolltolower="scrollLower">
			<view v-if="current === 0">
				<ServeList :list="list" @detail="jumToDetail"></ServeList>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
			<view v-if="current === 1">
				<ServeList :list="list" @detail="jumToDetail"></ServeList>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
			<view v-if="current === 2">
				<ServeList :list="list" @detail="jumToDetail"></ServeList>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
			<view v-if="current === 3">
				<ServeList :list="list" @detail="jumToDetail"></ServeList>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
			<view v-if="current === 4">
				<ServeList :list="list" @detail="jumToDetail"></ServeList>
				<uni-load-more :status="loading"></uni-load-more>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		reactive,
		ref,
		onMounted
	} from "vue";

	import ServeList from "./../../components/ServeList/ServeList.vue"
	export default {
		comments: {
			ServeList
		},
		setup() {
			const items = reactive(["全部", "待审核", "待服务", "已完成"]);
			const current = ref(0);
			const list = reactive([]);
			const status = ref(false);
			const loading = ref('loading');
			const total = ref(0);

			onMounted(() => {
				getData();
			})

			const scrollLower = () => {
				if (total.value >= 20) {
					return
				}
				loading.value = "loading"
				new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(true)
					}, 1000)
				}).then(res => {
					for (let i = 0; i < 10; i++) {
						list.push({
							avatar: "./../../static/avatar_icon.png",
							name: "伟东",
							age: "56",
							serve: '老年人服务包',
							serveName: "老年人包",
							status: "0",
							serveTime: new Date().toLocaleDateString()
						})
					}
					total.value = list.length;
					if (list.length >= 20) {
						loading.value = "no-more";
					} else {
						loading.value = 'more';
					}
				})
			}

			const back = () => {
				uni.navigateBack({
					delta: 1
				})
			}


			const jumToDetail = () => {
				uni.navigateTo({
					url: "/pages/serveDetail/serveDetail"
				})

			}

			// 下拉刷新事件处理函数
			const refreshPull = () => {
				status.value = true;
				setTimeout(() => {
					getData()
					status.value = false;
				}, 2000)
			}


			const getData = () => {
				list.length = 0
				loading.value = 'loading';
				new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve(true)
					}, 1000)
				}).then(res => {
					for (let i = 0; i < 10; i++) {
						list.push({
							avatar: "./../../static/avatar_icon.png",
							name: "伟东",
							age: "56",
							serve: '老年人服务包',
							serveName: "老年人包",
							status: "0",
							serveTime: new Date().toLocaleDateString()
						})
					}
					loading.value = 'more';
					total.value = list.length;
				})
			}

			const onClickItem = () => {

			}
			return {
				items,
				current,
				onClickItem,
				list,
				status,
				refreshPull,
				back,
				total,
				loading,
				scrollLower,
				jumToDetail
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 0 24rpx;
	}

	.tab {
		height: 60rpx;
	}

	.content {
		height: calc(100vh - 88rpx - 60rpx)
	}
</style>
