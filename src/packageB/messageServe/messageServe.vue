<template>
	<view class="container">
			<!-- #ifdef APP -->
			<uni-nav-bar left-icon="left"  @clickLeft="back" :fixed="true" statusBar='true' title="消息服务" height="44px">
			</uni-nav-bar>
			<!-- #endif -->
			<view class="content">
				<uni-list class='message'>
					<uni-list-item  clickable="true"  @click="jumpAduit">
						<template v-slot:body>
							<view class="body">
								<uni-badge  class="uni-badge-left-margin" :is-dot="true"  :text='2' absolute="rightTop"
									size="small">
									<view class="title"><text>签约进度提醒</text></view>
								</uni-badge>
							     <view class="text"><text>您有一条新的签约申请，点此查看详情</text></view>
							</view>
						</template>
						<template v-slot:footer>
							<view class="footer">
							<uni-icons type="right" size="20"></uni-icons>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
	</view>
</template>

<script setup>
	const back=()=>{
		uni.navigateBack({
			delta:1
		})
	}
	
	const jumpAduit=()=>{
		uni.navigateTo({
			url:"/pages/verifypass/verifypass"
		})
	}
</script>

<style scoped>
.container {
		padding: 0 24rpx;
	}

.body{
	padding: 30rpx 0;
	width: 690rpx;
}
	.title {
		font-size: 30rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
	}

	.text {
		color: rgba(197, 200, 203, 1);
		font-size: 24rpx;
		font-weight: 400;
	}
	
	.footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
<style>
	.message /deep/ .uni-list-item__container {
		padding: 0;
	}
	
	.message /deep/ .uni-list--border {
		display: none;
	}
	
	.message /deep/ .uni-badge-left-margin {
		margin:0
	}
</style>