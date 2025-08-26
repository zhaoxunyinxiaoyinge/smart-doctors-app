<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" left-text="返回" title="选择服务包" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<uni-list :border="false">
				<uni-list-item class="list-item-content" :key='index' link v-for="(item,index) in list">
					<template v-slot:header>
						<view class="slot-box">
							<image lazy-load class="slot-image" :src="item.avatar" ></image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="content-body">
							<text class=" slot-text">{{item.text}}</text>
							<text class=" slot-text">{{item.desc}}</text>
						</view>

					</template>
				</uni-list-item>
			</uni-list>
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		reactive
	} from "vue";
	import {
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app";
	const status = ref("loading");
	const total = ref(20);
	const list = reactive([]);

	const getData = () => {
		status.value = 'loading';
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve([{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					},
					{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					},
					{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					},
					{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					},
					{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					},
					{
						avatar: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hY5BVCbW24-iWsPLA511tgHaEK?pid=ImgDet&rs=1',
						text: "自定义插槽",
						desc: "天下无敌"
					}
				])
			},2000)
		}).then(res => {
			list.push(...res);
			console.log(list,555)
			if (list.length > 20) {
				status.value = "no-more";
			} else {
				status.value = 'more';
			}
			return Promise.resolve(true);
		})
	}

	onMounted(() => {
		getData();
	});

	onPullDownRefresh(() => {
		list.length =0;
		getData().then(res => {
			console.log("停止属性")
			uni.stopPullDownRefresh();
		})

	});

	onReachBottom(() => {
		if (list.length > 20) {
			return
		}
		getData();
	})
	
	const back=()=>{
		uni.navigateBack({delta:0})
	}
</script>

<style scoped>
	.content {
		padding: 24rpx 24rpx 0;
	}

	.slot-image {
		width: 180rpx;
		margin-right: 40rpx;
		height: 180rpx;
	}

	.list-item-content {
		margin-bottom: 30rpx;
	}
	.content-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.slot-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>
<style>
	.list-item-content /deep/ .uni-list--border::after {
		border-bottom: none;
		height: 0 !important;

	}

	.list-item-content /deep/ .uni-list-item__container {
		padding: 0;
	}

	.list-item-content /deep/ .uni-icon-wrapper {
		padding: 0;
	}
</style>
