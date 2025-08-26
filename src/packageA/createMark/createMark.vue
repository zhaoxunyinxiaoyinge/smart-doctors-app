<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar left-icon="left" rightText="完成" @clickLeft="back" :fixed="true" statusBar='true' title="创建标签" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<view class="list-item">
					<view class="title"><text>标签名字</text></view>
				
				</view>
				<view class="list-item border">
					<view class="title"><text>标签成员(0)</text></view>
					<view class="label" @click="addResident">
						<image class="icon" src="./../../static/info.png"></image><text>添加居民</text>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script setup> 
		
		const back=()=>{
			uni.navigateBack({
				delta:1
			})
		}
		
		const addResident=()=>{
			
		}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
	}
	
	.content {
		padding: 0 24rpx;
		background-color: #fff;
	}
	
	.list-item {
		padding: 30rpx 0 36rpx;
		color: rgba(197, 200, 203, 1);
		font-size: 26rpx;
		font-weight: 400;
	}
	
	.title {
		margin-bottom: 11rpx;
	}
	
	.label {
		font-size: 28rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}
	
	.icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
		vertical-align: middle;
	}
	
	.border {
		border-top: 1rpx solid #eee;
	}

</style>
