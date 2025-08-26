<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft.navtive="handleBack" title="我管理的团队" :fixed="true" statusBar='true' left-icon="left"
			height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<view class="title">
					<text>我管理的团队</text>
				</view>
				<view class="team-list">
					<view class="team-list-item" @click.native="myTeamDetail">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
					<view class="team-list-item" @click.native="myTeamDetail">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
					<view class="team-list-item" @click.native="myTeamDetail">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="title">
					<text>我加入的团队</text>
				</view>
				<view class="team-list">
					<view class="team-list-item" @click="handleJumpe">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
					<view class="team-list-item" @click="handleJumpe">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
					<view class="team-list-item" @click="handleJumpe">
						<view>
							<image class="avatar" src="./../../static/list-pic.png"></image>
						</view>

						<view class="text">
							<text class="name">李晓丽专科团队</text>
							<text class="mb-10">所属机构:佛山市东岳社区卫生服务站</text>
							<text class="mb-10">团队编号:0234853</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom">
			<text class="btn" @click="handleAdd(['fade', 'slide-right'])">加入团队</text>
		</view>
	</view>

	<uni-transition ref="ani" custom-class="transition" :mode-class="['fade', 'slide-right']" :styles="styles"
		:show="show">
		<view class="fun-list">
			<uni-list :border="false" class='fun-list-menu'>
				<uni-list-item class="fun-list-item" @click="handleSearch"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					:border="false" title="搜索团队" note="搜索团队名称和编号申请加入" link />
				<uni-list-item @click="handleSacle" class="fun-list-item"
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					:border="false" title="扫一扫" note="扫描团队二维码快速申请加入" link />
			</uni-list>
		</view>
	</uni-transition>

	<!-- #ifdef H5 -->
	<uni-transition ref="ani" custom-class="transition" :mode-class="['fade', 'slide-right']" :styles="styles"
		:show="isCan">
		<view id="reader" class="readers"></view>
	</uni-transition>
	<!-- #endif -->

	<uni-transition ref="ani" custom-class="transition" :mode-class="['fade', 'slide-right']" :styles="searchStyles"
		:show="isSearch">
		<view class="search-content">
			<view class="search">
				<view class="input">
					<uni-icons type="search" size="20"></uni-icons>
					<input class="uni-input" clearable @confirm='handleConfirm' placeholder-style="font-size:14px"
						v-model="search" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
				</view>
				<view @tap="handleCancles"><text>取消</text></view>
			</view>
			<view class="history">
				<text>历史搜素</text>
				<image @tap='handleCancles' class="del" src="./../../static/del.png"></image>
			</view>
			<view class="keyworld">
				<view class="list">
					<view class="list-item" :key='index' v-for='(item,index) in historyList'>
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
	</uni-transition>

