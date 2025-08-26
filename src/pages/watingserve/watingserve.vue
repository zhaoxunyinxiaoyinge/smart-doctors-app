<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" title="待处理服务申请" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<serve-list :list="list"></serve-list>
	</view>
</template>

<script >
	import ServeList from "./../../components/ServeList/ServeList.vue";
	import {reactive} from "vue"
	export default {
		components:{
			ServeList
		},
		setup(){
			const list=reactive([])
			return {
				list
			}
		},
		onPullDownRefresh(){
			let _this=this;
			return new Promise((resolve,reject)=>{
					setTimeout(()=>{
						resolve(true)
					},1000)
			}).then(res=>{
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom(){
			
		}
	}

</script>

<style scoped>
	.container {
		padding: 0 24rpx;
	}
</style>
