<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="设置团队信息" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<SignInfo :list="list" @choose="handleChoose"></SignInfo>
			<Tag :list="tagList" @setLabel='handleLabel'></Tag>
		</view>
	</view>
</template>

<script setup>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import Tag from "./../../components/tag/tag.vue";
	import {
		reactive
	} from "vue";
	const list = reactive({
		formield: [{
				label: "团队封面",
				value: './../../static/woman.png',
				avatar: true,
				arrow: true
			},
			{
				label: "团队名称",
				value: '李一峰毕生对',
				arrow: true
			},
			{
				label: "所属机构",
				value: '北京军区医院',
			},
			{
				label: "机构地址",
				value: '北京菜市口',
			},
			{
				label: "签约人数",
				value: '234',
			},
			{
				label: "团队评分",
				value: '98',
			},
			{
				label: "团队长",
				value: '小银哥',
				arrow: true
			}
		]
	});
	
	const tagList=reactive({
		title:'团队标签',
		arrow:true,
		field:[
		{
			text:"高血压",
			status:'success'
		},
		{
			text:"低血糖",
			status:''
		}	
		]
	})
	
	const handleChoose=(val)=>{
					console.log(val,"val")
		if(val=='团队封面'){
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function (res) {
					console.log(JSON.stringify(res.tempFilePaths));
				}
			})
		}else if(val=="团队名称"){
			console.log(val,"val")
			uni.navigateTo({
				url:"/packageC/setTeamName/setTeamName"
			})
		}
	}
	
	const handleLabel=()=>{
		uni.navigateTo({
			url:"/packageC/setTeamLabel/setTeamLabel"
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:0
		})
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		background-color: rgba(245, 247, 251, 1);
	}
</style>
