import { defineStore } from 'pinia'

export const userStore= defineStore("user",{
	state(){
		return {
			userInfo:{
				username:"",
				age:"",
				address:"",
				sex:""
			}
		}
	},
	getters: {
		getUserInfo(){
			return this.state.userInfo
		}
	},
	action:{
		setUserInfo(user){
		   this.state.userInfo=user;
		}
	}
})