<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" @clickRight='looksHealth' :fixed="true" left-icon="left" statusBar='true'
			title="居民服务记录" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<Tab :tab="list"></Tab>
	</view>
</template>

<script setup>
	import Tab from "./../../components/tab/tab.vue";
	import {
		reactive,
	} from "vue";
	const list = reactive(["全部", "待审核", "待审核", "服务完成"]);
</script>

<style scoped >
</style>
