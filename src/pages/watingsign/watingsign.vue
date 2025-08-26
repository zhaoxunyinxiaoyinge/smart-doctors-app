<template>
	<view class="container">
		<!-- #ifdef APP -->
		<!-- app端和h5留下的状态栏高度 -->
		<uni-nav-bar @clickLeft="back" :fixed="true" statusBar='true' left-icon="left" title="待处理签约申请" height="44px">
		</uni-nav-bar>
		<!-- #endif -->
		<sign-list :list="list"></sign-list>
		<!-- 加载更多 -->
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script >
	import {reactive,getCurrentInstance} from "vue"
	import SignList from "./../../components/SignList/SignList.vue";
	
	export default {
		components:{
			SignList
		},
		data(){
			return {
				list:[],
				status:"loading"
			}
		},
		mounted(){
			let _this=this;
			new Promise((resolve,reject)=>{
					setTimeout(()=>{
						resolve(true)
					},1000)
			}).then(res=>{
				for(let i =0;i<10;i++){
				_this.list.push({
					avatar:"./../../static/avatar_icon.png",
					name:"伟东"+i,
					age:"56"+i,
					idNum:'421023198910030517',
					tuandui:"杨兰团队",
					serveName:"老年人包",
					status:"0"
				})	
				}
				_this.status="more";
			})
		},
		onPullDownRefresh(){
				let _this=this;
				let len=this.list.length;
			   _this.list.splice(0,len);
				_this.status="loading";
				return new Promise((resolve,reject)=>{
						setTimeout(()=>{
							resolve(true)
						},1000)
				}).then(res=>{
					let len=_this.list.length;
					_this.status="more"
					for(let i=0;i<10;i++){
						_this.list.push({
						avatar:"./../../static/avatar_icon.png",
						name:"伟东",
						age:"56",
						idNum:'421023198910030517',
						tuandui:"杨兰团队",
						serveName:"老年人包",
						status:"0"
						})
					}
				uni.stopPullDownRefresh();	
				})
		},
		onReachBottom(){
			if(this.list.length==20){
				return 
			}
			let _this=this;
			this.status='loading',
			new Promise((resolve,reject)=>{
					setTimeout(()=>{
						resolve(true)
					},1000)
			}).then(res=>{
				_this.status="no-more"
				for(let i=0;i<10;i++){
					_this.list.push({
					avatar:"./../../static/avatar_icon.png",
					name:"伟东",
					age:"56",
					idNum:'421023198910030517',
					tuandui:"杨兰团队",
					serveName:"老年人包",
					status:"0"
					})
				}
			})
		}
	}
	
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		padding: 0 24rpx;
	}
</style>


