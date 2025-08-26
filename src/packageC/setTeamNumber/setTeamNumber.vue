<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="设置成员电话号码" @clickRight="handleSave" rightText="保存" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->	
		<view class="content">
			<input  type="text" class="input"  placeholder-class="input-plachoer"   placeholder="亲输入手机号码" />
		</view>
	</view>
</template>

<script setup>
	const handleSave=()=>{
		uni.navigateBack({
			delta:1
		})
	}
</script>

<style scoped>
	.content {
		padding: 0 24rpx;
	}
	.input {
		height: 105rpx;
	}
	.input-plachoer {
		font-size:26rpx ;
		color:rgba(197, 200, 203, 1);
	}
</style>
