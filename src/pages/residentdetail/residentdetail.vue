<template>
	<view class="container">
		<view class="header-bg">
			<!-- app端和h5留下的状态栏高度 -->
			<!-- #ifdef APP -->
			<uni-nav-bar @clickLeft="back" :fixed="true" left-icon="left" :border='false'
				:backgroundColor='"rgba(73, 185, 173, 1)"' statusBar='true' height="44px">
			</uni-nav-bar>
			<!-- #endif -->
		</view>
		<view class="header">
			<view class="avatar">
				<image class="img" src="./../../static/avatar_doctor.png"></image>
			</view>
			<view class="name"><text>翟枫君</text></view>
			<view class="tag"><text>已签约</text></view>

			<view class="list" style="width: 100%;">
				<view v-for="(item, index) in notelist" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;" @click="()=>jumToPage(index)">
						<image class="icons" :src="item.img"></image>
						<text class="text">{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="framly-info">
			<view class="persons"><text>个人信息</text></view>
			<view class="framly-list">
				<uni-list :border="false">
					<uni-list-item class='uni-list-items' v-for="item in userinfo">
						<template v-slot:header>
							<view class="list-item-label"><text>{{item.title}}</text></view>
						</template>
						<template v-slot:body>
							<view class="list-item-content" v-if="item.tag">
								<view v-for="sItem in item.list"
									:class="['tag-list-item',sItem.status=='success'?'success':'error']">
									<text>{{sItem.text}}</text>
								</view>
							</view>
							<view class="list-item-content" v-else><text>{{item.content}}</text></view>
						</template>
						<template v-slot:footer>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<view class="send-message" @click="handleSendMessage">
			<uni-icons type="chat" size="28"></uni-icons>
			<text>发送消息</text>
		</view>
		<view class="framly-info">
			<view class="persons"><text>家庭成员</text></view>
			<view class="menmber-list">
				<scroll-view :scroll-x="true">
					<view class="scroll">
						<view v-for="item in list" id="demo1" class="scroll-view-item list-item">
							<image class="avatar-menmber" :src="item.avatar"></image>
							<view class="content-list">
								<view class="names">
									<text class="nickname">{{item.nickName}}</text>
									<text class="age">{{item.age}}岁</text>
									<image class="icon" :src="item.icon"></image>
								</view>
								<view class="conact">
									<text>{{item.conactName}}</text>
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="bottom" @click='addserve'>
			<button class="btn" hover-class="btn-active">添加服务</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		onLoad, onShow
	} from "@dcloudio/uni-app"
	import TIM from "tim-js-sdk";
	
	onLoad((options)=>{
		userInfo.value=options;
	})
	

	const readyTime = ref(false);
	const userInfo=ref(null);
	const notelist = reactive([{
			text: "健康档案",
			img: "./../../static/icon-2.png"
		},
		{
			text: "健康记录",
			img: "./../../static/icon-2.png"
		},
		{
			text: "签约信息",
			img: "./../../static/icon-2.png"
		},
		{
			text: "服务记录",
			img: "./../../static/icon-2.png"
		}
	])

	const userinfo = reactive([{
			title: "身份证号",
			content: "334526489542563345",
		},
		{
			title: "学历",
			content: "北京大学",
		},
		{
			title: "联系方式",
			content: "17603016347",
		},
		{
			title: "血糖",
			tag: true,
			list: [{
					text: "四个字啦",
					status: "success"
				},
				{
					text: "低血糖",
					status: "error"
				}
			]
		}

	])



	const list = reactive([{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
			age: "58",
			icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: '母亲'
		},
		{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
			age: "58",
			icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: '母亲'
		},
		{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
			age: "58",
			icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: '母亲'
		}
	])

	const back = () => {
		uni.navigateBack({
			delta: 2
		})
	}

	const addserve = () => {
		uni.navigateTo({
			url: '/pages/residentaddserve/residentaddserve'
		})
	}

	const jumToPage = (index) => {
		if (index == 0) {
			uni.navigateTo({
				url: '/pages/healthpage/healthpage'
			})
		}
		if (index == 1) {
			uni.navigateTo({
				url: '/pages/healthnote/healthnote'
			})
		}
		if (index == 2) {
			uni.navigateTo({
				url: '/pages/signdetail/signdetail'
			})
		}

		if (index == 3) {
			uni.navigateTo({
				url: '/pages/serveDetail/serveDetail'
			})
		}
	}

	const handleSendMessage = () => {
		uni.navigateTo({
			url:"/packageB/talkmessage/talkmessage?type=" + userInfo.value.type + "&c2c=C2C"+userInfo.value.c2c
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		padding-bottom: 98rpx;
	}

	.header-bg {
		background-color: rgba(73, 185, 173, 1);
		height: 400rpx;
	}

	.header {
		height: 404rpx;
		width: 702rpx;
		margin: 74rpx auto 0;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -126rpx;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		padding: 8rpx;
		background-color: #fff;
		box-sizing: border-box;
		overflow: hidden;
		margin-bottom: 20rpx;
		margin-top: -74rpx;
	}

	.img {
		height: 164rpx;
		width: 164rpx;
	}

	.name {
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
	}

	.tag {
		height: 34rpx;
		width: 80rpx;
		border: 1rpx solid rgba(73, 185, 173, 1);
		text-align: center;
		line-height: 34rpx;
		background-color: rgba(234, 254, 250, 1);
		color: rgba(73, 185, 173, 1);
		font-size: 20rpx;
		font-weight: 400;
		border-radius: 10rpx;
		margin-top: 5rpx;
	}

	.tag-list-item.success {
		background-color: rgba(234, 254, 250, 1);
		color: rgba(73, 185, 173, 1);
		font-size: 20rpx;
		border: 1rpx solid rgba(73, 185, 173, 1);
		border-radius: 10rpx;
		padding: 3rpx 18rpx 3rpx 20rpx;
		margin-right: 20rpx;
	}

	.tag-list-item.error {
		background-color: rgba(255, 242, 232, 1);
		color: rgba(250, 84, 28, 1);
		font-size: 20rpx;
		border: 1rpx solid rgba(250, 84, 28, 1);
		border-radius: 10rpx;
		padding: 3rpx 18rpx 3rpx 20rpx;
		margin-right: 20rpx;
	}

	.icons {
		width: 80rpx;
		height: 80rpx;
	}

	.list {
		margin-top: 33rpx;
		display: flex;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.grid-item-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: aqua;
	}

	.text {
		font-size: 24rpx;
		color: rgba(28, 32, 35, 1);
		margin-top: 10rpx;

	}

	.uni-list-items {
		height: 104rpx;
		border-bottom: 1rpx solid rgba(227, 228, 229, 1);
	}

	.send-message {
		margin: 40px auto;
		width: 702rpx;
		background: #fff;
		height: 50px;
		border-radius: 5px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.framly-info {
		margin-top: 40rpx;
	}

	.persons {
		font-size: 28rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
		height: 60rpx;
	}

	.framly-info {
		width: 702rpx;
		margin: 40rpx auto 0;
	}

	.framly-list {
		width: 702rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.menmber-list {
		width: 702rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.list-item-label {
		margin-right: 64rpx;
		width: 114rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.list-item-content {
		display: flex;
		font-size: 26rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}


	.title {
		margin-bottom: 30rpx;
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
	}

	.content {
		padding: 30rpx 24rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.scroll {
		display: flex;
		flex-wrap: nowrap;
		width: 1000rpx;
	}

	.list-item {
		display: flex;
		width: 325rpx;
		height: 120rpx;
		border-radius: 20rpx;
		background: rgba(245, 247, 251, 1);
		align-items: center;
		margin-right: 30rpx;
		flex-basis: 325rpx;
		white-space: nowrap;
		flex-wrap: nowrap;
		flex-shrink: 1;
		flex-grow: 1;
	}

	.avatar-menmber {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.icon {
		width: 20rpx;
		height: 20rpx;
	}

	.content-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.nickname {
		font-size: 30rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.age {
		font-size: 24rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}

	.conact {
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
	}

	.bottom {
		padding: 9rpx 0;
		display: flex;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.btn {
		width: 702rpx;
		background: rgba(73, 185, 173, 1);
		border-radius: 20rpx;
		color: #fff;
		text-align: center;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		margin: 0 auto;
	}
</style>