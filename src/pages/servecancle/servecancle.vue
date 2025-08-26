<template>
	<view class="container">
		<message-info :linkUrl='linkUrl' :config='config'></message-info>
	</view>
</template>

<script setup>
	import {ref,reactive} from "vue";
	import MessageInfo from "./../../components/MessageInfo/MessageInfo.vue";
	const linkUrl=ref('/pages/serveDetail/serveDetail');
	const config=reactive({
		desc:"预约服务取消成功",
		title:"取消成功",
		text:"您已取消了该居民的服务预约，取消原因：本周临时工作变动不能安排上门服务",
		process:"查看预约详情",
		imgUrl:"./../../static/sign-bg.png"
	})
</script>

<style>

</style>
