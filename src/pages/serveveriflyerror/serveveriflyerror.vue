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
		desc:"审核不通过",
		title:"审核驳回",
		text:"您已驳回了该居民的服务申请，驳回原因：本周临时工作变动不能安排上门服务",
		process:"查看服务详情",
		imgUrl:'./../../static/sign-erro.png'
		
	})
</script>

<style scoped>

</style>