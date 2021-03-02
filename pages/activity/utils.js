export default {}

export function parseType(type){
	switch(type){
		case 1:return "消费券"
		case 3:return "大礼包"
		default: return "优惠券"
	}
}