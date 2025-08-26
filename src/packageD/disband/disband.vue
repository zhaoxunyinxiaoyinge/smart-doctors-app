<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar  @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" left-text="返回" title="解散团队"
			height="44px"></uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<text class="desc">{{isExit?'您正在退出加入王文科团队，请输入密码验证您的身份：':'您正在解散加入王文科团队，请输入密码验证您的身份：'}}</text>
			<uni-forms :modelValue="formData" label-position="top">
				<uni-forms-item label="账号" name="userName">
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="otherName">
					<uni-easyinput type="text" v-model="formData.password" placeholder="请输入秘密" />
				</uni-forms-item>

				<view class="button">
					<text class="btn">{{isExit?'确认退出':'确认解散'}}</text>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	const formData = reactive({
		name: "",
		password: ""
	})
	const isExit = ref(false);

	onLoad((options) => {
		if (options.isMyteam && JSON.parse(options.isMyteam)) {
			isExit.value = true;
			console.log(isExit, 555)
		}
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		})
	}
</script>

<style scoped>
	.content {
		padding: 24rpx
	}

	.desc {
		color: rgba(28, 32, 35, 1);
		font-size: 28rpx;
		margin-bottom: 50rpx;
		display: block;
	}

	.button {
		margin-top: 50rpx;
	}

	.btn {
		display: block;
		border-radius: 10rpx;
		text-align: center;
		line-height: 76rpx;
		width: 702rpx;
		margin: 0 auto;
		height: 76rpx;
		border: 1rpx solid rgba(246, 87, 85, 1);
		color: rgba(246, 87, 85, 1);
		font-size: 30rpx;
	}
</style>