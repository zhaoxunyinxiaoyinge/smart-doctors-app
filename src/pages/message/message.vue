<template>
	<view class="container">
		<!-- app端和h5留下的状态栏高度 -->
		<!-- #ifdef APP -->
		<uni-nav-bar :fixed="true" statusBar='true' leftText="消息"  height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<uni-list :border='false' class="message">
			<uni-list-item title="自定义右侧插槽" note="列表描述信息" clickable @click="jumToServeMessage">
				<template v-slot:header>
					<view class="header">
						<uni-badge class="uni-badge-left-margin" :is-dot="false" :text='2' absolute="rightTop"
							size="small">
							<image class="avatar" src="./../../static/icon-1.png" mode="widthFix"></image>
						</uni-badge>
					</view>
				</template>
				<template v-slot:body>
					<view class="body">
						<view class="left">
							<view class="title"><text>服务消息</text></view>
							<view class="text"><text>您有一条新的签约消息</text></view>
						</view>

						<view class="footer right">
							<text>{{'2022-04-02日'}}</text>
						</view>
					</view>
				</template>
			</uni-list-item>
			<!-- 拉取会话列表 -->
			<uni-list-item title="自定义右侧插槽" :key='index' @click="jumToTalkMesage(item)" note="列表描述信息" clickable
				v-for="(item,index) in conversationList">
				<template #header>
					<view class="header">
						<uni-badge class="uni-badge-left-margin" :is-dot="false" :text='item.unreadCount'
							absolute="rightTop" size="small">
							<image class="avatar" :src="tempAvatar(item)" mode="widthFix"></image>
						</uni-badge>
					</view>
				</template>
				<template #body>
					<view class="body">
						<view v-if="item.type!=='GROUP'" class="list">
							<view class="left">
								<view class="title"><text>{{item.userProfile.nick}}</text></view>
								<view v-if="item.lastMessage.type==='TIMImageElem'" class="text">
									<text>图片</text>
								</view>
								<view v-if="item.lastMessage.type==='TIMTextElem'" class="text">
									<text>{{item.lastMessage.payload.text}}</text>
								</view>
								<view class="text" v-if="item.lastMessage.type==='TIMSoundElem'">
									<text>语音文件</text>
								</view>

								<view class="text" v-if="item.lastMessage.type==='TIMFileElem'">
									<text>文件消息</text>
								</view>
							</view>
							<view class="footer right">
								<text>{{getTime(item.lastMessage.lastTime)}}</text>
							</view>
						</view>

						<view v-if="item.type==='GROUP'" class="list">
							<view class="left">
								<view class="title"><text>{{item.groupProfile.name}}(群)</text></view>
								<view v-if="item.lastMessage.type==='TIMImageElem'" class='text'>
									<text>图片</text>
								</view>
								<view v-if="item.lastMessage.type==='TIMTextElem'" class="text">
									<text>{{item.lastMessage.payload.text}}</text>
								</view>
								<view class="text" v-if="item.lastMessage.type==='TIMSoundElem'">
									<text>语音文件</text>
								</view>
								<view class="text" v-if="item.lastMessage.type==='TIMFileElem'">
									<text>文件消息</text>
								</view>
							</view>
							<view class="footer right">
								<text>{{getTime(item.lastMessage.lastTime)}}</text>
							</view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from "vue";
	import moment from "moment";

	import person from "./../../static/woman.png"

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";

	import TIM from "tim-js-sdk";

	const conversationList = reactive([]);
	let tim = null;
	
	const isSyncCompleted = ref(false);
	
	

	onLoad(() => {
		tim = getApp().globalData.tim;
	
		conversationList.length = 0;
		console.log(tim,"time");
		// 获取会话列表
		let promise = tim.getConversationList();
		promise.then(function(imResponse) {
			const conversationLists = imResponse.data.conversationList;
			conversationList.push(...conversationLists);
			console.log(conversationList, "eeee")
			// 全量的会话列表，用该列表覆盖原有的会话列表
			const isSyncCompleteds = imResponse.data.isSyncCompleted;
			isSyncCompleted.value = isSyncCompleteds;

			// 从云端同步会话列表是否完成
		}).catch(function(imError) {
			console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
		});
		tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdated);
	})

	const tempAvatar = (item) => {
		if (item.avatar === "" && item.type !== 'GROUP') {
			return person;
		} else if (item.type === 'GROUP' && item.groupProfile.avatar !== "") {
			return item.groupProfile.avatar
		}
		return person;
	}

	const jumToServeMessage = () => {
		uni.navigateTo({
			url: "/packageB/messageServe/messageServe"
		})
	}

	const jumToTalkMesage = async (item) => {
		const type = item.type === 'GROUP' ? 'group' : 'one';
		// 点击指定会话里会话列表清空消息未读消息
		await tim.setMessageRead({
			conversationID: item.conversationID
		});
		let url;
		if (type == 'group') {
			url = "/packageB/talkmessage/talkmessage?type=" + type + "&groupID=" + item.groupProfile.groupID;
		} else {
			url = "/packageB/talkmessage/talkmessage?type=" + type + "&c2c=" + item.conversationID
		}

		uni.navigateTo({
			url
		})
	}

	const getTime = (times) => {
		console.log(times)
		return moment(times * 1000).format("yyyy-MM-DD");
	}

	//监听会话列表更新
	let onConversationListUpdated = function(event) {
		conversationList.length = 0;
		conversationList.push(...event.data);
	};
</script>

<style scoped>
	.container {
		padding: 0 24rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		vertical-align: middle;
	}

	.title {
		font-size: 30rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}

	.text {
		color: rgba(197, 200, 203, 1);
		font-size: 24rpx;
		font-weight: 400;
	}

	.footer {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(197, 200, 203, 1);
		text-align: right;
	}

	.list-content {
		display: flex;
		align-items: flex-start;
	}

	.header {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		margin-right: 32rpx;
	}

	.body {
		padding: 30rpx 0;
		flex: 1;
		border-bottom: 1rpx solid rgba(227, 228, 229, 1);
		display: flex;
		justify-content: space-between;
	}

	.list {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.uni-badge-left-margin {
		margin-left: 10px;
	}

	.uni-badge-absolute {
		margin-left: 40px;
	}

	.box {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: #DCDFE6;
		color: #fff;
		font-size: 12px;
	}

	.box-text {
		text-align: center;
		color: #fff;
		font-size: 12px;
	}

	.img {
		width: 160rpx;
		height: 160rpx;
	}
</style>

<style>
	.message /deep/ .uni-list-item__container {
		padding: 0;
	}

	.message /deep/ .uni-list--border {
		display: none;
	}

	.message /deep/ .uni-badge-left-margin {
		margin: 0
	}
</style>