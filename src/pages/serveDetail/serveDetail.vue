<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" leftText="返回" :fixed="true"  @clickRight="looksHealthDetail" rightText="查看档案" statusBar='true' left-icon="left" title="服务详情" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="tips">
				  <image class="img" :src="'./../../static/lock.png'"></image>
				  <text class="text">等待医生审核中</text>
		</view>
		<sign-info :list="personInfo"></sign-info>
		<sign-info :list="serveInfo"></sign-info>
		
		<view class="bottom">
			<button class="btn err" hover-class="btn-active" @click="jumToServeResuse"><text>驳回</text></button>
			<button class="btn success" hover-class="btn-active" @click="jumToServePass"><text>通过</text></button>
		</view>
	</view>
</template>

<script>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	
	import {reactive} from "vue"
	
	export default {
		components:{
			SignInfo
		},
		setup(){
			const personInfo=reactive({
				title:"居民信息",
				formield:[
					{
						label:"真实姓名",
						value:"王紫嫣"
					},
					{
						label:"身份证号",
						value:"524895123548752236"
						
					},
					{
						label:"性别",
						value:"女"
					},
					{
						label:"年龄",
						value:"23"
						
					},
					{
						label:"联系电话",
						value:"13800138000"
					},
					{
						label:"现居住地",
						value:"南海区常青路58号2栋23楼2356室"
						
					}
				]
			});
			
			const serveInfo=reactive({
				title:"服务信息",
				formield:[
					{
						label:"服务单号",
						value:"202205200003"
					},
					{
						label:"服务来源",
						value:"居民申请"
					},
					{
						label:"预约医生",
						value:"阳兰广"
					},
					{
						label:"服务包",
						value:"健康体验包"
					},
					{
						label:"服务项目",
						value:"健康年包（剩余2次）"
					},
					{
						label:"服务地点",
						value:"机构门诊"
					},
					{
						label:"服务时间",
						value:"2022/05/23 10:30"
					},
					{
						label:"备注",
						value:"最近脖子痛"
					},
					{
						label:"提交时间",
						value:"2022/05/26 10:20:30"
					}
				]
			})
			
			const jumToServePass=()=>{
				uni.navigateTo({
					url:"/pages/serveverifypass/serveverifypass"
				})
			}
			
			const jumToServeResuse=()=>{
				uni.navigateTo({
					url:"/pages/serveveriflyerror/serveveriflyerror"
				})
			}
			
			const back=()=>{
				uni.navigateBack({
					delta:1
				})
			}
			
			const looksHealthDetail=()=>{
				uni.navigateTo({
					url:"/pages/headlthedit/headlthedit"
				})
			}
			
			return {
				serveInfo,
				personInfo,
				jumToServePass,
				jumToServeResuse,
				back,
				looksHealthDetail
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		padding-bottom:98rpx ;
	}
	.tips {
		height:90rpx ;
		background-color: rgba(226, 255, 248, 1);
		display: flex;
		align-items: center;
	}
	
	.img {
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx 0 24rpx ;
	}
	.text {
		color:rgba(73, 185, 173, 1);
		font-size: 28rpx;
	}
	
	.bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 98rpx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: #fff;
		border-top: 1rpx solid #eee;
		z-index: 20;
	}
	
	.btn {
		height:80rpx ;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		color:rgba(246, 87, 85, 1);
		width: 320rpx;
		border:1rpx solid rgba(246, 87, 85, 1);
		border-radius: 20rpx;
	}
	
	.btn.success {
		background-color: rgba(73, 185, 173, 1);
		color:rgba(255, 255, 255, 1);
		border:none;
	}
</style>
