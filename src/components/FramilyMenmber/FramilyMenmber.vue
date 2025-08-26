<template>
	<view class="content">
		<view class="title"><text>{{props.title}}</text></view>
		<scroll-view :scroll-x="true" >
			<view class="scroll">
				<view v-for="item in props.list" id="demo1" class="scroll-view-item list-item">
					<image class="avatar" :src="item.avatar"></image>
					<view class="content-list">
						<view class="names">
							<text class="nickname">{{item.nickName}}</text>
							<text class="age">{{item.age}}岁</text>
							<image class="icon" :src="item.icon"></image>
						</view>
						<view class="conact">
							<text>{{item.conactName}}</text>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: ""
		},
		list: {
			type: Array,
			default () {
				return []
			}
		}
	})
</script>

<style scoped>
	
	.title {
		margin-bottom: 30rpx;
		font-size: 32rpx;
		color:rgba(28, 32, 35, 1);
		font-weight: 700;
	}
	.content {
		padding: 30rpx 24rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.scroll {
		display: flex;
		flex-wrap: nowrap;
		width: 1000rpx;
	}

	.list-item {
		display: flex;
		width: 325rpx;
		height: 120rpx;
		border-radius: 20rpx;
		background: rgba(245, 247, 251, 1);
		align-items: center;
		margin-right: 30rpx;
		flex-basis: 325rpx;
		white-space: nowrap;
		flex-wrap: nowrap;	flex-shrink: 1;
		flex-grow: 1;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.icon {
		width: 20rpx;
		height: 20rpx;
	}

	.content-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.nickname {
		font-size: 30rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.age {
		font-size: 24rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}

	.conact {
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
	}
</style>
