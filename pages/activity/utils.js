export default {}

export function parseType(type){
	switch(type){
		case 1:return "消费券"
		case 3:return "大礼包"
		default: return "优惠券"
	}
}

export function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]);
    else
        return null;
}