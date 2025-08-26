<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar left-icon="left" @clickLeft="back" :fixed="true" statusBar='true' title="聊天" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<scroll-view :scroll-y='true' style="height: 100vh;">
			<view class="content">
				<view class="list" v-for="item in messageHistory">
					<view class="list-item right" v-if="item.from=='199210'">
						<view class="avatar">
							<image src="./../../static/woman.png" class='avatar'></image>
						</view>

						<view class="text" v-if="item.type==='TIMTextElem'">
							{{item.payload.text}}
						</view>
						<view class="img" v-if="item.type==='TIMImageElem'">
							<!-- <image class="img" :src="item.payload.imageInfoArray[2].url"></image> -->
							<text>{{item.payload.imageInfoArray[2].url}}</text>
						</view>
					</view>
					<view class="list-item left" v-else>
						<view class="avatar">
							<image class="avatar" src="./../../static/woman.png"></image>
						</view>
						<view class="text" v-if="item.type==='TIMTextElem'">
							{{item.payload.text}}
						</view>
						<view class="img" v-if="item.type==='TIMImageElem'">
							<image class="img" :src="item.payload.imageInfoArray[2].url"
								@click="previewImage([item.payload.imageInfoArray[0].url])"></image>
						</view>
						<view class="text" v-if="item.type=='TIMSoundElem'">
							<view @tap="playAudio(item.payload.url)"><uni-icons type="sound" size="30"></uni-icons>
							</view>
						</view>
						<view class="text" v-if="item.type==='TIMFileElem'">
							<view><text>{{item.payload.fileName}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="bottom"  :style="{height:defaultInputHeight+'rpx'}">
			<!-- <image class="icon audio" @tap="toggleRecord" src="./../../static/picture.png"></image> -->
			<!-- 	<view v-if="isRecord" class="input" @longpress="getAudio" @touchend="endAudio" @click="changeRecord">
				正在录音中。。。。
			</view> -->
			<view class="input">
				<input id='dom' ref="dom" maxlength='100' :value="msg" class="input-text" placeholder="请输入"
					confirm-type='send' cursor-spacing='10' placeholder-style="font-size:24rpx" type="text"
					@confirm="confiremessage"  @focus="handleFoucs" @keyboardheightchange="handlekeyboard" />
					 
					<view class="icon send" @click="checkEmjo">
						<text>😀</text>
					</view>
				<view class="add">
						<uni-icons type="plusempty" size="24" v-if="!showEmjo&&!addMorePlus"  @click="handlePlus"></uni-icons>
						<uni-icons type="closeempty" size="18" v-if='addMorePlus' @click="handleColse"></uni-icons>
						<button type="primary" size="mini" v-if="showEmjo"  class="send-button" @click="sendButton">发送</button>
				</view>
			</view>
			<!-- 这里显表情和凸显表示下 -->
			<view v-if="showEmjo" class="emjo">
				<text class="text emjo-list" v-for="item in emj" @click="()=>checkemoj(item)">{{item}}</text>
			</view>
			<!-- 这里显示更多功能面板 -->
			<view v-if="addMorePlus" class="plus">
				<view class="audio" @click="handleAudio">
					<uni-icons type="mic" size="34" ></uni-icons>
				</view>	
				<view class="camera" @click="handleOpenCamera">
					<uni-icons  type='camera' size="34"></uni-icons>
				</view>
				<view class="photo" @click="chooseImage">
					<uni-icons type="image" size="34"></uni-icons>
				</view>
				<view class="map" @click="handleMap">
					<uni-icons type="location" size="34"></uni-icons>
				</view>
			</view>
		</view> 
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		getCurrentInstance
	} from "vue";

	import TIM from "tim-js-sdk";

	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";

	let tim = getApp().globalData.tim;
	const showEmjo = ref(false);
	const addMorePlus=ref(false);
	const dom = getCurrentInstance();


	onLoad((option) => {
		console.log(option, "456");
		userInfo.option = option;
		// recorderManager.onStop(function(res) {
		// 	confireAudio(res);
		// });

		messageHistory.length = 0;
		getHistoryMessage(option);
		tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

	})

	// 创建本地栏消息推送


	const onMessageReceived = (res) => {
		console.log(res, "res");
	}

	onShow(() => {
		console.log("kaishi le ")

	})

	const userInfo = reactive({
		option: null
	})
	// 判断是否是文字还是图片，还是视频，语音文件类型
	const fileType = ref('text');
	const imgData = ref(null);

	const messageHistory = reactive([]) //历史消息，
	const nextReqMessageID = ref("");
	const isCompleted = ref(false);
	const msg = ref("");
	const popup = ref(null);
	const voicePath = ref("");

	const fileList = reactive([])

	const isRecord = ref(false);
	const defaultInputHeight=ref(98);

	// const recorderManager = uni.getRecorderManager();

	//播放音频组件对象
	const innerAudioContext = uni.createInnerAudioContext();

	const emj = reactive(['😀', '🥰', '😍', '🤩', '😘', '😗', '😛', '😜', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '😐']);

	const toggleRecord = () => {
		isRecord.value = true;
	}

	const changeRecord = () => {
		isRecord.value = false;
		
	}
	
	
	
	// 输入框焦点
	 const handleFoucs=()=>{
		 showEmjo.value=false;

	 }

	// 发送图片消息
	const chooseImage = () => {
		uni.chooseImage({
			count: 6, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				imgData.value = res;
				fileType.value = 'image';
				sendMessage(imgData.value, fileType.value)
			}
		});
	}

	//发送文本消息
	const confiremessage = (event) => {
		msg.value = event.detail.value;
			getSendText(msg)
	}
	
	//点击发送按钮发送文本消息
	const sendButton=()=>{
		getSendText(msg);
	}
	
	//发送方法
	const getSendText=(msg)=>{
		if (msg.value == "") {
			uni.showToast({
				title: "消息内容不能为空",
				duration: 1000
			})
			return
		}
		fileType.value='text';
		sendMessage(msg.value, fileType.value)
	}


	// 发送语音消息

	const confireAudio = (audioMessage) => {
		console.log("开拾发送了")
		sendMessage(audioMessage, fileType.value)
	};

	// 发送消息方法
	const sendMessage = (val, type) => {
		let playLoad = null;
		if (type === 'text') {
			playLoad = {
				text: val
			}
			let message = tim.createTextMessage({
				to: userInfo.option.type == 'group' ? userInfo.option.groupID : userInfo.option.c2c.replace(
					/C2C/,
					""),
				conversationType: userInfo.option.type == 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
				payload: playLoad,
				needReadReceipt: true
			});

			let promise = tim.sendMessage(message);
			promise.then(res => {
				// 当前用户发送的文本消息得获取消息
				getHistoryMessage(userInfo.option)

			}).catch(err => {
				console.log(err);
			}).finally(() => {
				msg.value = "";
				showEmjo.value?showEmjo.value=false:"";
				defaultInputHeight.value=98;
				console.log("我执行到这里了")
			})

		} else if (type === 'image') {
			playLoad = {
				file: imgData.value
			}
			let message = tim.createImageMessage({
				to: userInfo.option.type == 'group' ? userInfo.option.groupID : userInfo.option.c2c.replace(
					/C2C/,
					""),
				conversationType: userInfo.option.type == 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
				payload: playLoad,
				onProgress: function(event) {
					console.log('file uploading:', event)
				}
			});

			// 2. 发送消息
			let promise = tim.sendMessage(message);
			promise.then(function(imResponse) {
				// 当前用户发送的图片消息得获取消息
				getHistoryMessage(userInfo.option)
			}).catch(function(imError) {
				// 发送失败
				console.warn('sendMessage error:', imError, 444444);
			});
		} else if (type === 'audio') {
			playLoad = {
				file: val
			}

			let message = tim.createAudioMessage({
				to: userInfo.option.type == 'group' ? userInfo.option.groupID : userInfo.option.c2c.replace(
					/C2C/,
					""),
				conversationType: userInfo.option.type == 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
				payload: playLoad
			});

			// 2. 发送消息
			let promise = tim.sendMessage(message);
			promise.then(function(imResponse) {
				console.log(imResponse, 6666)
				// 当前用户发送的图片消息得获取消息
				getHistoryMessage(userInfo.option)
			}).catch(function(imError) {
				// 发送失败
				console.warn('sendMessage error:', imError, 444444);
			});

		} else if (type === 'file') {
			playLoad = {
				file: val
			}
			let message = tim.createFileMessage({
				to: userInfo.option.type == 'group' ? userInfo.option.groupID : userInfo.option.c2c.replace(
					/C2C/,
					""),
				conversationType: userInfo.option.type == 'group' ? TIM.TYPES.CONV_GROUP : TIM.TYPES.CONV_C2C,
				payload: playLoad
			});

			// 2. 发送消息
			let promise = tim.sendMessage(message);
			promise.then(function(fileResponse) {
				console.log(fileResponse, 6666);
				// 当前用户发送的图片消息得获取消息
				getHistoryMessage(userInfo.option)
			}).catch(function(imError) {
				// 发送失败
				console.warn('sendMessage error:', imError, 444444);
			});
		}
	}


	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	// 获取历史消息
	const getHistoryMessage = (option) => {
		let options = {
			conversationID: option.type === "group" ? `GROUP@TGS#1UHAOTSMB` : option.c2c,
		}

		let mesageList = tim.getMessageList(options);
		mesageList.then(imResponse => {
			messageHistory.length = 0;
			console.log("获取当前用户的历史消息", imResponse);
			messageHistory.push(...imResponse.data.messageList); // 消息列表。
			nextReqMessageID.value = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
			isCompleted.value = imResponse.data.isCompleted;
		})
	}
	// 预览图片
	const previewImage = (arr) => {
		console.log(arr, "arr")
		uni.previewImage({
			urls: arr,
			success() {

			},
			fail() {

			}
		})
	}


	const checkEmjo = () => {
		showEmjo.value = !showEmjo.value;
		addMorePlus.value=false;
		showEmjo.value?defaultInputHeight.value=600:defaultInputHeight.value=98
	}

	const change = (event) => {
		console.log(event);
	}

	const checkemoj = (emj) => {
		msg.value += emj;
		
	}

	const getAudio = () => {
		recorderManager.start({
			format: 'aac'
		});
		fileType.value = 'audio'
	}

	const endAudio = () => {
		recorderManager.stop();
		uni.showToast({
			title: "录音完毕",
			icon: "success"
		})
	}

	const playAudio = (audioUrl) => {
		innerAudioContext.src = audioUrl;
		innerAudioContext.play()
	}

	const selectFile = (res) => {
		fileType.value = 'file'
		sendMessage(res, fileType.value);
	}
	
	// 点击+按钮，显示面板，提供，图片，上传，语音，拍摄，地址功能
	const handlePlus=()=>{
		//必须保证表情关闭
		showEmjo.value=false;
		addMorePlus.value=true;
		defaultInputHeight.value=400;
	}
	
	const handleColse=()=>{
		addMorePlus.value=false;
		showEmjo.value=false;
		defaultInputHeight.value=98
	}
	
	const handleAudio=()=>{
		uni.showToast({
			title:"该功能暂时不可使用"
		})
	}
	const handleMap=()=>{
		uni.showToast({
			title:"该功能暂时不可使用"
		})
	}
	const handleOpenCamera=()=>{
		uni.showToast({
			title:"该功能暂时不可使用"
		})
	}
	const handlekeyboard=(event)=>{
			console.log(event.detail);
			if(event.detail.height==0){
					
			}
	}
