<template>
	<view class="container">
		<!-- app端留下的状态栏高度 -->
		<!-- #ifdef APP -->
		<uni-nav-bar left-icon="left" @clickLeft="back" :fixed="true" statusBar='true' title="标签" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<view class="label" @click="addMark">
				<img class='icon' src="./../../static/info.png" alt="">
				<text>添加标签</text>
			</view>
			<view class="list">
			<view @click="()=>jumToDetail(item)" :class="['list-item',index===list.length-1?'last':'']" v-for="(item,index) in list">
				<view class="title">
					<uni-tag :inverted="true" :text="item.title" type="success" />
				</view>
				<view class="text">
					<text>{{item.text.join('，')}}</text>
				</view>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue";
	const list = reactive([]);
	onMounted(() => {
		uni.showLoading({
			title:"正在加载中..."
		})
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true)
			}, 500)
		}).then(res => {
			uni.hideLoading();
			for (let i = 0; i < 1; i++) {
				list.push({
					title: "高血压"+i,
					text: ["小明", "王二小", "毛泽名", "刘邦", "小黑", "小明", "王二小", "毛泽名", "刘邦", "小黑", "小明",
						"王二小", "毛泽名", "刘邦", "小黑"
					]
				})
			}

		})
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:1
		})
	}
	
	const jumToDetail=(val)=>{
		uni.navigateTo({
			url:"/packageA/setmark/setmark?query="+JSON.stringify(val)
		})
	}
	
	const addMark=()=>{
		uni.navigateTo({
			url:'/packageA/createMark/createMark'
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
	}

	.content {
		background-color: #fff;
		padding:  0 24rpx;
	}

	.label {
		height: 105rpx;
		color: rgba(73, 185, 173, 1);
		font-size: 28rpx;
		font-weight: 700;
		display: flex;
		align-items: center;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
	}

	.list-item {
		padding: 30rpx 0 36rpx;
		border-top:1rpx solid #eee;
	}
	
	.last {
		border-bottom: 1rpx solid #eee;
	}

	.title {
		font-size: 28rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}

	.text {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 24rpx;
		font-weight: bolder;
		font-weight: 400;
		color:#333;
		margin-top: 12rpx;
	}
</style>
