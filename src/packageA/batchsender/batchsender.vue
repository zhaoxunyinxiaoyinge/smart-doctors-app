<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" left-icon="left" :fixed="true" statusBar='true' title="群发消息" height="44px" >
		</uni-nav-bar>
		<!-- #endif -->	
		<view class="content">
			<head-tips :icon="icon"  :text="'总共有'+messageHistory.length+'消息'" :status="status"></head-tips>
			<view class="message-list">
				<view class="message-list-item" :key='index' v-for="(item,index) in messageHistory">
					<view class="msg">
						<view class="msg-list"><text class="label">群发时间</text> <text class="text">{{Date(item.time)}}</text></view>
						<view class="msg-list"><text class="label">接收人</text> <text class="text">{{item.nick}}</text></view>
						<view class="msg-list" v-if="item.type='TIMTextElem'"><text class="label" >群发内容</text> <text class="text">{{item.payload.text}}</text></view>
						<view class="msg-list" v-if="item.payload.downloadFlag==2"><text class="label">群发内容</text> <image :src="item.payload.fileUrl"></image></view>
						<view class="msg-list" v-if="item.payload.imageFormat==1"><text class="label">群发内容</text> <image :src="item.payload.imageInfoArray[0].url"></image></view>
					</view>
					<view class="sender">
						<text @click="sender">再次发送</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import HeadTips from "./../../components/HeadTips/HeadTips.vue";
	import {ref,reactive,onMounted, computed,
	} from "vue";
	const icon=ref("./../../static/lock.png");
	const text=ref(0);
	const status=ref("success");
	const messageHistory=ref([]);
	const nextReqMessageID=ref();
	
	/**0.获取全量timid
	 * 1.获取会话列表，
	 * 2.根据会话列表获取每个会话列表下面的用户历史消息，
	 * 3调用发送消息接口，根据消息id,重新发送消息，
	 */
	//获取tim
	const getTimId=()=>{
		const tim= getApp().globalData.tim;
		return tim;
	}
	
	//获取会话列表
	const getTalkList=()=>{
		const tim=getTimId();
		tim.getConversationList().then((imResponse)=>{
			let userList=imResponse.data.conversationList;
			userList.forEach(item=>{
				getHistoryMessage(item,tim);
			})
		})
	}
	
	//获取历史消息
	const getHistoryMessage = (option,tim) => {
		console.log(option,"option")
		let options = {
			conversationID: option.type === "group" ? `GROUP@TGS#1UHAOTSMB` : option.conversationID,
		}

		let mesageList = tim.getMessageList(options);
		mesageList.then(imResponse => {
			messageHistory.value.length = 0;
			console.log("获取当前用户的历史消息", imResponse);
			messageHistory.value.push(...imResponse.data.messageList); // 消息列表。
			nextReqMessageID.value = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
		})
	}
	
	onMounted(()=>{
		getTalkList();
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:1
		}
		)
	}

	
	const sender=()=>{
		// uni.navigateTo({
		// 	// url:"/packageA/checkMember/checkMember"
		// })
	}
</script>

<style scoped>
	.container {
		background-color:rgba(245, 247, 251, 1) ;
		height: 100vh;
	}
	
	.message-list {
		box-sizing: border-box;	
		width: 702rpx;
		margin:28rpx auto 0;
	}
	
	.message-list-item {
		padding: 30rpx;
        background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
	}
	
	.msg {
		margin-bottom: 8rpx;
	}
	
	
	.sender {
		display: flex;
		color:rgba(73, 185, 173, 1);
		font-size: 28rpx;
		font-weight: 700;
		line-height: 40rpx;
		justify-content: flex-end;
		padding-top: 20rpx;
		border-top:1rpx solid rgba(227, 228, 229, 1);

	}
	
	.msg-list{
		display: flex;
		margin-bottom: 22rpx;
	}
	
	.label {
		font-size: 26rpx;
		font-weight: 400;
		color:rgba(96, 105, 114, 1);
		margin-right: 28rpx;
		width:106rpx ;
	}
	
	.text {
		font-size: 28rpx;
		font-weight: 400;
		color:rgba(28, 32, 35, 1);
		line-height: 40rpx;
		flex:1;
	}
</style>
