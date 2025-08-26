<template>
	<view :class="['list',list.title?'title-style':'']" ref='siginfo'>
		<view class="title" v-if="list.title">
			<text>{{list.title}}</text>
		</view>
		<view class="list-content">
			<uni-forms :modelValue="modeData" :border="true" ref="form" >
				<view :class="['list-content-item',item.autoFormield?'list-content-item-auto':''] "
					v-for="item in list.formield" @click="handleField(item)">
					<!-- #ifdef MP-WEIXIN -->
					<uni-forms-item class='form-item' :label='item.label' :required="item.required" :name='item.value'
						:rules="item.rules?item.rules:[]" :label-width="item.label?87:0">
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<uni-forms-item class='form-item' :name='item.value' :required="item.required"
							:rules="item.rules?item.rules:[]" :label='item.label' >
							<!-- #endif -->
							<view class="tag" v-if="item.autoFormield">
								<Tag v-for="sItem in item.tag" :tag='sItem'></Tag>
							</view>

							<view class="list-content-input" v-else>
								<image class="imgs" :src="modeData[item.value]" v-if="item.avatar"></image>
								<view class="checkbox-list" :disabled="item.disabled" v-else-if='item.checkbox'>
									<uni-data-checkbox :multiple='item.checkbox==="checkbox"'
										v-model="modeData[item.value]" :localdata="item.range"
										@change="change"></uni-data-checkbox>
								</view>
								<!-- 这里是性别下拉框 -->
								<view class="form-item" v-else-if='item.sexSelect'>
									<picker   @change="(value)=>bindPickerChange(item.value,value)" 
										:range="item.sexList" class="picker">
										<view class="form-content-arrow">
											<uni-easyinput  :clearable='false' :inputBorder="false"
												class="input" v-model="sexList[modeData[item.value]]" placeholder="请选择性别" />
											<uni-icons type="right" size="15"></uni-icons>
										</view>
									</picker>
								</view>
								<!--  -->

								<!-- 日期组件 -->
								<view class="form-item" v-else-if="item.dateSelect">
									<picker mode="date"  :value="date" class="picker" :start="startDate" :end="endDate"
										@change="(value)=>bindPickerChange(item.value,value)">
										<view class="form-content-arrow">
											<uni-easyinput  :clearable='false' :inputBorder="false"
												class="input" v-model="modeData[item.value]" placeholder="请选择日期" />
											<uni-icons type="right" size="15"></uni-icons>
										</view>
									</picker>
								</view>

								<!-- 动态关联组件 -->
								<view class="form-item" v-else-if="item.conact"
									@click="()=>jumpToFamily(item.path,item.value)">
									<view class="picker">
										<view class="input-text">
											<text style="font-size: 24rpx;">{{modeData[item.value]}}</text>
											<uni-icons type="right" size="15"></uni-icons>
										</view>
									</view>
								</view>
								
								<!--按钮标签提示 -->
								<view class="tag" v-else-if="item.tags">
										<uni-fav :star='false' class="uni-fav" :key="index"
											v-for="(tag,index) in item.contents" :checked="item.checkList[index]"
											:content-text="tag" @click="()=>favClick(index,item,item.value)" />
								</view>

								<!-- 封装是否签约逻辑 -->
								<view class="form-item right-sign" v-else-if='item.sign'>
									<switch  style="transform:scale(0.8)" :checked="false"
										@change="(val)=>rightSign(val,item.value)" />
								</view>

								<uni-easyinput v-else :styles="{color:'#000',disableColor:'#fff'}"
									v-model="modeData[item.value]" :inputBorder="false" :clearable='false'
									:disabled="item.disabled"
									:placeholder="item.placeholder?item.placeholder:'请填写内容'"></uni-easyinput>
							</view>
						</uni-forms-item>
						<view class="list-content-right" v-if="item.arrow">
							<uni-icons type="right" size="14"></uni-icons>
						</view>
						<view class="list-content-right" v-if="item.unit">
							<txt>{{item.unit}}</txt>
						</view>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<!-- 内部组件的表单验证处理，是否需要表单验证 -->
<!-- 新增常用组件的支持，例如，时间，日期表单，等下拉框表单的支持 -->
<!-- 验证详情和编辑，新增功能是否耦合 -->

<script>
	export default {
		options: {
			styleIsolation: "shared"
		}
	}
</script>

