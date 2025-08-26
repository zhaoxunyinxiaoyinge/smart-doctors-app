<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" @clickRight="handleSave" title="设置" :fixed="true" rightText="保存" statusBar='true'
			left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<sign-info :list="list" @field="(item)=>handleFieldSetting(item,'slide-right')"></sign-info>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="setting-panle" :class="setting.show?'setting-panled':''">
			<view class="flex">
				<view class="input">
					<uni-easyinput :inputBorder="false" errorMessage v-model="fixField.value" focus
						placeholder="请输入内容" border></uni-easyinput>
				</view>
				<button type="primary" size="mini" class="btn" @click="handleSave"> 确定</button>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifndef MP-WEIXIN -->
		<view class="update-field">
			<uni-transition ref="ani" custom-class="transition" :mode-class="setting.modeClass"
				:show="setting.show"><view class="text">
					<uni-section title="默认" type="line" padding>
						<uni-easyinput :inputBorder="false" border errorMessage v-model="fixField.value" focus
							placeholder="请输入内容"></uni-easyinput>
					</uni-section>
				</view></uni-transition>
		</view>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import {
		reactive
	} from "vue";
	const setting = reactive({
		show: false,
		modeClass: 'fade',
	})

	const fixField = reactive({
		label: "",
		value: ""
	});


	const list = reactive({
		formield: [{
				label: "成员头像",
				avatar: true,
				value: "./../../static/woman.png",
				arrow: true
			}, {
				label: "成员名称",
				value: "李小江",
				arrow: true
			},
			{
				label: "编号",

				value: "2051615",
				arrow: true
			},
			{
				label: "联系电话",

				value: "13800138000",
				arrow: true
			}, {
				label: "团队职位",
				value: "",
				arrow: true
			}, {
				label: "医生简介",

				value: "全科医师",
				arrow: true
			}, {
				label: "擅长",

				value: "北京大学第一医院内分泌科专家...",
				arrow: true
			},
			{
				label: "疾病",
				value: "擅长代谢性疾病引起的不孕不育诊疗......",
				arrow: true
			}
		]
	});

	const handleFieldSetting = (item, type) => {
		console.log(item, "item")
		if (item.avatar) {
			uni.chooseImage({
				count: 1,
				success(res) {
					let imgpath = res.tempFilePaths[0];
					fixField.label = item.label;
					fixField.value = imgpath;
					settingVal()
				}
			})

		} else {
			setting.show = true;
			setting.modeClass = type;
			fixField.label = item.label;
			fixField.value = item.value;
		}
	}

	const handleSave = () => {
		if (!fixField.value) {
			uni.showToast({
				title: "字段不能为空",
				icon: "error"
			})
			return
		}
		setting.show = false;
		settingVal()
	}

	const settingVal = () => {
		const currentLabel = fixField.label;
		console.log(currentLabel, "345")
		list.formield.forEach(item => {
			if (item.label === currentLabel) {
				item.value = fixField.value;
			}
		})
	}

	const back = () => {
		uni.navigateBack();
	}
</script>

<style scoped>
	.transition {
		position: fixed;
		top: 40px;
		left: 0;
		height: 100vh;
		width: 100%;
		background-color: #fff;
	}

	.setting-panle {
		position: fixed;
		transform: translateX(-100%);
		top: 0;
		left: 0;
		height:100vh;
		width: 100%;
		background-color: #fff;
		transition: all .5s ease-in;
		z-index: 2;
	}
	

	.setting-panled {
		transform: translateX(0);
		transition: all .5s ease-in;
	}

	.flex {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.input {
		flex: 1;
		border-bottom: 2rpx solid #eee;
	}

	.btn {
		margin: 0 10rpx;
		width: 140rpx;

	}
</style>