</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue";

	// #ifdef H5
	import {
		Html5QrcodeScanner
	} from "html5-qrcode";
	// #endif
	const show = ref(false);

	const styles = reactive({
		position: "fixed",
		width: "100%",
		height: "100vh",
		// #ifdef APP
		paddingTop: "44px",
		// #endif
		background: "rgba(245, 247, 251, 1)",
		zIndex: 9,
		top: 0,
		left: 0,
		boxSizing: 'borderBox'
	});

	const searchStyles = reactive({
		position: "fixed",
		// #ifdef APP
		paddingTop: "88px",
		// #endif
		width: "100%",
		height: "100vh",
		background: "rgba(245, 247, 251, 1)",
		zIndex: 9,
		top: 0,
		left: 0,
		boxSizing: 'borderBox'
	})

	const type = ref('fade');
	const isCan = ref(false);

	const isSearch = ref(false);
	const historyList = reactive([]);

	const handleAdd = (val) => {
		show.value = true;
		type.value = val;
		styles.zIndex = 12;
	}
	// #ifndef H5
	const handleSacle = () => {
		uni.scanCode({
			onlyFromCamera: false,
			scanType: ['qrCode'],
			complete(result) {
				uni.redirectTo({
					url: "/packageC/applyJoinTeam/applyJoinTeam"
				})
			}
		})
		styles.zIndex = 160;
	}
	// #endif
	const search = ref("");

	const handleCancles = () => {
		search.value = "";
		isSearch.value = false;
	}
	const handleDel=()=>{
		console.log("执行删除操作")
	}

	// #ifdef H5
	const handleSacle = () => {
		isCan.value = true;
		setTimeout(() => {
			let html5QrcodeScanner = new Html5QrcodeScanner(
				"reader", {
					fps: 10,
					qrbox: {
						width: 250,
						height: 250
					}
				},
				/* verbose= */
				false);
			html5QrcodeScanner.render((decodeText, decodeResult) => {
				uni.redirectTo({
					url: "/packageC/applyJoinTeam/applyJoinTeam"
				})
				html5QrcodeScanner.clear();
				isCan.value = false;
			}, (err) => {
				console.warn(err)
			});

		})

	}
	// #endif

	const handleSearch = () => {
		isSearch.value = true;
		searchStyles.zIndex = 12;
	}

	const myTeamDetail = () => {
		uni.redirectTo({
			url: "/packageC/teamManagement/teamManagement"
		})
	}

	const handleJumpe = () => {
		uni.redirectTo({
			url: "/packageC/teamManagement/teamManagement?isMyTeam=" + true
		})
	}

	const handleBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	const handleConfirm = (value) => {
		const val = value.detail.value;
		let res = historyList.find(item => item === val);
		if (!res) {
			historyList.push(val);
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: rgba(245, 247, 251, 1);
		position: relative;
	}

	.content {
		position: relative;
		padding-bottom: 80rpx;
		z-index: 10;

	}

	.list {
		padding: 20rpx 24rpx 0rpx 24rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;

	}

	.title {
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		height: 45rpx;
		line-height: 45rpx;
		margin-bottom: 30rpx;
	}

	.team-list-item {
		display: flex;
		align-items: center;
		padding-bottom: 30rpx;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
		margin-right: 40rpx;
	}

	.text {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(96, 105, 114, 1);
		justify-content: flex-start;
	}

	.name {
		margin: 0 10rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.mb-10 {
		margin-bottom: 10rpx;
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 8rpx 0;
		background-color: #fff;
		z-index: 11;
	}

	.btn {
		display: block;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		font-weight: 400;
		background-color: rgba(73, 185, 173, 1);
		width: 702rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20rpx;
		margin: 0 auto;

	}

	.fun-list {
		padding: 30rpx 24rpx 0;
		/* #ifndef MP-WEIXIN */
		padding-top: 22rpx;
		/* #endif */

	}

	.fun-list-menu.uni-list {
		background: rgba(245, 247, 251, 1);
	}

	.fun-list-item {
		margin-bottom: 30rpx;
		background-color: #fff;
	}

	.readers,
	.search-content {
		/* #ifndef MP-WEIXIN */
		/* top: var(--status-bar-height); */
		/* #endif */
		width: 100%;
		height: calc(100vh - var(--status-bar-height));
		background-color: #fff;
	}



	.search-content {
		box-sizing: border-box;
		padding: 0 24rpx;
		z-index: 1
	}

	.search,
	.input {
		display: flex;
	}

	.search {
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		padding-top: 10rpx;
		margin-bottom: 34rpx;
	}

	.input {
		width: 80%;
		height: 74rpx;
		line-height: 74rpx;
		background: rgba(245, 247, 251, 1);
		border-radius: 20rpx;
		align-items: center;
		padding-left: 30rpx;
		font-size: 12px;
	}

	.cancle {
		font-size: 28rpx;
		font-weight: 400;
	}

	.history {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 42rpx;
	}

	.del {
		width: 30rpx;
		height: 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(28, 32, 35, 1);
	}

	.list {
		display: flex;
		flex-wrap: wrap;
	}

	.list-item {
		padding: 14rpx 33rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(197, 200, 203, 1);
		background-color: rgba(245, 247, 251, 1);
		border-radius: 10rpx;
		/* #ifdef APP */
		z-index: 10;
		/* #endif */
		margin-right: 30rpx;
		/* #ifndef APP */
		z-index: 10;
		/* #endif */

	}
</style>