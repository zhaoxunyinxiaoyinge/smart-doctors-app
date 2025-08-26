<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar rightText="查看协议" @clickLeft="back" leftText="返回" :fixed="true" statusBar='true' left-icon="left" title="签约详情" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
	  <view class="tips">
		  <image class="img" :src="'./../../static/lock.png'"></image>
		  <text class="text">等待医生审核中</text>
	  </view>
			<SignInfo :list="list"  :formData="userData"></SignInfo>
			<SignInfo :list="serve" :formData="formData"></SignInfo>
	  <view class="bottom">
		  <view class="btn err" @click="jumToResuse"><text>驳回</text></view>
		    <view class="btn success" @click="jumToZhifu"><text>通过</text></view>
	  </view>
	</view>
</template>

<script>
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import TextareaInput from "./../../components/TextareaInput/TextareaInput.vue"
	
	import {reactive,ref} from "vue"
	export default {
		components:{
			SignInfo,
			TextareaInput
		},
		setup(){
			const list=reactive({
				title:"居民信息",
				formield:[{
					label:"真实姓名",
					value:"userName"
				},{
					label:"身份证号",
					value:"noPhone"
				},{
					label:"性别",
					value:"sex",
					sexSelect: true,
					sexList: ["男", '女']
				},{
					label:"年龄",
					value:"age"
				},{
					label:"联系电话",
					value:"phone"
				},{
					label:"现居住地",
					value:"address"
				}]
			})
			
			const serve=reactive({
				title:"签约信息",
					formield:[{
						label:"签约状态",
						value:"signState"
					},{
						label:"签约机构",
						value:"signCompany"
					},{
						label:"签约医生",
						value:"signDoctor"
					},{
						label:"服务包",
						value:"healthBags"
					},{
						label:"签约周期",
						value:"signYear"
					},{
						label:"现居住地",
						value:"nowAddress"
					},{
						label:"费用",
						value:"payMunch"
					},{
						label:"签约申请时间",
						value:"signTime"
					}]
				}
			)
			
			const formData=ref({
				signState:true,
				signCompany:"江南皮革产",
				signDoctor:"小银哥",
				healthBags:"总包",
				signYear:"三年",
				nowAddress:"深圳市",
				payMunch:"3333",
				signTime:'2023-2-4'
			})
			
			const userData=ref({
				userName:"zhaoxunuyin",
				noPhone:"kjkjkjk",
				sex:1,
				age:"总包",
				phone:'17603016347',
				address:'诸河镇赵祠村一组'
			})
			
			const jumToResuse=()=>{
				uni.navigateTo({
					url:"/pages/verifyerror/verifyerror"
				})
			}
			
			const jumToZhifu=()=>{
				uni.navigateTo({
					url:"/pages/verifypass/verifypass"
				})
			}
			
			const back=()=>{
				uni.navigateBack({
					delta:1
				})
			}
			return {
				list,
				serve,
				jumToResuse,
				jumToZhifu,
				back,
				formData,
				userData
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		padding-bottom: 98rpx;
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
