<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" rightText="保存"  title="设置团队名称" :fixed="true"  statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<input placeholder="请输入团队名称" placeholder-class="placeholder" class="uni-input" type="text" v-model="name"/>
		</view>

	</view>
</template>

<script setup>
	import {ref} from "vue";
	const name=ref("");
</script>

<style scoped>
	.container {
		height: 100vh;
		background-color: rgba(235, 236, 237, 1);
	}
	
	.content {
		padding: 0 24rpx;
		background-color: #fff;
	}
	
	.uni-input {
		height: 105rpx;
	}
	
	/deep/ .placeholder {
		font-size: 26rpx;
		font-weight: 400;
		color:rgba(197, 200, 203, 1);
	}
</style>
