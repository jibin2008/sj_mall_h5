import message from './message.js';
// 定义 type 类型:弹出类型：top/bottom/center
const config = {
	// 顶部弹出
	top:'top',
	// 底部弹出
	bottom:'bottom',
	// 居中弹出
	center:'center',
	// 消息提示
	message:'top',
	// 对话框
	dialog:'center',
	// 分享
	share:'bottom',
	//商品上架弹出框
	shelve:'bottom',
	//商品上架信息编辑弹出框
	shelveedit:'bottom',
	//授权登录弹出框
	wxauth:'center',
	//授权手机号码
	phoneauth:'center',
	//图片素材库
	images:'bottom'
}

export default {
	data(){
		return {
			config:config
		}
	},
	mixins: [message],
}
