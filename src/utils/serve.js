class Http{
	constructor(){
	}
	request(options){
		return new Promise((resolve,reject)=>{
			uni.request({
			url:options.url,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		 })	
		})
	}
}

const fetch=new Http();
export {
	fetch
}