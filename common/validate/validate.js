var priceRegex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
export default {
	//空值校验
	 isEmpty:function(s){
    return ((s == undefined || s == null || s === "" || s == "undefined") ? true : false);
	},
	//价格校验，精确到小数点后2位
	isPrice:function(val){
		return priceRegex.test(val)
	}
}