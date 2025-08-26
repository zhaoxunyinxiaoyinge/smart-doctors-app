<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="设置团长" :border="false" :fixed="true" statusBar='true' left-icon="left"
			height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="list">
			<radio-group @change="radioChange">
				<view class="list-item" :key='index' v-for="(item,index) in list">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="item.vlabel" :checked="true" />
						</view>
					</label>
					<image class="img" src="./../../static/doctor.png"></image>
					<view>
						<view><text class="title">{{item.title}}</text>
							<image class="doctor" :src="item.pic"></image>
						</view>
						<view><text class="sign-person">签约人数:</text><text class="mount">{{item.mount}}</text></view>
					</view>

				</view>
			</radio-group>
			<uni-load-more :status="more" @clickLoadMore="loadMore" :contentText="{contentdown: '点击查看更多', contentrefresh: '加载中' , contentnomore: '没有更多' }"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from "vue";

	import {
		onPullDownRefresh
	} from "@dcloudio/uni-app"

	const more = ref("loading");

	onMounted(() => {
		setTimeout(() => {
			list.push(...[{
					vlabel: 0,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55

				}, {
					vlabel: 1,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55
				},
				{
					vlabel: 3,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55

				}, {
					vlabel: 4,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55
				}
			])
			more.value = "more";
		}, 1000)
	})

	const list = reactive([])

	const current = ref(0);

	const radioChange = (e) => {
		current.value = e.detail.value;
	}

	onPullDownRefresh(() => {
		list.length = 0;
		more.value = "loading";
		setTimeout(() => {
			list.push(...[{
					vlabel: 0,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55

				}, {
					vlabel: 1,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55
				},
				{
					vlabel: 3,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55

				}, {
					vlabel: 4,
					pic: "./../../static/doctor-label.png",
					title: "漆树鸣",
					mount: 55
				}
			])
			more.value = "more";
			uni.stopPullDownRefresh();
		}, 2000)
	})

	const loadMore = () => {
		const result = Math.floor(Math.random() * 10 + 1);
		if (result == 1) {
			more.value = "noMore"
		} else {
			more.value = "loading";
			setTimeout(() => {
				list.push(...[{
						vlabel: 5,
						pic: "./../../static/doctor-label.png",
						title: "漆树鸣",
						mount: 55

					}, {
						vlabel: 6,
						pic: "./../../static/doctor-label.png",
						title: "漆树鸣",
						mount: 55
					},
					{
						vlabel: 7,
						pic: "./../../static/doctor-label.png",
						title: "漆树鸣",
						mount: 55

					}, {
						vlabel: 8,
						pic: "./../../static/doctor-label.png",
						title: "漆树鸣",
						mount: 55
					}
				])
				more.value = "noMore";
			}, 2000)
		}
	}

	const back = () => {
		uni.navigateBack({
			delta: -1
		})
	}
</script>

<style scoped>
	.list {
		padding: 0 24rpx;
	}

	.list-item {
		display: flex;
		margin-top: 30rpx;
	}

	.img {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
		margin: 0 40rpx 0 30rpx;
	}

	.doctor {
		width: 140rpx;
		height: 42rpx;
		vertical-align: middle;
	}

	.title {
		color: rgba(28, 32, 35, 1);
		font-weight: 700;

	}

	.sign-person {
		font-size: 24rpx;
		color: rgba(96, 105, 114, 1);
		font-weight: 400;
		margin-right: 8rpx;
	}

	.mount {
		color: rgba(246, 87, 85, 1);
		font-size: 24rpx;
		font-weight: 700;
	}
</style>