</script>

<style scoped lang="scss">
	.container {
		background: rgba(245, 247, 251, 1);
		min-height: 100vh;

	}

	.content {
		padding: 30rpx 24rpx 0 24rpx;
		height: auto;
	}

	.list-item {
		display: flex;
		align-items: flex-start;

	}

	.text {
		margin-top: 20rpx;
		margin-right: 40rpx;
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
	}

	.list-item.right {
		flex-direction: row-reverse;
		margin-bottom: 60rpx;

		.text {
			max-width: 489rpx;
			border-radius: 20rpx 0 20rpx 20rpx;
			background-color: rgba(73, 185, 173, 1);
			font-size: 36rpx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 40rpx;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			white-space: normal;
			
		}
	}



	.list-item.left {
		flex-direction: row;

		.text {
			margin-right: 0;
			margin-left: 30rpx;
			max-width: 489rpx;
			padding: 26rpx 30rpx 26rpx 30rpx;
			background-color: rgba(255, 255, 255, 1);
			color: rgba(28, 32, 35, 1);
			font-size: 28rpx;
			font-weight: 400;
			border-radius: 0 20rpx 20rpx 20rpx;
			word-break: break-all;
		}

	}


	.bottom {
		position: sticky;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #eee;
		overflow: hidden;
		flex-direction: column;

		.input {
			width:calc(100% - 40rpx);
			margin:10rpx 20rpx;
			display: flex;
			line-height: 70rpx;
			align-items: center;
			background-color: rgba(255, 255, 255, .5);

			.input-text {
				padding: 0 0 0 20rpx;
				height: 70rpx;
				width: 100%;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 10rpx;
			}
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
		}

		.audio {
			margin: 0 24rpx 0 20rpx;
		}

		.add {
			display: flex;
			align-items: center;
		}

		.send {
			margin-left: 20rpx;
			margin-right: 30rpx;
			color:yellow;
			display: flex;
			align-items: center;
		}
	}


	.img {
		width: 320rpx;
		height: 320rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
	
	.emjo {
		padding: 20rpx;
		font-size: 36rpx;
	}
	.emjo-list {
		marign-bottom:30rpx
	}
	
	.send-button {
		font-size: 24rpx;
		width: 120rpx;
		white-space: nowrap;
		line-height: 60rpx;
	}
	
	.plus {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		view {
			margin-right: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 15rpx;
		}
	}
</style>