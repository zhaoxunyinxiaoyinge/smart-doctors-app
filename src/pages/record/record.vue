<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" left-text="返回" title="新建居民信息"
			height="44px"></uni-nav-bar>
		<!-- #endif -->
		<SignInfo :list='formConfig' ref="signRef"></SignInfo>

		<view class="bottom">
			<button class="btn" hover-class="btn-active" @click="jumToNext">下一步</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed,
		onMounted
	} from "vue"

	import {
		onReady
	} from "@dcloudio/uni-app";

	import SignInfo from "/src/components/SignInfo/SignInfo.vue";

	const signRef = ref();
	const formConfig = ref({
		title: "签约",
		formield: [{
				required: true,
				rules: [{
					required: true,
					errorMessage: "请输入机构名称",
				}],
				value: "username",
				label: "用户名"
			},
			{
				required: true,
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}],
				value: "telzhic",
				label: "身份证号"
			},
			{
				required: true,
				sexSelect: true,
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}],
				value: "sex",
				label: "性别",
				sexList: ["男", '女']
			},
			{
				label: "手机号",
				required: true,
				value: "phone",
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}]
			},
			{
				label: "出生日期",
				required: true,
				value: "date",
				dateSelect: true,
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}]
			},
			{
				tags: true,
				required: true,
				label: "标签",
				value: "mark",
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}],
				checkList: [false, false, false, false, false],
				contents: [{
						id: 1,
						contentDefault: "高血压",
						contentFav: '周景荣'
					},
					{
						id: 2,
						contentDefault: "高血压",
						contentFav: '周景荣'
					},
					{
						id: 3,
						contentDefault: "高血压",
						contentFav: '周景荣'
					},
					{
						id: 4,
						contentDefault: "高血压",
						contentFav: '周景荣'
					},
					{
						id: 5,
						contentDefault: "高血压",
						contentFav: '周景荣'
					}
				]
			},
			{
				conact: true,
				value: "frimary",
				required: true,
				label: "关联家庭成员",
				path: "/pages/family/family",
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"}
				]
			},
			{
				label: "是否签约",
				sign: true,
				value: "sign",
				required: true,
				rules: [{
					required: true,
					errorMessage: "请输入机构名称"
				}]
			}
		]
	})
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		})
	}

	const jumToNext = () => {
		const path = "/pages/sign/sign";
		signRef.value.valiteForoms(path);
	}

	onReady(() => {})

	const pushMessages = () => {
		const {
			beginPush
		} = uniCloud.importObject('uni-push-self');
		const app = getApp();
		beginPush(app.globalData, {
			title: "签约成功",
			text: "签约详情",
			payload: {
				text: "签约详情"
			}
		});
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		padding-bottom: 88rpx;
	}

	/* #ifndef MP-WEIXIN */
	.title {
		display: flex;
		width: 100%;
		height: 88rpx;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
		/* margin-bottom: 19rpx; */
		background-color: #fff;
		position: fixed;
		text-align: center;
		z-index: 1;
	}

	.form-field {
		padding-bottom: 88rpx;
	}

	/* #endif */



	.form {
		padding: 43rpx 30rpx 24rpx;
		background-color: #fff;
		font-size: 28rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.section {
		background-color: #fff;
		margin-top: 20rpx;
		padding: 30rpx 24rpx;
	}

	.picker {
		width: 100%;
		/* padding-left: 20rpx; */
		/* display: flex; */
		/* align-items: center; */
		/* display: flex; */
	}

	/* 	.picker>div {
		display: block;
		width: 100%;
		background-color: deeppink;
	} */

	.picker ::v-deep .uni-easyinput__placeholder-class {
		color: rgb(51, 51, 51);
		padding-left: 0rpx;
	}

	::v-deep .uni-easyinput__content-input {
		padding-left: 0 !important;
	}

	.form-content-arrow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.input-text {
		display: flex;
		justify-content: space-between;
		width: inherit;
		align-items: center;
	}

	.tag {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}

	.uni-fav {
		margin: 10rpx 15rpx 10rpx 0;
	}

	.tag-item {
		margin-right: 40rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(197, 200, 203, 1);
		border-radius: 20rpx;
		padding: 14rpx 35rpx 12rpx 33rpx;
		background-color: rgba(245, 247, 251, 1);
		margin-top: 20rpx;
	}

	.active {
		background-color: rgba(234, 254, 250, 1);
		border: 1px solid rgba(73, 185, 173, 1);
		color: rgba(73, 185, 173, 1);
	}

	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 10rpx 0;
		left: 0;
		padding-top: 8rpx;
		border-top: 1rpx solid #ccc;
		z-index: 100;
		display: flex;
		justify-content: center;
		background-color: #fff;
		z-index: 1;
	}

	.btn {
		border-radius: 20rpx;
		background: rgba(73, 185, 173, 1);
		height: 80rpx;
		color: #fff;
		font-size: 30rpx;
		width: 702rpx;
	}

	.form-control {
		/* line-height: 105rpx; */
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
	}

	.right-sign {
		display: flex;
		justify-content: flex-end;
	}
</style>

<style>
	.input .is-input-border {
		border: none !important;
	}

	.form .uni-forms-item {
		/* height: 105rpx; */
		display: flex;
		align-items: center;
	}

	/* #ifndef MP-WEIXIN */
	.container {
		padding-bottom: 0;
	}

	/* #endif */


	.form-item ::v-deep .is-disabled {
		background-color: #fff !important;
		color: #000;
	}
</style>