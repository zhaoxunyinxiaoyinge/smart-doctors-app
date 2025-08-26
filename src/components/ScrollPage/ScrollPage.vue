<template>
	<view>
		<view class="aside">
			<text :key="item.title" v-for="item in props.list" :class="['word',position==item.title?'active':'']"
				@click="()=>jumToScrollPosition(item.title)">{{item.title}}</text>
		</view>
		<scroll-view  :scroll-with-animation='true' :scroll-into-view="position" class="scroll"
			ref="scroll" :scroll-y="true" scroll-with-animation=true :scroll-x="false"
			:style="{'height':props.height+'px'}">
			<view class="list-cargory">
				<view :key="index" v-for="(item,index) in props.list">
					<view class="list-item" :id="item.title">
						<view class="title"><text>{{item.title}}</text></view>
					</view>
					<view class="list" :id="item.title+'item'">
						<view class="sub-list-item" v-for="sItem in item.list">
							<checkbox v-if="sItem.checkbox" style="transform:scale(0.7)" :value="sItem.id||0"
								:checked="sItem.checked" />
							<image class="avatar" :src="sItem.profile.avatar"></image>
							<view class="sub-content" @click.prevent="jumToDetail(sItem)">
								<view class="name">
									<text class="nickname">{{sItem.profile.nick}}</text><text class='age'>{{13}}岁</text>
									<image :src="sItem.profile.icon" class="icon"></image>
								</view>
								<view class="right-btn" v-if="sItem.btn">
									<text class="right-btn-text">{{sItem.btnText}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive,
		watchEffect,
		nextTick,
		getCurrentInstance
	} from "vue";

	const props = defineProps({
		height: {
			type: Number,
			default: 200
		},
		list: {
			type: Array,
			default () {
				return []
			}
		}
	})

	const top = ref(0);
	const position = ref("A");

	const jumToDetail = (cur) => {
		uni.navigateTo({
			url: '/pages/residentdetail/residentdetail?type=one&c2c=' + cur.profile.userID
		})
	}

	const jumToScrollPosition = (val) => {
		nextTick(() => {
			position.value = val;
		})
	}
	

</script>

<style scoped>
	.scroll {
		position: relative;
	}

	.title {
		height: 73rpx;
		background-color: rgba(245, 247, 251, 1);
		box-sizing: border-box;
		padding: 28rpx 0 0 30rpx;
	}

	.list {
		padding: 0rpx 24rpx;
		padding-right: 74rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.sub-list-item {
		width: 100%;
		display: flex;
		align-items: center;

	}

	.right-btn {
		position: absolute;
		top: 30rpx;
		right: 0;
		height: 40rpx;
		width: 148rpx;
		background-color: rgba(254, 241, 241, 1);
		color: rgba(246, 87, 85, 1);
		font-size: 20rpx;
		font-weight: 400;
		text-align: center;
		line-height: 40rpx;
		border-radius: 20rpx;
	}

	.right-btn-text {
		font-size: 20rpx;
		display: inline-block;
		/* #ifdef H5 */
		font-size: 20rpx;
		transform: scale(.8);
		/* #endif */
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
	}

	.sub-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid rgba(227, 228, 229, 1);
		padding: 30rpx 0;
		position: relative;
	}

	.sub-list-item {
		display: flex;
	}

	.name {
		margin-bottom: 10rpx;

	}

	.nickname {
		font-size: 30rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		margin-right: 8rpx;
	}

	.age {
		font-size: 24rpx;
		font-weight: 400rpx;
		color: rgba(28, 32, 35, 1);
		margin-right: 8rpx;
	}

	.icon {
		width: 20rpx;
		height: 20rpx;
	}

	.tag {
		display: flex;
		flex-wrap: wrap;
	}

	.tag-item {
		height: 34rpx;
		width: 120rpx;
		font-size: 20rpx;
		color: rgba(73, 185, 173, 1);
		background-color: rgba(234, 254, 250, 1);
		border: 1px solid rgba(73, 185, 173, 1);
		text-align: center;
		line-height: 34rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.aside {
		position: fixed;
		display: flex;
		flex-direction: column;
		right: 10rpx;
		width: 60rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 24rpx;
		font-weight: 400;
		background-color: #fff;
		z-index: 2;
		text-align: center;

	}

	.aside .active {
		color: rgba(246, 87, 85, 1);

	}

	.word {
		margin-bottom: 20rpx;

	}
</style>