export default {}

export function parseType(type){
	switch(type){
		case 0:return ""
		case 1:return "消费券"
		case 2:return "权益金"
		case 3:return "大礼包"
		case 4:return "购机优惠券"
		case 5:return "流量包"
		case 6:return "代金券"
		case 11:return "消费券"
		default: return "优惠券"
	}
}

export function getCookie(Name)
{
   var search = Name + "="//查询检索的值
   var returnvalue = "";//返回值
   if (document.cookie.length > 0) {
     let sd = document.cookie.indexOf(search);
     if (sd!= -1) {
        sd += search.length;
        let end = document.cookie.indexOf(";", sd);
        if (end == -1)
         end = document.cookie.length;
         //unescape() 函数可对通过 escape() 编码的字符串进行解码。
        returnvalue=unescape(document.cookie.substring(sd, end))
      }
   } 
   return returnvalue;
}