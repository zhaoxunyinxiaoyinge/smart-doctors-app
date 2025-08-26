<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar @clickLeft="back" title="团队成员" :fixed="true" statusBar='true' left-icon="left" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<view class="list">
				<view class="list-item" :key="index" v-for="(item,index) in list" @click="lookDetail(item)">
					<view class="left">
						<view class="img">
							<image class="avatar" :src="item.avatar"></image>
						</view>
						<view class="text">
							<view class="header">
								<text class="name">{{item.name}}</text>
								<image class="icon" :src="item.icon_label"></image>
							</view>
							<view class="persion">
								<text>签约人数:</text>
								<text class="num">{{item.num}}</text>
							</view>
						</view>
					</view>
					<uni-icons type="right" size="14"></uni-icons>
				</view>
			</view>
			<uni-load-more status="showLoading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue";

	onMounted(() => {
		showLoading.value="loading"
		new Promise((resvole, reject) => {
			setTimeout(() => {
				resvole({
					avatar: './../../static/doctor.png',
					label_icon: "./../../static/doctor-label.png",
					name: "栗柔学",
					num: 123

				})
			})
		}).then(res=>{
			for(let i=0;i<=3;i++){
				list.push(res);
			}
			if(list.length==4){
				showLoading.value='no-more'
			}
		})
	})
	
	const showLoading=ref("more");

	const list = reactive([
	
	])
	
	const lookDetail=(val)=>{
		let keys=Object.keys(val);
		let path=keys.map(item=>item+"="+encodeURIComponent(val.item)).join("&");
		
		uni.navigateTo({
			url:"/packageC/applyJoinTeam/applyJoinTeam?read="+false,
		})
	}
	
	const back=()=>{
		uni.navigateBack({
			delta:-1
		})
	}
</script>

<style scoped>
	.container {
		background-color: rgba(245, 247, 251, 1);
		height: 100vh;
		
	}

	.content {
		padding: 0 24rpx;
		background-color: #fff;
		padding-top:0rpx ;
		display: inline-block;
		width: 100%;
		box-sizing: border-box;
	}

	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.left {
		display: flex;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.header {
		display: flex;
		align-items: center;
	}

	.img,
	.avatar {
		width: 180rpx;
		height: 180rpx;
		margin-right: 40rpx;
	}

	.avatar {
		margin: 0;
	}

	.name {
		font-size: 32rpx;
		font-weight: 700;
		margin-right: 12rpx;
	}

	.icon {
		height: 42rpx;
		width: 142rpx;
	}

	.header {
		margin-bottom: 20rpx;
	}

	.persion {
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(96, 105, 114, 1);
	}

	.num {
		color: rgba(246, 87, 85, 1);
		font-size: 24rpx;
		font-weight: 700;
	}
</style>
