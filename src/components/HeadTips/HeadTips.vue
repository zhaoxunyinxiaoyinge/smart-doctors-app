<template>
	<view :class="['tips',props.status!=='success'?'tips-error':'success']">
		<image class="img" :src="props.icon"></image>
		<text :class="props.status=='success'?'text':'text-error'">{{props.text}}</text>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from "vue";
	const props = defineProps({
		icon: {
			type: String,
			default: ""
		},
		text: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: "success"
		}
	})
</script>

<style scoped>
	.tips {
		height: 90rpx;
		background-color: rgba(226, 255, 248, 1);
		display: flex;
		align-items: center;
	}

	.tips-error {
		background-color: rgba(254, 241, 241, 1);
	}

	.img {
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx 0 24rpx;
	}

	.text-error {
		color: rgba(246, 87, 85, 1);
		font-size: 28rpx;
	}

	.text {
		color: rgba(73, 185, 173, 1);
		font-size: 28rpx;
	}
</style>
