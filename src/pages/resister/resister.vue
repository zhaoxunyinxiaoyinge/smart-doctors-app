<!-- 账号注册页 -->
<template>
	<!-- #ifndef MP-WEIXIN -->
		<uni-nav-bar @back="navigateBack" left-text="返回" left-icon="left"    title="注册" :fixed="true" statusBar='true' height="44px" >
		</uni-nav-bar>	
	<!-- #endif -->	
	<view class="uni-content">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="username" required>
				<uni-easyinput :inputBorder="false" :focus="focusUsername" @blur="focusUsername = false"
					class="input-box" placeholder="请输入用户名" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput :inputBorder="false" :focus="focusNickname" @blur="focusNickname = false"
					class="input-box" placeholder="请输入用户昵称" v-model="formData.nickname" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword" @blur="focusPassword = false"
					class="input-box" maxlength="20"
					:placeholder="'请输入' + (config.passwordStrength == 'weak'?'6':'8') + '-16位密码'" type="password"
					v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="password2" v-model="formData.password2" required>
				<uni-easyinput :inputBorder="false" :focus="focusPassword2" @blur="focusPassword2 =false"
					class="input-box" placeholder="再次输入密码" maxlength="20" type="password" v-model="formData.password2"
					trim="both" />
			</uni-forms-item>
			<uni-forms-item>
				<uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />
			</uni-forms-item>
			
			<agrement scope="register" ref="agreements" @setAgree="handleAegrement"></agrement>
			
			<button class="uni-btn" type="primary" @click="submit">注册</button>
			<match-media :min-width="690">
				<view class="link-box">
					<text class="link" @click="toLogin">已有账号？点此登录</text>
				</view>
			</match-media>
		</uni-forms>
	</view>
</template>

<script>
	import config from '@/uni_modules/uni-id-pages/config.js';
	import agrement from "@/components/Agrement/Agrement.vue";
	import uniCaptcha from "@/uni_modules/uni-captcha/components/uni-captcha/uni-captcha.vue"
	
	
	const uniIdCo = uniCloud.importObject("uni-id-co")
	
	const {passwordStrength} = config
	console.log(passwordStrength);
	// 密码强度表达式
	const passwordRules = {
		// 密码必须包含大小写字母、数字和特殊符号
		super: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
		// 密码必须包含字母、数字和特殊符号
		strong: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
		// 密码必须为字母、数字和特殊符号任意两种的组合
		medium: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
		// 密码必须包含字母和数字
		weak: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,16}$/
	}	
	
	const ERROR = {
		normal: {
			noPwd: '请输入密码',
			noRePwd: '再次输入密码',
			rePwdErr: '两次输入密码不一致'
		},
		passwordStrengthError: {
			super: '密码必须包含大小写字母、数字和特殊符号，密码长度必须在8-16位之间',
			strong: '密码必须包含字母、数字和特殊符号，密码长度必须在8-16位之间',
			medium: '密码必须为字母、数字和特殊符号任意两种的组合，密码长度必须在8-16位之间',
			weak: '密码必须包含字母，密码长度必须在6-16位之间'
		}
	}
	
	function validPwd(password) {
		//强度校验
		if (passwordStrength && passwordRules[passwordStrength]) {
			if (!new RegExp(passwordRules[passwordStrength]).test(password)) {
				return ERROR.passwordStrengthError[passwordStrength]
			}
		}
		return true
	}
	
	
	function getPwdRules(pwdName = 'password', rePwdName = 'password2') {
		const rules = {}
		rules[pwdName] = {
			rules: [{
					required: true,
					errorMessage: ERROR.normal.noPwd,
				},
				{
					validateFunction: function(rule, value, data, callback) {
						const checkRes = validPwd(value)
						if (checkRes !== true) {
							callback(checkRes)
						}
						return true
					}
				}
			]
		}
	
		if (rePwdName) {
			rules[rePwdName] = {
				rules: [{
						required: true,
						errorMessage: ERROR.normal.noRePwd,
					},
					{
						validateFunction: function(rule, value, data, callback) {
							if (value != data[pwdName]) {
								callback(ERROR.normal.rePwdErr)
							}
							return true
						}
					}
				]
			}
		}
		return rules
	}
	
	
	export default {
		components:{
		agrement,
		uniCaptcha
		},
		data() {
			return {
				config,
				formData: {
					username: "",
					nickname: "",
					password: "",
					password2: "",
					captcha: ""
				},
				focusUsername: false,
				focusNickname: false,
				focusPassword: false,
				focusPassword2: false,
				agree:false,
				rules:{
					"username": {
						"rules": [{
								required: true,
								errorMessage: '请输入用户名',
							},
							{
								minLength: 3,
								maxLength: 32,
								errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									// console.log(value);
									if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
										callback('用户名不能是：手机号或邮箱')
									};
									if (/^\d+$/.test(value)) {
										callback('用户名不能为纯数字')
									};
									if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
										callback('用户名不能包含中文')
									}
									return true
								}
							}
						],
						"label": "用户名"
					},
					"nickname": {
						"rules": [{
								minLength: 3,
								maxLength: 32,
								errorMessage: '昵称长度在 {minLength} 到 {maxLength} 个字符',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									// console.log(value);
									if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
										callback('昵称不能是：手机号或邮箱')
									};
									if (/^\d+$/.test(value)) {
										callback('昵称不能为纯数字')
									};
									if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
										callback('昵称不能包含中文')
									}
									return true
								}
							}
						],
						"label": "昵称"
					},
					...getPwdRules()
				}
			}
		},
		
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.submit()
				}
			};
			// #endif
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				this.$refs.form.validate().then((res) => {
					if (this.formData.captcha.length != 4) {
						this.$refs.captcha.focusCaptchaInput = true
						return uni.showToast({
							title: '请输入验证码',
							icon: 'none',
							duration: 3000
						});
					}
					if (!this.agree) {
						return this.$refs.agreements.popup(() => {
							this.agree=true;
							this.submitForm({...res,captcha:this.formData.captcha})
						})
					}
					this.submitForm({...res,captcha:this.formData.captcha});
				}).catch((errors) => {
					console.log(errors,"error")
					let key = errors[0].key
					key = key.replace(key[0], key[0].toUpperCase())
					this['focus' + key] = true
				})
			},
			
			//注册逻辑
			submitForm(params) {
				uniIdCo.registerUser(this.formData).then(e => {
						uni.setStorageSync('token',e.newToken.token);
						uni.setStorageSync('uid',e.uid);
						uni.switchTab({
							url:"/pages/index/index"
						})
					})
					.catch(e => {
						console.log(e,"e");
						//更好的体验：登录错误，直接刷新验证码
						this.$refs.captcha.getImageCaptcha()
					})
			},
			
			handleAegrement(val){
				this.agree=val;
			},
			
			navigateBack() {
				uni.navigateBack()
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	@media screen and (max-width: 690px) {
		.uni-content {
			margin-top: 15px;
			height: 100%;
			background-color: #fff;
		}
	}

	@media screen and (min-width: 690px) {
		.uni-content {
			padding: 30px 40px 60px;
			max-height: 530px;
		}

		.link-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			margin-top: 10px;
		}

		.link {
			font-size: 12px;
		}
	}

	.uni-content ::v-deep .uni-forms-item__label {
		position: absolute;
		left: -15px;
	}

	button {
		margin-top: 15px;
	}
</style>
