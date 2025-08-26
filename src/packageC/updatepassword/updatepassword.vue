<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back"  title="修改密码" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
			<uni-forms ref="baseForm" :modelValue="userData">
					<uni-forms-item label="姓名" required>
						<uni-easyinput v-model="userData.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
						<uni-easyinput v-model="userData.password" placeholder="请输入密码" />
					</uni-forms-item>
			</uni-forms>
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script setup>
	import {ref} from "vue"
	const userData=ref({
		username:"",
		password:""
	})
	
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		});
	}
</script>

<style scoped>
	.content {
		padding: 30rpx 24rpx 0;
	}
</style>
