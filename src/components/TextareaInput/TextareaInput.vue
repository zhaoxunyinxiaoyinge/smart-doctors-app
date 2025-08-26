<template>
	<view class="textarea">
			<view class="title"><text>{{props.title}}</text></view>
			<uni-easyinput v-model="text" type="textarea" class='text' @change="hangleChange" :placeholder="props.placeholder"></uni-easyinput>
	</view>
</template>

<script setup>
	import {defineProps,defineExpose,ref,defineEmits} from "vue";
	
	const text=ref(""); 
	const props=defineProps({
		title:{
			type:String,
			default:""
		},
		placeholder:{
			type:String,
			default:""
		}
	});
	
	const emits=defineEmits(['textarea'])
	
	const hangleChange=()=>{
		 emits("textarea",text.value);
	}
	
	defineExpose({
		text
	})
</script>

<style scoped>
	.textarea {
		padding:30rpx 24rpx ;
		background-color: #fff;
	}
	.title {
		color:rgba(28, 32, 35, 1);
		font-size:32rpx ;
		font-weight: 700;
		margin-bottom: 30rpx;
	}
	
	.text {
		border-radius: 20rpx;
		background-color: rgba(245, 247, 251, 1);	
		height: 300rpx !important;
		box-sizing: border-box;
	}
</style>

<style>
	.textarea .text /deep/ .uni-easyinput__content-textarea{
		background-color: rgba(245, 247, 251, 1);		
		height: 300rpx !important;
		margin:0;
		border:none
		
	}
	
	.textarea .text /deep/ .input-padding {
		padding: 10rpx;
		box-sizing: border-box;
	}
	
</style>