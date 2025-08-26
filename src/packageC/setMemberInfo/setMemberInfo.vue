<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back"  title="设置成员信息" :fixed="true"  @clickRight="handleSave"   rightText="保存" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<SignInfo :list="list" @choose="changeChoose" ></SignInfo>
			<view class="del">
				 <view class="btn">
					 <text>删除成员</text>
				 </view>
			</view>
		</view>
	</view>
</template>

<script setup >
	import SignInfo from "./../../components/SignInfo/SignInfo.vue";
	import {reactive,ref} from "vue";
	const list=reactive({
		title:"",
		formield:[
			{
				avatar:true,
				label:'成员头像',
				value:'./../../static/woman.png',
				arrow:true
			},
			{
				label:'成员名称',
				value:'',
			    arrow:true
			},
			{
				label:'编号',
				value:'',
					arrow:true
			},
			{
				label:'联系电话',
				value:'',
					arrow:true
			},{
				label:'团队职位',
				value:'',
					arrow:true
			},
			{
				label:'团队职位',
				value:'',
					arrow:true
			},
			{
				label:'擅长',
				value:'',
					arrow:true
			}
		]
	});
	
	const handleSave=()=>{
		uni.navigateBack();
	}
	
	const changeChoose=(val)=>{
		if(val=="联系电话"){
			uni.navigateTo({
				url:"/packageC/setTeamNumber/setTeamNumber"
			})
		}else if(val=='擅长'){
			uni.navigateTo({
				url:"/packageC/setGoods/setGoods"
			})
		}
	}  
</script>

<style scoped>
	.container {
		background: rgba(235, 236, 237, 1);
		height: 100vh;
	}
	
	.del {
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
		
	}
	
	.btn {
		width: 702rpx;
		height: 80rpx;
		color:rgba(246, 87, 85, 1);
		border:1rpx solid rgba(246, 87, 85, 1);
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;
		font-size: 30rpx;
		font-weight: 400;

	}
	.fun-list {
		background-color:rgba(235, 236, 237, 1);
	}
	
</style>
