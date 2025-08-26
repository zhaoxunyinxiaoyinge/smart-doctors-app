<script>
	// import TIM from 'tim-js-sdk';
	import TIM from 'tim-js-sdk/tim-js-friendship.js';
	console.log(TIM)

	import TIMUploadPlugin from 'tim-upload-plugin';
	import {
		genTestUserSig
	} from "./debug/GenerateTestUserSig.js";

	// #ifdef APP-PLUS
	import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
	// #endif

	// 初始化uni-id-pages页面
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';


	export default {
		async onLaunch() {
			await uniIdPageInit();
		},
		globalData: {
			tim: null,
			cid: ""
		},
		name: 'App',
		data() {
			return {

			}
		},
		methods: {
			getPushMessage() {
				uni.onPushMessage((res) => {
					console.log(res)
					this.pushMessage(res.data)
				})
			},
			pushMessage(data) {
				uni.createPushMessage({
					title: data.title,
					content: data.content,
					success() {
						console.log("推送完毕")
					}
				})
			}
		},

		onLaunch: async function() {
			// #ifdef APP-PLUS
			checkUpdate()
			// #endif
			this.getPushMessage();
			uni.getPushClientId({
				success: (res) => {
					if (res && res.cid) {
						this.globalData.cid = res.cid;
					}
				}
			})

			const optionss = genTestUserSig("198910");
			uni.sign = optionss.userSig;
			let options = {
				SDKAppID: 1400744324 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
			};

			// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
			this.globalData.tim = uni.tim = TIM.create(options); // SDK 实例通常用 tim 表示	

			let onMessageReceived = function(event) {
				// event.data - 存储 Message 对象的数组 - [Message]
				const messageList = event.data;
				messageList.forEach((message) => {
					if (message.type === TIM.TYPES.MSG_TEXT) {
						console.log(message, "接受消息提示");
					}
				});
			};
			uni.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

			uni.tim.login({
				userID: '198910',
				userSig: optionss.userSig
			}).then(res => {
				if (res.data.repeatLogin === true) {
					console.log(res.data.errorInfo, 666);
				}
			}).catch(err => {
				console.log(56789);
			})

			uni.tim.setLogLevel(0) //打印日志级别

			uni.tim.registerPlugin({
				'tim-upload-plugin': TIMUploadPlugin
			});

			// SDK 进入 ready 状态时触发，接入侧监听此事件，然后可调用 SDK 发送消息等 API，使用 SDK 的各项功能
			let onSdkReady = function(event) {
				console.log("tim已经准备好了");
			};

			uni.tim.on(TIM.EVENT.SDK_READY, onSdkReady);
			let onSdkNotReady = function(event) {
				// 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
				console.log("tim已经正在登录中")
			};

			uni.tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);
			// 收到群聊的消息
			// let onMessageReceived = function(event) {
			// 	// event.data - 存储 Message 对象的数组 - [Message]
			// 	console.log(event, "消息通知")
			// };
			// uni.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

			// SDK 收到消息被修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容。
			let onMessageModified = function(event) {
				// event.data - 存储被修改过的 Message 对象的数组 - [Message]
			};
			uni.tim.on(TIM.EVENT.MESSAGE_MODIFIED, onMessageModified);

			// SDK 收到消息被撤回的通知，可通过遍历 event.data 获取被撤回的消息列表数据并渲染到页面，如单聊会话内可展示为 "对方撤回了一条消息"；群聊会话内可展示为 "XXX撤回了一条消息"。
			let onMessageRevoked = function(event) {
				// event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
			};
			uni.tim.on(TIM.EVENT.MESSAGE_REVOKED, onMessageRevoked);

			//已读消息
			let onMessageReadByPeer = function(event) {
				console.log(event, "消息已读");
				// event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
			};
			uni.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, onMessageReadByPeer);

			let onMessageReadReceiptReceived = function(event) {
				// event.data - 存储消息已读回执信息的数组
				const readReceiptInfoList = event.data;
				readReceiptInfoList.forEach((item) => {
					const {
						groupID,
						messageID,
						readCount,
						unreadCount
					} = item;
					const message = uni.tim.findMessage(messageID);
					if (message) {
						if (message.readReceiptInfo.unreadCount === 0) {
							// 全部已读
						} else {
							// message.readReceiptInfo.readCount - 消息最新的已读数
							// 如果想要查询哪些群成员已读了此消息，请使用 [getGroupMessageReadMemberList] 接口
						}
					}
				});
			};
			uni.tim.on(TIM.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, onMessageReadReceiptReceived);


			// 会话列表更新，event.data 是包含 Conversation 对象的数组
			let onConversationListUpdated = function(event) {
				console.log(event.data, "会话更新的接口"); // 包含 Conversation 实例的数组
			};
			uni.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdated);

			// SDK 群组列表更新时触发，可通过遍历 event.data 获取群组列表数据并渲染到页面
			let onGroupListUpdated = function(event) {
				console.log(event.data); // 包含 Group 实例的数组
			};
			uni.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onGroupListUpdated);


			// 群属性更新时触发，可通过 event.data 获取到更新后的群属性数据（v2.14.0起支持）
			let onGroupAttributesUpdated = function(event) {
				const groupID = event.data.groupID // 群组ID
				const groupAttributes = event.data.groupAttributes // 更新后的群属性
				console.log(event.data);
			};
			uni.tim.on(TIM.EVENT.GROUP_ATTRIBUTES_UPDATED, onGroupAttributesUpdated);

			// 创建话题时触发（v2.19.1起支持）
			let onTopicCreated = function(event) {
				const groupID = event.data.groupID // 话题所属社群 ID
				const topicID = event.data.topicID // 话题 ID
				console.log(event.data);
			};
			uni.tim.on(TIM.EVENT.TOPIC_CREATED, onTopicCreated);

			// 删除话题时触发（v2.19.1起支持）
			let onTopicDeleted = function(event) {
				const groupID = event.data.groupID // 话题所属社群 ID
				const topicIDList = event.data.topicIDList // 删除的话题 ID 列表
				console.log(event.data);
			};
			uni.tim.on(TIM.EVENT.TOPIC_DELETED, onTopicDeleted);

			// 话题资料更新时触发（v2.19.1起支持）
			let onTopicUpdated = function(event) {
				const groupID = event.data.groupID // 话题所属社群 ID
				const topic = event.data.topic // 话题资料
				console.log(event.data);
			};
			uni.tim.on(TIM.EVENT.TOPIC_UPDATED, onTopicUpdated);

			// 自己或好友的资料发生变更时触发，event.data 是包含 Profile 对象的数组
			let onProfileUpdated = function(event) {
				console.log(event.data); // 包含 Profile 对象的数组
			};
			uni.tim.on(TIM.EVENT.PROFILE_UPDATED, onProfileUpdated);

			// SDK 黑名单列表更新时触发
			let onBlacklistUpdated = function(event) {
				console.log(event.data); // 我的黑名单列表，结构为包含用户 userID 的数组
			};
			uni.tim.on(TIM.EVENT.BLACKLIST_UPDATED, onBlacklistUpdated);

		},
		onHide() {
			// this.tim.destroy().then(() => {
			//   console.log('sdk destroyed=================================');
			// });
			console.log("这里被隐藏了，哈哈哈")
		}
	}
</script>
<style>

</style>