<template>
	<view class="container">
		<!-- #ifdef APP -->
		<uni-nav-bar :fixed="true" statusBar='true' height="60"  >
			<view class="search-input">
				<uni-search-bar :focus='false' class="search" :clearButton="'none'" cancelButton='none'
					@confirm="search" v-model="searchValue" @blur="blur" @focus="focus" @input="input" @cancel="cancel"
					@clear="clear" :maxlength="100" :placeholderStyle="placeholderStyle">
				</uni-search-bar>
				<text class="cancel" @click="cancle">取消</text>
			</view>
		</uni-nav-bar>
		<!-- #endif -->
		<view class="content">
			<!-- #ifndef APP  -->
			<view class="search-input">
				<uni-search-bar placeholder="输入查询" @confirm="search" cancel-text="取消" @cancel='cancel'	>
					<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
				</uni-search-bar>
			</view>
			<!-- #endif -->
			<view class="history">
				<view class="title">
					<view class="text"><text>历史搜索</text></view>
					<view class="del">
						<imag src="./../../static/del.png"></imag>
					</view>
				</view>
				<view class="history-list">
					<uni-tag :inverted="true" :key='item' v-for="item in historySearch" :text="item" type="primary" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const placeholderStyle = ref("font-siz:26rpx;color:rgba(197, 200, 203, 1);font-weight:400");

	const historySearch = ref(["周锦荣"]);
	
	const cancel = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	const search = (value) => {
		console.log(value, "value")
	}
</script>

<style scoped>
	.container {
		background-color: #fff;
		padding: 0 24rpx;
	}

	/* #ifdef APP */
	.search-input {
		height: 100rpx;
		display: flex;
		width:100vw;
		justify-content: flex-start;
		align-items: center;
		border-radius: 20rpx;
		position: absolute;
		left: 20rpx;
	}

	/* #endif */
	

	/* #ifndef APP */
	.search-input {
		width: 100%;
		height: auto;
		border-radius: 20rpx;
	}

	/* #endif */

	.search {
		/* #ifndef APP */
		   flex: 1;
		/* #endif */

		/* #ifndef MP-WEIXIN */
		width: 596rpx;
		/* #endif */

	}

	.img {
		width: 80rpx;
		height: 80rpx;
		margin-right: 32rpx;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0;
	}

	.text {
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(28, 32, 35, 1);
	}

	.del {
		width: 20rpx;
		height: 20rpx;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
	}
	.cancle {
		font-size: 32upx;
		margin-left: 10upx;
	}
</style>

<style>
	.search-input .uni-searchbar {
		padding: 10rpx;
	}
</style>