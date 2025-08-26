<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" right-text='完成' statusBar='true' left-icon="left" title="选择家庭成员"
			height="44px"></uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<checkbox-group @change="handleFrimary">
					<view class="list-item" :key="index" v-for="(item,index) in list">
						<label>
							<view class="header">{{item.letter}}</view>
							<view class="sub-list" :key="sIndex" v-for="(sItem,sIndex) in item.data">
								<checkbox :value="sItem.id" :checked="checkedFamily.includes((sItem.id))"
									style="transform:scale(0.7)" />
								<view class="sub-list-item">
									<image :src="sItem.avatar" class="avatar"></image>
									<text class="name">{{sItem.name}}</text>
									<text class="age">{{sItem.age}}</text>
								</view>
							</view>
						</label>
					</view>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		getCurrentInstance
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";

	const instance = getCurrentInstance().proxy
	const eventChannel = instance.getOpenerEventChannel();

	const list = reactive([{
		"letter": "A",
		"data": [{
			id: 0,
			name: "小王",
			avatar: "./../../static/avatar_doctor.png",
			age: 13,
			sex: 0
		}, ]
	}, {
		"letter": "B",
		"data": [{
			id: 1,
			name: "小王",
			avatar: "./../../static/avatar_doctor.png",
			age: 27,
			sex: 1
		}, {
			id: 2,
			name: "小王",
			avatar: "./../../static/avatar_doctor.png",
			age: 27,
			sex: 1
		}]
	}, {
		"letter": "C",
		"data": [{
			id: 3,
			name: "小王",
			avatar: "./../../static/avatar_doctor.png",
			age: 21,
			sex: 1
		}]
	}])
	const value = ref("");
	const currentIndex = ref(null);
	const checkedFamily = ref([]);

	onLoad(function(options) {
		if (options.ids) {
			checkedFamily.value = options.ids.split(",").map(item => parseInt((item)));
		}
	})

	const back = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	const bindClick = () => {

	}

	const bindRadio = (event) => {
		currentIndex.value = event.detail.value;
	}

	const handleFrimary = (event) => {
		const values = event.detail.value;
		//获取数据；
		const map = new Map();
		const checkedUsers = values.forEach(item => {
			list.forEach(sitem => {
				const listItem = sitem.data;
				const index = listItem.findIndex(ssItem => ssItem.id == parseInt(item));
				if (index != -1) {
					console.log(index)
					map.set(listItem[index].id, listItem[index].name);
				}
			})
		})
		//向上一级页面返回数据
		 eventChannel.emit('acceptDataFromOpenedPage', {
		      data: map
		    });
	}
</script>

<style scoped lang="scss">
	.container {
		background-color: rgba(235, 236, 237, 1);
	}

	.content {}

	.list-item {
		padding-top: 30rpx;
	}

	.header {
		height: 63rpx;
		padding-left: 28rpx;
		font-size: 24rpx;
		color: rgba(28, 32, 35, 1);
	}

	.sub-list {
		background-color: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 24rpx;
	}

	.sub-list-item {
		flex: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #ccc;
	}

	.avatar {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin: 0 20rpx
	}

	.name {
		font-size: 30rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;

	}

	.age {
		font-size: 24rpx;
		color: rgba(28, 32, 35, 1);
		margin-left: 8rpx;
	}

	.sex {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
</style>