<script setup>
	import {
		onMounted,
		ref,
		onBeforeMount,
		computed
	} from "vue";
	import Tag from "./../../components/ButtonTag/ButtonTag.vue";

	const formoption = defineProps({
		list: {
			type: Object,
			default: {}
		},
		edit: {
			type: Boolean,
			default: false
		},
		formData:{
			type:Object,
			default:{
			}
		}
		
	});
	const emit = defineEmits(["choose", "field"]);

	const modeData = ref({});
	const form = ref();
	const siginfo = ref("siginfo");
	const sexList=ref(["男","女"]);
	
	//在组件挂载之前设置生成的表单字段，设置值
	onBeforeMount(() => {
		setModelKeyField(modeData, formoption.list.formield);
		setFormData(formoption.formData);
	})
	
	// 初始化表单mode和设置表单的初始化值
	const setModelKeyField = (target, source) => {
		source.forEach(item => {
			if (!(item.value in target.value)) {
				target.value[item.value] = target.value[item.defaultValue]?target.value[item.defaultValue]:null;
				
			}
		})
	}

	//用于向父组件派发数据
	const handleField = (item) => {
		emit("field", item)
	};

	//表单跳转页面逻辑
	const jumpToFamily = (path, field) => {
		//自定会议字符中，id-name;
		if(!Array.isArray(modeData.value[field])){
			modeData.value[field]=[];
		}
		const ids = modeData.value[field].map(item => item.split("-")[0]);
		console.log(path)
		uni.navigateTo({
			url: path + '?ids=' + ids,
			events: {
				acceptDataFromOpenedPage: function(data) {
					modeData.value[field]=mapToKeyValue(data.data);
				}
			}
		})
	}
	
	const mapToKeyValue=(map)=>{
		 let arr=[];
			for(let [key,value] of map){
				arr.push(key+"-"+value);
			}
		return arr.join(",")
	}

	// picker选择下拉框值被选中触发的事件
	const bindDateChange = (key, value) => {
		modeData.value[key] = value;
	}
	
	const bindPickerChange=(val,value)=>{
		modeData.value[val] = value.detail.value;
	}

	//设置结束时间
	const endDate = computed(() => {
		return getDate("end")
	});

	//设置开始时间
	const startDate = computed(() => {
		return getDate("start")
	})

	// 获取时间
	const getDate = (type) => {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}

	//标签选择中逻辑
	const favClick = (num, item, feild) => {
		item.checkList[num] = !item.checkList[num];
		//这里选择的是标签id
		const contentId = item.contents[num].id;
		console.log(item,num,feild)
		if (!Array.isArray(modeData.value[feild])) {
			modeData.value[feild] = [];
			modeData.value[feild].push(contentId);
		} else {
			console.log()
			modeData.value[feild].includes(contentId) ? "" : modeData.value[feild].push(contentId);
		}
	}

	//判断是否签约的逻辑
	const rightSign = (val, field) => {
		modeData.value[field] = val;
	}

	//触发表单验证逻辑
	const valiteForoms = (path) => {
		form.value.validate().then(res => {
			//跳转到指定的页面
			uni.navigateTo({
				url:path
			})
			
		}).catch(err => {
			console.log(err)
		})
	}
	
	
	//属性传值设置表单的值
	const setFormData=(formData)=>{
		for(let feild in formData){
			if(feild in modeData.value){
				modeData.value[feild]=formData[feild];	
			}
		}
	}
	
	//重置表单的初始化值
	 

	//组件导出方法
	defineExpose({
		siginfo,
		valiteForoms,
		setFormData
	})
</script>

<style scoped>
	.list {
		background-color: #fff;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		font-weight: normal;
		padding: 20rpx;
	}

	.title-style {}

	.title {
		font-size: 32rpx;
		font-weight: 700;
		color: rgba(28, 32, 35, 1);
	}

	.list-content-item {
		width: 702rpx;
		margin: 0 auto;

		/* border-bottom: 1rpx solid #eee; */
		display: flex;
		align-items: center;
	}


	.list-content-label {
		width: 114rpx;
		font-size: 24rpx;
		margin-right: 78rpx;
	}

	.imgs {
		width: 50rpx;
		height: 50rpx;
	}

	.list-content-input {
		flex: 1;
		display: flex;
		font-size: 26rpx;
		align-items: center;
	}

	.list-content-item-auto {
		display: flex;
		justify-content: flex-start;

	}

	.tag {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
	}
	
	.uni-fav {
		margin:10rpx 15rpx 10rpx 0;
	}
	
	.tag-item {
		margin-right: 40rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(197, 200, 203, 1);
		border-radius: 20rpx;
		padding: 14rpx 35rpx 12rpx 33rpx;
		background-color: rgba(245, 247, 251, 1);
		margin-top: 20rpx;
	}
	
	.active {
		background-color: rgba(234, 254, 250, 1);
		border: 1px solid rgba(73, 185, 173, 1);
		color: rgba(73, 185, 173, 1);
	}

	.picker {
		width: 100%;
		/* padding-left: 20rpx; */
		/* display: flex; */
		/* align-items: center; */
		/* display: flex; */
	}

	.picker ::v-deep .uni-easyinput__placeholder-class {
		color: rgb(51, 51, 51);
		padding-left: 0rpx;
	}

	::v-deep .uni-easyinput__content-input {
		padding-left: 0 !important;
	}
	
	.input-text {
		display: flex;
		justify-content: space-between;
		width: inherit;
		align-items: center;
	}
	
	.right-sign {
		display: flex;
		justify-content: flex-end;
	}

	.form-content-arrow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<style scoped>
	.form-item {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 0;
	}

	.form-item ::v-deep .uni-forms-item__label {
		font-size: 24rpx;
		width: 130rpx !important;
		padding: 0;
		margin-right: 58rpx;
	}

	.list-content-item-auto .form-item ::v-deep .uni-forms-item__label {
		width: 0 !important;
		padding: 0;
		margin-right: 0;
	}

	.list-content-item ::v-deep .uni-forms-item {
		margin-bottom: 0;
		width: inherit;
	}
</style>