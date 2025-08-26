<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" rightText="保存" title="设置团队标签" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
			<SignInfo :list='list'  :edit="true"></SignInfo>
			<Tag :list="tagList" :tagClass='""'></Tag>
		</view>
	</view>
</template>

<script setup>
	import {reactive} from "vue";
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import Tag from "./../../components/tag/tag.vue"
	const list=reactive({
		title:'',
		formield:[
			{
				label:'团队标签',
				value:'',
				placeholder:'请填写标签内容',
				edit:true
			}
		]
	});
	const tagList=reactive({
		title:'',
		field:[
				
			{
				text:'高血压',
				status:'success'
			},
			{
				text:"冠心病",
				status:'info'
			}
		]
	})

</script>

<style scoped>
	.content {
		padding:  0 24rpx;
	}
</style>
