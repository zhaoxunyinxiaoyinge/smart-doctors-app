<!-- 账号密码登录页 -->
<template>
	<!-- #ifdef APP -->
	<uni-nav-bar title="用户密码登录" :fixed="true" statusBar='true' height="44px">
	</uni-nav-bar>
	<!-- #endif -->
	<view class="uni-content">
		<!-- 顶部文字 -->
		<text class="title title-box">账号密码登录</text>
		<uni-forms>
			<uni-forms-item name="username">
				<uni-easyinput :focus="focusUsername" @blur="focusUsername = false" class="input-box"
					:inputBorder="false" v-model="username" placeholder="请输入手机号/用户名/邮箱" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
					type="password" :inputBorder="false" v-model="password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<Argrement @setAgree='handleAgrement' ref="argrement" @popupConfirm='handleConfirm'></Argrement>
		<button class="uni-btn" type="primary" @click="pwdLogin">登录</button>
		<view class="tips">
			<view class="forget">
				<text>忘记了?</text>
				<text class="link">找回密码</text>
			</view>
			<text class="resister link" @click="handleResister">注册账号</text>
		</view>
		<view><button @click="()=>{handleSay()}">点击获取服务器数据</button></view>
	</view>
</template>

<script>
	import Argrement from "@/components/Agrement/Agrement.vue";
	const cols=uniCloud.importObject("clos");
	export default {
		components: {
			Argrement
		},
		created() {
			const token=uni.getStorageSync("uni_id_token");
			if(token){
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		},
		
		data() {
			return {
				"password": "",
				"username": "",
				"focusUsername": false,
				"focusPassword": false,
				argrement: false
			}
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.pwdLogin()
				}
			};
			// #endif
		},
		methods: {
		 async	handleSay(){
				const res=await cols.sayhell();
				uni.showToast({
					title:"ok"
				})
				console.log(res.data,"res");
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.password.length) {
					this.focusPassword = true
					return uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 3000
					});
				}
				if (!this.username.length) {
					this.focusUsername = true
					return uni.showToast({
						title: '请输入手机号/用户名/邮箱',
						icon: 'none',
						duration: 3000
					});
				}

				if (!this.argrement) {
					this.$refs.argrement.popup();
					return
				}


				let data = {
					"password": this.password,
					'username': this.username
				}
				
				const uniIdCo={login:()=>new Promise((resolve,reject)=>{resolve({newToken:{token:"23456"}})})}

				uniIdCo.login(data).then(e => {
					uni.setStorage("token", e.newToken.token);
					uni.switchTab({
						url: "/pages/index/index"
					})
				}).catch(e => {
					if (e.errCode == 'uni-id-captcha-required') {
						this.needCaptcha = true
					} else if (this.needCaptcha) {
						//登录失败，自动重新获取验证码
					}
				})
			},

			handleAgrement(val) {
				this.argrement = val;
			},

			handleConfirm() {
				this.argrement = true;
				this.pwdLogin();
			},
			handleResister() {
				uni.navigateTo({
					url: "/pages/resister/resister"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";
	@media screen and (min-width: 690px) {
		.uni-content {
			height: auto;
		}
	}

	.forget {
		font-size: 12px;
		color: #8a8f8b;
	}

	.link-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.link {
		font-size: 12px;
	}

	.tips {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.link {
			font-size: 12px;
			color: royalblue
		}
	}
</style>