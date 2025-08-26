<template>
	<uni-list :border="false" >
		<uni-list-item :clickable='true' class='section-list' v-for="item in list" @click="jumToDetail">
			<template v-slot:header>
				<image class="avatar" :src="item.avatar"></image>
			</template>
			<template v-slot:body>
				<view class="user-info">
					<view class="user-inifo-item">
						<text class="name">{{item.name}}</text>
						<text>{{item.age}}岁</text>
					</view>
					<view class="user-inifo-item">
						<text class="names">身份证号</text>
						<text>{{item.idNum}}</text>
					</view>
					<view class="user-inifo-item">
						<text class="names">签约团队</text>
						<text>{{item.tuandui}}</text>
					</view>
					<view class="user-inifo-item">
						<text class="names">服务包</text>
						<text>{{item.serveName}}</text>
					</view>
				</view>
			</template>
			<template v-slot:footer>
				<view class="footers">
					<text class="btn">{{item.status==1?'审核失败':item.status==0?"待审核":'审核成功'}}</text>
				</view>
			</template>
		</uni-list-item>

	</uni-list>
</template>

<script>
	export default {
		name: "SignList",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		emits:['detail'],
		
		setup(props,context) {
			const jumToDetail = () => {
				context.emit('detail');
			}

			return {
				jumToDetail
			}
		}
	}
</script>

<style scoped lang="scss">
	.section-list {
		flex: 1;
		justify-content: space-between;
		padding: 0;
	}




	.avatar {
		width: 40rpx;
		height: 40rpx;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		font-size: 26rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 400;
		margin-left: 10rpx;

	}


	.user-inifo-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20rpx;

		.name {
			font-size: 30rpx;
			font-weight: 700;
			margin-right: 8rpx;
		}

		.age {
			align-self: center;
		}

		.names {
			width: 106rpx;
			box-sizing: border-box;
			text-align: left;
			margin-right: 28rpx;
		}
	}

	.btn {
		width: 100rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: rgba(255, 242, 232, 1);
		font-size: 20rpx;
		font-weight: 400;
		color: rgba(250, 84, 28, 1);
		border: 1rpx solid rgba(255, 242, 232, 1);
		offset: none;
		line-height: 40rpx;
		text-align: center;
	}

	.footers {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		margin: 0;
	}

	.qianyue {
		display: flex;
		align-items: center;
	}
</style>
<style lang="css">
 .section-list /deep/ .uni-list-item__container {
		padding: 29rpx 0 !important;
		padding-left: 0;
	}
</style>
