<template>
	<view :class="['tag-lisst-items',tag.status=='success'?'success':'error']">
		<text>{{tag.text}}</text>
	</view>

</template>

<script >
	export default {
		props:{
			tag:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>
<style  scoped>
.tag-lisst-items {
		display: inline-block;
		width: 140rpx !important;
		height: 60rpx;
		border: 1rpx solid rgba(73, 185, 173, 1);
		background-color: rgba(234, 254, 250, 1);
		font-size: 24rpx;
		font-weight: 400;
		margin-right: 40rpx;
		border-radius: 20rpx;
		text-align: center;
		line-height: 60rpx;
		margin-top: 20rpx;
	}
	


	.success {
		border: 1 rpx solid rgba(73, 185, 173, 1);
		background-color: rgba(234, 254, 250, 1);
		color: rgba(73, 185, 173, 1);
	}

	.error {
		border: 1 rpx solid rgba(250, 84, 28, 1);
		background-color: rgba(255, 242, 232, 1);
		color: rgba(250, 84, 28, 1);
	}
</style>
