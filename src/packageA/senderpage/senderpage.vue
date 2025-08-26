<template>
	<view class="container">
			<!-- #ifdef APP -->
			<uni-nav-bar @clickLeft="back" left-icon="left" :fixed="true" statusBar='true' title="新建群发" height="44px" >
			</uni-nav-bar>
			<!-- #endif -->
				<view class="content">
					<view class="tips">
						<text>你将以下消息发送给2位居民</text>
					</view>
					<view class="name-list"><text>仁桂、李嘉庆</text></view>
				</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		padding: 0 24rpx;
		height: 100vh;
	}
	
	.content {
		padding-top: 30rpx;
		padding-bottom: 36rpx;
	}
	
	.tips {
		font-size: 26rpx;
		color:rgba(197, 200, 203, 1);
		font-weight: 400;
		line-height: 36rpx;
	}
	.name-list {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 40rpx;
	}
	
</style>
