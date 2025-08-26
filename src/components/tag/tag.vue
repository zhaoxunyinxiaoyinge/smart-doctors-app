<template>
	<view :class="[tagClass]">
		<view class="title" v-if="list.title"><text>{{list.title}}</text><uni-icons type="right" size="16" @click="jumpTo"></uni-icons></view>
		<view class="list-item">
			<view v-for="item in list.field" :class="['tag-list-item',item.status=='success'?'success':'error']">
				<text>{{item.text}}</text>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from "vue";
	const props = defineProps({
		list: {
			type: Object,
			default () {
				return {}
			}
		},
		tagClass:{
			types:String,
			default:'list'
		}
	})
	
	const eimts=defineEmits(['setLabel'])
	
	const jumpTo=()=>{
		eimts("setLabel");
	}
</script>

<style scoped>
	.list {
		padding: 30rpx 24rpx 30rpx 24rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.title {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		/* margin-top: 30rpx; */
		margin-bottom: 30rpx;
		
	}
	
	.list-item {
		display: flex;
	}

	.tag-list-item {
		width: 140rpx;
		height: 60rpx;
		border: 1rpx solid rgba(73, 185, 173, 1);
		background-color: rgba(234, 254, 250, 1);
		font-size: 24rpx;
		font-weight: 400;
		margin-right: 40rpx;
		border-radius: 20rpx;
		text-align: center;
		line-height: 60rpx;
	}


	.success {
		border: 1rpx solid rgba(73, 185, 173, 1);
		background-color: rgba(234, 254, 250, 1);
		color: rgba(73, 185, 173, 1);
	}

	.error {
		border: 1rpx solid rgba(250, 84, 28, 1);
		background-color: rgba(255, 242, 232, 1);
		color: rgba(250, 84, 28, 1);
	}
</style>
