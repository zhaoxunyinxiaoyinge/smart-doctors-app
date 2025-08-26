<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar left-icon="left" rightText="完成" @clickLeft="back" :fixed="true" statusBar='true' title="设置标签" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<view class="list-item"  >
					<view class="title"><text>标签名字</text></view>
					<view class="label"><text>高血压</text></view>
				</view>
				<view class="list-item border">
					<view class="title"><text>标签成员(0)</text></view>
					<view class="label" @click="addResident">
						<image class="icon" src="./../../static/info.png"></image><text>添加居民</text>
					</view>
				</view>
			</view>
		</view>
		<scroll-page :list="list" :height="height"></scroll-page>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		getCurrentInstance
	} from "vue";
	 import {
	    onLoad,
	    onShow,
	  } from "@dcloudio/uni-app";

	import ScrollPage from "./../../components/ScrollPage/ScrollPage.vue";
	const app = getCurrentInstance();
	const height = ref(0);
	const list = reactive([]);
	
	onLoad((res)=>{
		console.log(res,"res");//暂时不设置
	})
	
	onMounted(async () => {
		uni.showLoading({
			title: "正在加载中..."
		})
		const query = uni.createSelectorQuery().in(app);
		query.select('.content').boundingClientRect(async data => {
			console.log( await uni.getSystemInfo())
			 height.value = await uni.getSystemInfo().then(res=>res.screenHeight -uni.upx2px(88)-data.height);
		}).exec();
		
		let maps = ["A", "B", "C", "D", "F", "G", "H", "I", "K", "M"];
			for (let i = 0; i < 10; i++) {
				list.push({
					title: maps[i],
					list: [{
							checked:true,
							value:"",
							profile:{
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
								checked:true,
								value:"",
								profile:{
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
	})
	
	const addResident=()=>{
		uni.navigateTo({
			url:"/packageA/checkMember/checkMember"
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:1
		})
	}
	
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
	}

	.content {
		padding: 0 24rpx;
		background-color: #fff;
	}

	.list-item {
		padding: 30rpx 0 36rpx;
		color: rgba(197, 200, 203, 1);
		font-size: 26rpx;
		font-weight: 400;
	}

	.title {
		margin-bottom: 11rpx;
	}

	.label {
		font-size: 28rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
		vertical-align: middle;
	}

	.border {
		border-top: 1rpx solid #eee;
	}
</style>
