<template>
	<view class="content">
		<view class="uni-status-bar"></view>
		<view class="bg">
			<view class="header">
				<view class="user" @click="jumpMyCenter">
				<image class="image" v-if="users.avatar_file!=''" :src="users.avatar_file?.url"></image>
				 <text class="name"   v-if="users.nickname">{{users.nickname||users.username}}</text>
				</view>
				<view @click="handlePrview">
					<image class="erweima" src="./../../static/erweima.png"></image>
				</view>
			</view>
			<view class="card">
				<text class="round">
				</text>
				<view class="area">
					<text class="number">{{signPerson.toFixed(0)}}</text>
					<text class="persons">签约人数</text>
				</view>
				<view class="area">
					<text class="number">{{signPersonTwo.toFixed(0)}}</text>
					<text class="persons">签约指标</text>
				</view>
				<view class="area">
					<text class="number">{{signPersonThree.toFixed(0)}}%</text>
					<text class="persons">签约率</text>
				</view>
				<view class="area">
					<text class="number">{{signPersonFour.toFixed(0)}}</text>
					<text class="persons">服务次数</text>
				</view>
				<view class="area">
					<text class="number">{{signPersonFirth.toFixed(0)}}</text>
					<text class="persons">服务人数</text>
				</view>
				<view class="area">
					<text class="number">{{signPersonSix.toFixed(0)}}%</text>
					<text class="persons">好评率</text>
				</view>
			</view>

			<view class="list">
				<view class="icon" @click="jumpToNews">
					<image src="../../static/serve-one.png" class="images"></image>
					<text class="icon-text">新建档案</text>
				</view>
				<view class="icon" @click="jumpToSignMange">
					<image src="../../static/serve-sencond.png" class="images"></image>
					<text class="icon-text">签约管理</text>
				</view>
				<view class="icon" @click="jumpToServeMange">
					<image src="../../static/serve-three.png" class="images"></image>
					<text class="icon-text">服务管理</text>

				</view>
			</view>

		</view>

		<view class="section">
			<view class="section-title">
				<view class="qianyue"><text>申请签约</text><text class="rounds">{{signlist.length}}</text></view>
				<text class="all" @click="looksignAll">查看全部</text>
			</view>
			<sign-list :list="signlist" @detail="jumpDetail"></sign-list>
		</view>
		<view class="section">
			<view class="section-title">
				<view class="qianyue"><text>服务申请</text><text class="rounds">{{serveList.length}}</text></view>
				<text class="all" @click="lookserveAll">查看全部</text>
			</view>
			<serve-list :list="serveList" @detail="jumpServeDetail"></serve-list>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		onMounted,
		ref,
		toRefs
	} from "vue";
	import SignList from "./../../components/SignList/SignList.vue";
	import ServeList from "./../../components/ServeList/ServeList.vue";
	import {
		getAnimationNumber
	} from "./../../utils/animations.js"
	import {
		store
	} from "./../../uni_modules/uni-id-pages/common/store.js"

	import {
		onShow
	} from "@dcloudio/uni-app"


	const signlist = reactive([]);
	const serveList = reactive([]);

	let users = ref({nickname:"",avatar_file:{url:""}});

	const signPerson = ref(0);
	const signPersonTwo = ref(0);
	const signPersonThree = ref(0);
	const signPersonFour = ref(0);
	const signPersonFirth = ref(0);
	const signPersonSix = ref(0);

	/**
	 * 判断当前的登录用户的token是否存在，如果不存在，那么清除当前的用户信息，跳转到登录页面
	 */
	onShow(() => {
		let token = uni.getStorageSync("uni_id_token");
		if (!token) {
			uni.redirectTo({
				url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
			})
		}
	})

	onMounted(async () => {
		getUsersInfo();
		uni.showLoading({
			title: "正在加载..."
		})

		new Promise((resove, reject) => {
			setTimeout(() => {
				resove(true);
			}, 1000)
		}).then(res => {
			uni.hideLoading();
			for (let i = 0; i < 10; i++) {
				signlist.push({
					avatar: "./../../static/avatar_icon.png",
					name: "伟东" + i,
					age: "56" + i,
					idNum: '421023198910030517',
					tuandui: "杨兰团队",
					serveName: "老年人包",
					status: "0"
				})

				serveList.push({
					avatar: "./../../static/avatar_icon.png",
					name: "周璟荣",
					age: 21,
					serve: "健康大礼包",
					serveName: "年轻人",
					serveTime: new Date().toLocaleDateString(),
					status: 1
				})
			}
		})
		getAnimationNumber(signPerson, 1000, 1000);
		getAnimationNumber(signPersonTwo, 1000, 1000)
		getAnimationNumber(signPersonThree, 1000, 90)
		getAnimationNumber(signPersonFour, 1000, 1000)
		getAnimationNumber(signPersonFirth, 1500, 1000)
		getAnimationNumber(signPersonSix, 1000, 60)
	})
	
	
	const getUsersInfo=()=>{
			 let infos=store.userInfo;
			 users.value=infos;
		}

	const handlePrview = () => {
		uni.navigateTo({
			url: "/packageC/scan/scan"
		})
	}

	/**
	 * 新建文档
	 */
	const jumpToNews = () => {
		uni.navigateTo({
			url: '/pages/record/record'
		})
	}

	/**
	 * 签约文档
	 */
	const jumpToSignMange = () => {
		uni.navigateTo({
			url: "/pages/signmange/signmange"
		})
	}
	/**
	 * 服务管理
	 */

	const jumpToServeMange = () => {
		uni.navigateTo({
			url: "/pages/servemange/servemange"
		})
	}

	const looksignAll = () => {
		uni.navigateTo({
			url: "/pages/signmange/signmange"
		})
	}

	const lookserveAll = () => {
		uni.navigateTo({
			url: "/pages/servemange/servemange"
		})
	}

	const jumpDetail = () => {
		uni.navigateTo({
			url: "/pages/signdetail/signdetail"
		})
	}

	const jumpServeDetail = () => {
		uni.navigateTo({
			url: "/pages/serveDetail/serveDetail"
		})
	}

	const jumpMyCenter = () => {
		uni.switchTab({
			url: "/pages/my/index"
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: rgba(245, 247, 251, 1);
		;
	}

	.bg {
		background: linear-gradient(180deg, rgba(225, 250, 247, 1) 0%, rgba(255, 255, 255, 1) 100%);
	}

	/* #ifndef MP-WEIXIN */
	.uni-status-bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/* #endif */



	.header {
		height: 176rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 24rpx;
		align-items: flex-end;
		margin-bottom: 42rpx;
	}



	.user {
		display: flex;
		align-items: center;
	}

	.image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.erweima {
		height: 40rpx;
		width: 40rpx;
	}

	.card {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		position: relative;
		width: 702rpx;
		height: 309rpx;
		border-radius: 5rpx;
		margin: 0 auto;
		padding: 45rpx 0;
		box-sizing: border-box;
		align-content: space-between;
		background: rgba(73, 185, 173, 1);
		background-position: left bottom;
		margin-bottom: 30rpx;

	}

	.area {
		display: flex;
		flex-direction: column;
		width: 33%;
		align-items: center;
	}

	.round {
		position: absolute;
		width: 38rpx;
		height: 38rpx;
		background-color: rgba(73, 185, 173, 1);
		transform: rotate(45deg);
		left: 18.98px;
		top: -12rpx;
		border-raduis: 5rpx;


	}

	.number {
		font-size: 50rpx;
		font-weight: 700;
		color: #fff;
		line-height: 70rpx;
	}

	.persons {
		font-size: 20rpx;
		font-weight: 400;
		color: #fff;
		line-height: 28rpx;
	}

	.list {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		padding-bottom: 30rpx;
	}

	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.images {
		margin-bottom: 5rpx;
		width: 120rpx;
		height: 120rpx;
	}

	.icon-text {
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(28, 32, 35, 1);

	}

	.section {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 24rpx 20rpx;
	}

	.section-title {
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		align-items: center;
	}

	.all {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(28, 32, 35, 1);
	}

	.rounds {
		border-radius: 10rpx 10rpx 10rpx 0;
		background-color: rgba(73, 185, 173, 1);
		color: #fff;
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		font-size: 20rpx;
		vertical-align: middle;
		line-height: 30rpx;
	}
</style>

<style lang="css">
	/* #ifdef APP-PLUS */
	.section-list .uni-list-item__container {
		padding: 29rpx 0 !important;
		;
	}

	/* #endif */
</style>