<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" @clickRight='looksHealth' :fixed="true" left-icon="left" statusBar='true' title="添加服务" height="44px" rightText="查看档案">
		</uni-nav-bar>
		<!-- #endif -->
		<SignInfo :list="list"></SignInfo>
		<SignInfo :list="userInfo"></SignInfo>
		<TextInput :title="'备注'" :placeholder="'请输入备注内容'"></TextInput>
		<view class="bottom">
			<button class="btn" hover-class="btn-active" @click="jumTonext">下一步</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from "vue"
	import SignInfo from "./../../components/SignInfo/SignInfo";
	import TextInput from "./../../components/TextareaInput/TextareaInput"
	const list = reactive({
		title: "居民信息",
		formield: [{
				label: "姓名",
				value: "翟枫君"
			},
			{
				label: "身份证号",
				value: "334526489542563345"
			},
			{
				label: "性别",
				value: "女"
			},
			{
				label: "年龄",
				value: "26"
			}, {
				label: "联系电话",
				value: "13800138000"
			}, {
				label: "现居地",
				value: "广东省佛山市南海区大沥镇五一村3号"
			}
		]
	})

	const userInfo = reactive({
		title: "医生信息",
		formield: [{
				label: "医生",
				value: "赵徐银",
				arrow: true
			},
			{
				label: "服务包",
				value: "年末体检优惠包"
			},
			{
				label: "服务项目",
				value: "",
				arrow: true
			}, {
				label: "服务地点",
				value: "",
				arrow: true
			}, {
				label: "服务时间",
				value: "",
				arrow: true
			}
		]
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:2
		})
	}
	const looksHealth=()=>{
		uni.navigateTo({
			url:"/pages/healthpage/healthpage"
		})
	}
</script>

<style scoped>
	.container {
		padding-bottom: 98rpx;
	}

	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 9rpx 0;
		display: flex;
		background-color: #fff;
	}

	.btn {
		width: 702rpx;
		background: rgba(73, 185, 173, 1);
		border-radius: 20rpx;
		color: #fff;
		text-align: center;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		margin: 0 auto;
	}
</style>
