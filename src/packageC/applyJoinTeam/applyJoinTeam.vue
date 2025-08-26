<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" left-text="返回" :title="title" :fixed="true" @clickRight="handleEdit" rightText="编辑"
			statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->

		<HeadTips :icon="'/../../static/lock.png'" text='您正在申请加入阳兰广的团队' status='success' v-if="read"></HeadTips>
		<view class="content">
			<view class="doctor-info">
				<view class="avatar">
					<image class="avatar" src="./../../static/doctor.png"></image>
				</view>
				<view class="text">
					<view class="first">
						<view><text class="name">周璟荣</text>
							<image class="icon" src="./../../static/doctor-label.png"></image>
						</view>
						<view v-if="!read">
							<image @click="handleMessage" class="msg" src="./../../static/message.png"></image>
							<image @click="handleMakePhone" class="phone" src="./../../static/phone.png"></image>
						</view>
					</view>
					<view class="txt"><text>成员编号:</text><text>2512541</text></view>
					<view class="txt"> <text>成员编号:</text><text>13800138000</text></view>
					<view class="txt"><text>签约人数:</text><text>20</text></view>
					<view class="txt"><text>加入日期:</text><text>2021/05/23</text></view>
				</view>
			</view>
			<view class="introductory">
				<h3 class='title'>医生简介</h3>
				<view class="introductory-text">
					<textarea class="text-area" :disabled="read" :value='instuctor'></textarea>
				</view>
			</view>
			<view class="skilled">
				<h3 class='title'>擅长</h3>
				<view class="skilled-text">
					<textarea class="text-area" :value='goods' :disabled="read"></textarea>
				</view>
			</view>
		</view>

		<view class="bottom audit" v-if="ishowBottom">
			<button class="resue" hover-class="btn-active"><text>驳回</text></button>
			<button class="pass" hover-class="btn-active"><text>审核通过</text></button>
		</view>
		<view class="bottom" v-else>
			<button class="btn" hover-class="btn-active">确定</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import HeadTips from "./../../components/HeadTips/HeadTips.vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	const title = ref("申请加入团队");
	onLoad((options) => {
		if (options.read && !JSON.parse(options.read)) {
			read.value = false;
			ishowBottom.value = false;
		}

		if (options.auditTeam && JSON.parse(options.auditTeam)) {
			// #ifdef MP-WEIXIN
			wx.setNavigationBarTitle({
				title: "审核成员信息"
			})
			// #endif
			read.value = false;
			ishowBottom.value = true;
		}

	})
	const read = ref(true);
	const ishowBottom = ref(false);

	const goods = ref(
		"甲状腺疾病及内分泌疾病，擅长甲亢、甲减、桥本病、糖尿病、多囊卵巢、代谢异常、甲状腺炎、甲状腺低下、甲状腺功能减退、甲状腺功能失调、甲状腺激素异常等引起的不孕不育症的治疗和孕期管理、生活指导，在治疗各种代谢内分泌异常方面有丰富的临床经验"
		)
	const instuctor = ref(
		'1、北京大学第一医院内分泌科专家，从事内分泌相关疾病35余年，尤其擅长代谢性疾病引起的不孕不育诊疗，现任北京天伦医院不孕不育妇科特聘专家。2、1979—1984年就读于北京医学院医学系，随后在北京医科大学第一医院(现北京大学第一医院)内分泌科读研究生，毕业后留院工作至今。'
		);

	const handleEdit = () => {
		uni.navigateTo({
			url: "/packageC/setMemberInfo/setMemberInfo"
		})
	}
	const handleMakePhone = () => {
		uni.makePhoneCall({
			phoneNumber: "17603016347"
		})
	}

	const handleMessage = () => {
		// #ifdef APP-PLUS
		var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
		msg.to = ['18611497504', '17603016347'];
		msg.body = 'This is HTML5 Plus example test message';
		plus.messaging.sendMessage(msg);
		// #endif
	}

	const back = () => {
		uni.navigateBack({
			delta: 0
		})
	}
</script>

<style scoped>
	.container {}
	.text-area {
		font-size: 28rpx;
	}
	.avatar {
		width: 250rpx;
		height: 260rpx;
		margin-right: 40rpx;
	}

	.content {
		padding: 24rpx;
	}

	.doctor-info {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 140rpx;
		height: 42rpx;
	}

	.text {
		flex: 1
	}

	.first {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.name {
		color: rgba(28, 32, 35, 1);
		font-size: 32rpx;
		font-weight: 700;
		margin-right: 10rpx;
		vertical-align: top;
	}

	.msg,
	.phone {
		width: 30rpx;
		height: 30rpx;
		margin-left: 30rpx;
	}


	.txt {
		color: rgba(96, 105, 114, 1);
		font-size: 24rpx;
		font-weight: 400;
		margin-bottom: 8rpx;
	}

	.title {
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
		margin-bottom: 20rpx;
	}

	.introductory {
		margin-top: 30rpx;
		margin-bottom: 40rpx;
	}

	.introductory-text,
	.skilled-text {
		padding: 30rpx 15rpx;
		border-radius: 10rpx;
		background-color: rgba(245, 247, 251, 1);
		color: rgba(64, 69, 75, 1);
		font-size: 28rpx;
		font-weight: 400;
	}

	.bottom {
		position: fixed;
		padding: 8rpx 0;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 12;
		background-color: #fff;
	}

	.btn {
		display: block;
		margin: 0 auto;
		width: 702rpx;
		height: 80rpx;
		background-color: rgba(73, 185, 173, 1);
		color: #fff;
		font-size: 30rpx;
		font-weight: 400;
		text-align: center;
		line-height: 80rpx;

		border-radius: 20rpx;
	}

	.audit {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.pass {
		height: 80rpx;
		width: 320rpx;
		background-color: #49B9AD;
		color: #fff;
		font-size: 30rpx;
		font-weight: 400;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;
	}

	.resue {
		color: rgba(246, 87, 85, 1);
		border: 1rpx solid rgba(246, 87, 85, 1);
		height: 80rpx;
		width: 320rpx;
		font-size: 30rpx;
		font-weight: 400;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;

	}
</style>