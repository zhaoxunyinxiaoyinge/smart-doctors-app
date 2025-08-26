<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="" :fixed="true" leftText="返回" statusBar='true' left-icon="left"
			height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<image class="doctorer" src="./../../static/my-pic.png" mode="center"></image>
		<view class="content">
			<view class="user">
				<image class="avatar" v-if="users.avatar_file!=''" :src="users.avatar_file?.url"></image>
				<view class="user-desc">
					<text class="name" v-if="users.nickname">{{users.nickname||users.username}}</text>
					<view class="mark">
						<image class="doctor" src="./../../static/doctor-label.png"></image>
					</view>
				</view>
			</view>
			<view class="text">
				<text class="desc">所属团队：李明明专科团队</text>
				<text class="desc">所属机构：佛山市桂雅社区卫生服务站</text>
			</view>
			<view class="erweima">
				<ay-qrcode ref="qrcode3" :modal="qshow"  url='kkjfkdjk' :height="260" :width="260"  ></ay-qrcode>
				<text class="tips">扫一扫，快速签约医生团队</text>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		store
	} from "./../../uni_modules/uni-id-pages/common/store.js"

	import {
		reactive,
		getCurrentInstance,
		onMounted,
		ref
	} from 'vue';
	import {
		onReady
	} from "@dcloudio/uni-app";

	const qrcode3 = ref();
	const qshow=ref(false);
	const qimg=ref(false);
	let users = ref({
		nickname: "",
		avatar_file: {
			url: ""
		}
	});

	const getUsersInfo = () => {
		let infos = store.userInfo;
		users.value = infos;
	}

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}


	onMounted(() => {
		qshow.value=true;
		qimg.value=true;
		qrcode3.value.crtQrCode();
		getUsersInfo();
	})
</script>

<style scoped>
	.container {
		padding: 0 24rpx;
		min-height: 100vh;
		background: url("./../../static/my-bg.png") no-repeat;
		background-size: cover;
		box-sizing: border-box;
	}
	
	.avatar {
		width: 60px;
		height: 60px;
	}

	.doctorer {
		width: 100%;
		height: auto;
		margin: 0 auto;
		filter: blur(2rpx);
	}

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 995rpx;
		border-radius: 20rpx;
		background-color: #fff;
		width: 702upx;
		padding: 50upx;
		box-sizing: border-box;
		bottom: 68upx;
		box-shadow: 0px 7px 30px 0px rgba(198, 208, 211, 1);

	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		margin-right: 30rpx;
	}

	.user {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.user-desc {
		display: flex;
		flex-direction: column;
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		align-items: center;

	}



	.mark {
		margin-top: 10rpx;
	}

	.text {
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(73, 185, 173, 1);
	}

	.desc {
		background-color: rgba(234, 254, 250, 1);
		padding: 9rpx 18rpx;
		margin-bottom: 20rpx;
	}

	.erweima {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 62rpx;;
	}

	.erweima-pic {
		width: 400rpx;
		height: 400rpx;
	}

	.tips {
		margin-top: 0rpx;
		color: rgba(28, 32, 35, 1);
		font-size: 24rpx;
		font-weight: 400;
	}

	.doctor {
		width: 142rpx;
		height: 42rpx;
	}
</style>