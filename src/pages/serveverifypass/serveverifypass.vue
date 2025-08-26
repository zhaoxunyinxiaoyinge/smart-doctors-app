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
		desc:"预约服务申请审核通过",
		title:"审核通过",
		text:"",
		process:"查看预约详情",
		imgUrl:"./../../static/sign-bg.png"
	})
</script>

<style scoped>

</style>
