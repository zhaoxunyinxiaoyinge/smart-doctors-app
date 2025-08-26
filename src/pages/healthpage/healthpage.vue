<template>
	<view class="container">
		<!-- app端留下的状态栏高度 -->
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" @clickRight="handleEdit" rightText="编辑档案" :fixed="true" statusBar='true' left-icon="left" title="健康档案" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view>
			<sign-info :list="baseInfo"></sign-info>
			<Tag :list="tagList"></Tag>
			<Framily title='家庭成员' :list="persons"></Framily>
			<sign-info :list="framily"></sign-info>
			<sign-info :list="headlthinfo"></sign-info>
		</view>
	</view>
</template>

<script setup>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import Tag from "./../../components/tag/tag.vue";
	import Framily from "./../../components/FramilyMenmber/FramilyMenmber.vue";

	import {
		reactive
	} from "vue"

	const baseInfo = reactive({
		title: "基本信息",
		formield: [{
				label: "头像",
				value: "./../../static/woman.png",
				avatar: true
			},
			{
				label: "姓名",
				value: "翟枫君"
			}, {
				label: "身份证号",
				value: "334526489542563345"
			}, {
				label: "联系电话",
				value: "13800138000"
			}, {
				label: "现居地",
				value: "广东省佛山市南海区大沥镇五一村3号"
			}, {
				label: "户籍地址",
				value: "广东省佛山市南海区大沥镇五一村3号"
			}, {
				label: "行政区划",
				value: "桂雅社区"
			}
		]
	})

	const framily = reactive({
		title: "个人信息",
		formield: [{
				label: "性别",
				value: "女"
			},
			{
				label: "出生日期",
				value: "1989-05-23"
			},
			{
				label: "籍贯",
				value: "潮汕"
			}, {
				label: "民族",
				value: "汉族"
			}, {
				label: "文化程度",
				value: "本科"
			},
			{
				label: "婚姻状况",
				value: "已婚"
			},
			{
				label: "职业",
				value: "教师"
			},
			{
				label: "工作单位",
				value: "南海实验小学"
			},
			{
				label: "紧急联系人",
				value: "卫明力"
			},
			{
				label: "联系人电话",
				value: "13522325465"
			}, {
				label: "户籍类型",
				value: "农村"
			},
			{
				label: "定点医疗单位",
				value: ""
			},
			{
				label: "费用类型",
				value: "自费"
			}
		]
	})

	const headlthinfo = reactive({
		title: "健康信息",
		formield: [{
				label: "身高",
				value: "169cm"
			},
			{
				label: "体重",
				value: "50Kg"
			}, {
				label: "血型",
				value: '0型'
			},
			{
				label: "RH阴性",
				value: "否"
			},
			{
				label: "过敏史",
				value: "无"
			},
			{
				label: "既往史",
				value: "无"
			}, {
				label: "就诊史",
				value: "无"
			},
			{
				label: "家族病史",
				value: "无"
			}
		]
	})

	const persons = reactive([{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
			age: 58,
			icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: "母亲"
		},
		{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
		 age: 58,
		 icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: "母亲"
		},
		{
			avatar: "./../../static/woman.png",
			nickName: "韦栋",
		 age: 58,
		 icon: "./../../static/icon_woman.png",
			conactName: "关系:",
			name: "母亲"
		}
	])

	const tagList = reactive({
		title: "居民标签",
		field: [{
				text: "高血压",
				status: "success"
			},
			{
				text: "低血糖",
				status: "error"
			}
		]

	})
	
	const handleEdit=()=>{
		uni.navigateTo({
			url:"/pages/headlthedit/headlthedit"
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:2
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
	}
</style>
