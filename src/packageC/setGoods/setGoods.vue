<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="擅长" :fixed="true" @clickRight="handleSave" rightText="保存" statusBar='true'
			left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<textarea :value="value" class="textarea"></textarea>
		</view>
	</view>
</template>

<script setup>
	import {ref} from "vue";
	const value=ref("北京大学第一医院内分泌科专家，从事内分泌相关疾病35余年，尤其擅长代谢性疾病引起的不孕不育诊疗，现任北京天伦医院不孕不育妇科特聘专家。1979—1984年就读于北京医学院医学系，随后在北京医科大学第一医院(现北京大学第一医院)内分泌科读研究生，毕业后留院工作至今");
	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	const handleSave = () => {
		uni.navigateBack({
			delta:1
		})
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		background-color:rgba(245, 247, 251, 1) ;
	}
	.content {
		padding: 30rpx 24rpx;
		background-color: #fff;
	}
	.textarea {
		box-sizing: border-box;
		width: 100%;
		border-radius: 20rpx;
		background-color:rgba(245, 247, 251, 1);
		height:300rpx ;
		padding: 30rpx;
		color:rgba(197, 200, 203, 1);
		font-size:26rpx ;
		font-weight: 400;
			}
</style>
