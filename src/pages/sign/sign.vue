<template>
	<view class="container">
		<!-- #ifndef MP-WEIXIN -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" title="填写签约信息" height="44px">
		</uni-nav-bar>
		<!--<view class="title">
			<text>新建居民档案</text>
		</view> -->
		<!-- #endif -->
		<view class="content">
				<SiGn :list="signFormOptions" ref='form'></SiGn>
		</view>
		<view class="bottom">
			<text class="btn" @click="jumTonext">下一步</text>
		</view>
	</view>
</template>

<script>
	import {
		reactive,
		computed,
		ref
	} from "vue";
	
	import SiGn from "@/components/SignInfo/SignInfo.vue";

	export default {
		components:{SiGn},
		options: {
			styleIsolation: 'shared'
		},
		setup() {

			const form = ref(null);
			
			const signFormOptions=ref({
				title:"用户签约",
				formield:[{
					label:"签约机构",
					required:true,
					autoFormield:false,
					value:"name",
					edit:true,
					rules:[{
						required:true,
						errorMessage: "请输入机构名称"
					}]
				},{
					label:"服务站点",
					required:true,
					autoFormield:false,
					value:"serveName",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				{
					label:"签约团队",
					required:true,
					autoFormield:false,
					value:"signTeam",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				{
					label:"服务包",
					required:true,
					autoFormield:false,
					value:"serveBags",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				{
					label:"签约周期",
					required:true,
					autoFormield:false,
					value:"signWeek",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				{
					label:"费用",
					required:true,
					autoFormield:false,
					value:"pays",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				{
					label:"备注",
					required:true,
					autoFormield:false,
					value:"tips",
					edit:true,
					rules:[{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				}
				]
			})

			const signData = reactive({
				name: "",
				mark: "",
				team: "",
				money: "",
				date: "",
				servebage: "",
				serveSite: ""
			});
			const dynamicRules = reactive({
				name: {
					rules: [{
						required: true,
						errorMessage: "请输入机构名称"
					}]
				},
				mark: {
					rules: [{
						required: true,
						errorMessage: "请输入备注"
					}]
				},
				team: {
					rules: [{
						required: true,
						errorMessage: "请输入团队"
					}]
				},
				money: {
					rules: [{
						required: true,
						errorMessage: "请输入费用"
					}]
				},
				date: {
					rules: [{
						required: true,
						errorMessage: "请输入周期"
					}]
				},
				servebage: {
					rules: [{
						required: true,
						errorMessage: "请选择服务包"
					}]
				},

				serveSite: {
					rules: [{
						required: true,
						errorMessage: "请输入如服务站点"
					}]
				},
				date: {
					rules: [{
						required: true,
						errorMessage: "请输入日期"
					}]
				}

			});

			const jumTonext = () => {
				nextSubmit();
			}

			const nextSubmit = () => {
				form.value&&form.value.valiteForoms();
			}
			return {
				jumTonext,
				signData,
				dynamicRules,
				form,
				signFormOptions
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		background-color: rgba(245, 247, 251, 1);
	}

	.content {
		padding: 0 24rpx;
		font-size: 32rpx;
		color: rgba(28, 32, 35, 1);
		font-weight: 700;

		margin-bottom: 117rpx;
		background-color: #fff;

	}

	.form {
		font-size: 24rpx !important;
		font-weight: 300 !important;
	}

	.textarea {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border: none;
		margin-top: 30rpx;
		padding-bottom: 30rpx;

		.list-cell-label {
			margin-bottom: 31rpx;
		}
	}

	.list-form-items {
		margin: 20rpx auto;
		height: 104rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		align-items: center;
	}


	.blocks {
		height: 117rpx;
		width: 100%;
		background-color: red
	}

	.bottom {
		padding: 9rpx 0;
		display: flex;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
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

<style lang="scss">
	.list-form-items .is-input-border {
		border: none;
	}

	.list-form-items ::v-deep .uni-forms-item__label {
		width: 180rpx !important;
		font-size: 28rpx;
		font-weight: 400;
	}

	.list-form-items ::v-deep .uni-forms-item__content {
		font-weight: 400;
	}
</style>