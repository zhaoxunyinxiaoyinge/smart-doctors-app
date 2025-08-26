'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	 console.log("这是云函数")
	//返回数据给客户端
	return event
};
