<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" rightText="完成" left-icon="left" :fixed="true" statusBar='true' title="选择成员"
			height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<scroll-page :list="list" :height="height"></scroll-page>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue";
	import ScrollPage from "./../../components/ScrollPage/ScrollPage.vue";
	const height = ref("");
	const list = reactive([]);

	onMounted(() => {
		let info = uni.getSystemInfoSync();
		height.value = info.safeArea.height - uni.upx2px(44);
		getData();
	})

	const getData = () => {
		uni.showLoading({
			title: "正在加载中..."
		})
		let maps = ["A", "B", "C", "D", "F", "G", "H", "I", "K", "M"];
		for (let i = 0; i < 10; i++) {
			list.push({
				title: maps[i],
				list: [{
						checkbox: true,
						checked: false,
						profile: {
							avatar: "./../../static/woman.png",
							nickName: "安娜",
							age: 34,
							icon: "./../../static/icon_woman.png",
							tag: [{
									text: "发育不良",
									status: 'error'
								},
								{
									text: "低血糖",
									status: 'error'
								}
							],
						}
					},
					{
						checked: true,
						checkbox: true,
						profile: {
							avatar: "./../../static/woman.png",
							nickName: "安娜",
							age: 34,
							icon: "./../../static/icon_woman.png",
							tag: [{
									text: "发育不良",
									status: 'error'
								},
								{
									text: "低血糖",
									status: 'error'
								}
							],
						}
					}, {
						checked: false,
						checkbox: true,
						profile: {
							avatar: "./../../static/woman.png",
							nickName: "安娜",
							age: 34,
							icon: "./../../static/icon_woman.png",
							tag: [{
									text: "发育不良",
									status: 'error'
								},
								{
									text: "低血糖",
									status: 'error'
								}
							],
						}
					},
				]

			})

			uni.hideLoading();
		}
	}

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		height: 100vh;
	}
</style>