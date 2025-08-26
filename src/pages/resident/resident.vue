<template>
	<view class="container">
		<!-- app端 -->
		<!-- #ifdef APP -->
		<view class="uni-status-bar"></view>
		<uni-nav-bar  :fixed="true" statusBar='true' title="居民" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="search-input">
			<uni-search-bar class="search" :clearButton="'none'" cancelButton='none' :focus="false" @focus="focus"
				:maxlength="100">
			</uni-search-bar>
		</view>
		<view class="panle">
			<view class="panle-list-item" @click="jumToNoSign">
				<view style="background-color: #fff;" class="item">
					<image class="img" src="./../../static/icon-1.png"></image>
					<text class="text">未签约居民</text>
				</view>
			</view>
			<view class="panle-list-item" @click="jumToLabel">
				<view style="background-color: #fff;" class="item">
					<image class="img" src="./../../static/icon-2.png"></image>
					<text class="text">标签</text>
				</view>
			</view>
			<view class="panle-list-item" @click="batchSender">
				<view style="background-color: #fff;" class="item last">
					<image class="img" src="./../../static/icon-3.png"></image>
					<text class="text">已发送信息</text>
				</view>
			</view>
		</view>
		<scroll-page :list="list" :height="height" ></scroll-page>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive,
		onActivated,
	} from "vue";

	import {
		onHide,
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	
	import TIM from "tim-js-sdk";

	const focuss = ref(false)

	import ScrollPage from "./../../components/ScrollPage/ScrollPage.vue";

	const height = ref("");
	const scroll = ref(null);
	let list = reactive([])
	let tim=uni.tim;
	
	//拿到tim对象

	onHide(() => {
		console.log("onHide")
		focuss.value = true;
	})

	onShow(() => {
		setTimeout(() => {
			focuss.value = false;
		}, 500)
		
	})

	onMounted(async () => {
		height.value = uni.getSystemInfoSync().windowHeight - 50 - 190;
		await  getFriends();
	})
	
	let onSdkReady = async function(event) {
		await  getFriends();
	};
	
	tim.on(TIM.EVENT.SDK_READY, onSdkReady);
	
	//模仿添加好友，暂时不使用
	const addFriends=()=>{
		let promise = tim.addFriend({
		  to: '199210',
		  source: 'AddSource_Type_Web',
		  remark: '小橙子',
		  groupName: '好友',
		  wording: '我是赵训银',
		  type: TIM.TYPES.SNS_ADD_TYPE_BOTH,
		});
		promise.then(function(imResponse) {
		  // 添加好友的请求发送成功
		  const { code } = imResponse.data;
		  if (code === 30539) {
		    // 30539 说明 user1 设置了【需要经过自己确认对方才能添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
		  } else if (code === 0) {
		    // 0 说明 user1 设置了【允许任何人添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_LIST_UPDATED 事件
		  }
		}).catch(function(imError) {
		  console.warn('addFriend error:', imError); // 添加好友失败的相关信息
		});
	}
	

	//获取好友列表
	const getFriends=()=>{
		uni.showLoading({
			title:"正在加载"
		});
		tim.getFriendList().then(function(res) {
			console.log(res,"res")
			uni.hideLoading();
			let items={title:"Z",list:[]}
			res.data.forEach(item=>{
				item.profile.icon='./../../static/icon_woman.png';
				items.list.push(item);
			})
			list.push(items);
			}).catch(err => {
			console.log("这里发生错误了", err)
		})
	}

	const getData = () => {
		
	// 查询所有账号
	
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
							checked: false,
							value: "",
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
							]

						},
						{
							checked: false,
							value: "",
							avatar: "./../../static/woman.png",
							nickName: "小妹娜",
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
							]

						},
						{
							checked: false,
							value: "",
							avatar: "./../../static/woman.png",
							nickName: "小妹娜",
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
							]

						}
					]

				})


			}
			return result;
		})
	}

	const focus = () => {
		console.log("load", focuss.value)
		if (focuss.value) {
			return
		}
		uni.navigateTo({
			url: "/packageA/residentSearch/residentSearch"
		})
	}

	const jumToNoSign = () => {
		uni.navigateTo({
			url: "/pages/residentNoSignPage/residentNoSignPage"
		})
	}

	const jumToLabel = () => {
		uni.navigateTo({
			url: "/packageA/mark/mark"
		})
	}

	const batchSender = () => {
		uni.navigateTo({
			url: '/packageA/batchsender/batchsender'
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		overflow: hidden;
	}

	.search-input {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	.img {
		width: 80rpx;
		height: 80rpx;
		margin-right: 32rpx;
	}

	.panle {
		width: 100%;
		padding: 30rpx 24rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
	}

	.item {
		height: 80rpx;
		padding-bottom: 40rpx;
		display: flex;
		align-items: center;
	}

	.last {
		padding-bottom: 0;
	}
</style>

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
	}
</style>