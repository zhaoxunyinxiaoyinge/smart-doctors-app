<template>
	<view class="container">
		<!-- app端和h5留下的状态栏高度 -->
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back"  left-icon="left" leftText="返回" :fixed="true" statusBar='true' title="未签约居民" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<scroll-page :list="list"  :height="height"></scroll-page>
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted} from "vue";
	import ScrollPage from "./../../components/ScrollPage/ScrollPage.vue";
	
	const list=reactive([]);
	const height=ref(0);
	
	onMounted(async () => {
		console.log(uni.getSystemInfoSync().windowHeight,666);
		height.value = (uni.getSystemInfoSync().windowHeight - uni.upx2px(130)) ;
		let result = await getData();
		list.push(...result);
	})
	
	const getData = () => {
		uni.showLoading({
			title: "正在加载中...."
		})
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 1000)
		}).then(res => {
			uni.hideLoading();
			let result = [];
			let maps = ["A", "B", "C", "D", "F", "G", "H", "I", "K", "M"];
			for (let i = 0; i < 10; i++) {
				result.push({
					title: maps[i],
					list: [{
							checked:false,
							value:"",
							profile:{
							avatar: "./../../static/woman.png",
							nickName: "安娜"},
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
							btn:true,
							btnText:"已建档未签约"
	
						},
						{
							checked:false,
							value:"",
							profile:{
							avatar: "./../../static/woman.png",
							nickName: "安娜"},
							age: 14,
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
							btn:true,
							btnText:"已建档未签约"
	
						},
						{
							checked:false,
							value:"",
							profile:{
							avatar: "./../../static/woman.png",
							nickName: "安娜"},
							age: 14,
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
							btn:true,
							btnText:"已建档未签约"
	
						}
					]
	
				})
	
	
			}
			return result;
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		})
	}
	
</script>

<style>
	.search-input .search {
		width: 702rpx;
		height: 80rpx;
		background-color: rgba(245, 247, 251, 1);
		border-radius: 20rpx;
		box-sizing: border-box;
		line-height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;

				margin:10rpx auto;
	}
	

</style>
