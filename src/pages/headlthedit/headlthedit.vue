<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" @clickRight="jumToPrevPage" rightText="保存" :fixed="true" statusBar='true' left-icon="left" title="健康"
			height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<sign-info :list='list'></sign-info>
		<sign-info :list='personInfo'></sign-info>
		<sign-info :list='hujitype'></sign-info>
		<sign-info :list="labelList"></sign-info>
		<sign-info :list='healthinfo'></sign-info>
		<sign-info :list='caseinfo'></sign-info>
	</view>
</template>

<script setup>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue"
	import {
		reactive,
		ref
	} from "vue";
	const list = reactive({
		title: "基本信息",
		formield: [{
				label: "头像",
				value: './../../static/woman.png',
				avatar: true,
				arrow: true
			},
			{
				label: "真实姓名",
				value: '334526489542563345',
				required: true,
				edit: true
			},
			{
				label: "真实姓名",
				value: '334526489542563345',
				required: true,
				edit: true
			},
			{
				label: "真实姓名",
				value: '334526489542563345',
				required: true,
				edit: true
			},
			{
				label: "头像",
				value: '334526489542563345',
				edit: true
			},
			{
				label: "头像",
				value: '334526489542563345',
				edit: true
			},
			{
				label: "头像",
				value: '334526489542563345',
				edit: true
			}
		]
	})

	const personInfo = reactive({
		title: "",
		formield: [{
				label: "性别",
				value: "",
				placeholder: '请选择性别',
				required: true,
				arrow: true,
			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请选择出生日期',
				required: true,
				arrow: true
			},
			{
				label: "籍贯",
				value: "",
				placeholder: '请输入籍贯',
				edit: true
			},

			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',
				arrow: true,

			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',
				arrow: true
			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',
				arrow: true
			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',

			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',

			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',

			},
			{
				label: "出生日期",
				value: "",
				placeholder: '请输入出生日期',

			}
		]
	})

	const hujitype = reactive({
		title: '',
		formield: [{
				label: "户籍类型",
				value: '',
				edit: true,
				checkbox: "radio",
				range: [{
						text: '农村',
						value: 0
					},
					{
						text: '城市',
						value: 1
					}
				]
			},
			{
				label: "定点医疗单位",
				value: '',
				placeholder: '请输入定点医疗单位',
				edit: true
			},
			{
				label: "费用类型",
				value: '',
				edit: true,
				checkbox: 'checkbox',
				range: [{
						text: '自费',
						value: 0
					}, {
						text: '社会医疗保险',
						value: 1
					},
					{
						text: '自费',
						value: 2
					}, {
						text: '新农合',
						value: 3
					}, {
						text: '其他',
						value: 4
					}
				]
			}
		]
	})

	const healthinfo = reactive({
		title: "健康信息",
		formield: [{
				label: '身高',
				value: '',
				edit: true,
				placeholder: '请填写',
				unit: "cm"
			},
			{
				label: '身高',
				value: '',
				edit: true,
				placeholder: '请填写',
				unit: 'kg'
			},
			{
				label: '身高',
				value: '',
				edit: true,
				arrow: true,
				placeholder: '请填写'
			},
			{
				label: '身高',
				value: '',
				edit: true,
				arrow: true,
				placeholder: '请填写'
			}
		]
	})

	const caseinfo = reactive({
		title: '',
		formield: [{
				label: "过敏史",
				value: '',
				checkbox: 'radio',
				range: [{
						text: '无',
						value: 0
					},
					{
						text: "有",
						value: 1
					}
				]
			},
			{
				label: "既往史",
				value: '',
				checkbox: 'radio',
				range: [{
						text: '无',
						value: 0
					},
					{
						text: "有",
						value: 1
					}
				]
			},
			{
				label: "就诊史",
				value: '',
				checkbox: 'radio',
				range: [{
						text: '无',
						value: 0
					},
					{
						text: "有",
						value: 1
					}
				]
			},
			{
				label: "家族病史",
				value: '',
				checkbox: 'radio',
				range: [{
						text: '无',
						value: 0
					},
					{
						text: "有",
						value: 1
					}
				]
			}
		]
	})
	
	const labelList=reactive({
		formield:[
			{
				label:'居民标签',
				value:'',
				placeholder:'请填写标签内容',
				edit:true
			},
			{
				autoFormield:true,
				tag:[
					{
						text:"高血压",
						status:'success'
					},
					{
						text:"冠心病",
						status:'success'
					},
					{
						text:"冠心病",
						status:'error'
					},
					{
						text:"冠心病",
						status:'success'
					},{
						text:"冠心病",
						status:'success'
					},
					{
						text:"冠心病",
						status:'success'
					}
				]
			},
			{
				label:'关联家人',
				value:'',
				placeholder:'请选择居民家人信息',
				edit:true
			}
			
		]
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:2
		})
	}
	
	const jumToPrevPage=()=>{
		uni.navigateBack({
			delta:1
		})
	}
</script>

<style scoped>
	.container {
		background: rgba(245, 247, 251, 1);
		/* 		height: 100vh;// */
	}
</style>
