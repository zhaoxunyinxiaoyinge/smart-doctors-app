<template>
	<view class="content">
		<uni-segmented-control class='tab' :current="current" :values="props.tab" :style-type="'text'"
			active-color="rgba(73, 185, 173, 1)" @clickItem="onClickItem" />
		<scroll-view class="scroll" :scroll-y="true" :refresher-threshold="50" :refresher-enabled='true'
			:refresher-triggered='loading' @refresherrefresh="refreshPull" @scrolltolower="scrollLower">
			<view class="list">
				<ServeList :list='data'></ServeList>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script setup>
	import ServeList from "./../../components/ServeList/ServeList.vue"
	import {
		reactive,
		ref,
		onMounted
	} from "vue";
	const current = ref(0);
	const loading = ref(false);
	const data = reactive([]);
	const total = ref(0);
	const status = ref("loading");
	import {
		defineProps
	} from "vue";

	const props = defineProps({
		tab: {
			type: Array,
			default () {
				return []
			}
		}
	})

	onMounted(() => {
		getData();
	})
	const getData = (arg) => {
		if (arg == 'resh') {
			loading.value = true;
		} else {
			status.value = 'loading';
		}
		new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 1000)

		}).then(res => {
			if (arg == 'resh') {
				loading.value = false;
			}
			total.value = 20;
			for (let i = 0; i < 10; i++) {
				data.push({
					avatar: "./../../static/avatar_icon.png",
					name: "伟东",
					age: "56",
					serve: '老年人服务包',
					serveName: "老年人包",
					status: "0",
					serveTime: new Date().toLocaleDateString()
				})
			}
			if (data.total >= 20) {
				status.value = 'no-more';
			} else {
				status.value = 'more';
			}
		})
	}

	const onClickItem = (event) => {
		loading.value = true;
		current.value = event.detail;
	}

	//下拉刷新
	const refreshPull = () => {
		data.length = 0;
		getData('resh');
	}

	// 上拉刷新
	const scrollLower = () => {
		console.log("下拉")
		if (total.value == data.length) {
			status.value = 'no-more';
			return
		}
		getData();
	}
</script>

<style scoped >
		.tab {
			line-height: 80rpx;
			height: 80rpx;
		}
		.list {
			padding: 0rpx 24rpx;
		}
		.scroll {
			height:calc(100vh - 88rpx - 80rpx );
		}
</style>
