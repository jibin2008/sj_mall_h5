var citysIndex, searchIndex;
var broadList;
import md5 from "./api/md5.js"
(function (Comm) {
    Comm.verify = {};
	

	/** 验证是否全部中文/包含中文/全部英文 **/
    Comm.verify.isChn = function (str, model) {
        var reg;
        if (model == 'allChinese') {
            reg = /^[\u4E00-\u9FA5]+$/; //全都是汉字
        } else if (model == 'hasChinese') {
            reg = /.*[\u4e00-\u9fa5]+.*$/; //含有一个或多个汉字
        } else if (model == 'allEnglish') {
            reg = /^[A-Za-z]+$/; //全都是英文
        } else {
            alert('isChn函数缺少参数');
            return false;
        }
        if (reg.test(str)) {
            return true;
        }
        return false; //否则返回false
    }
    
	
    /** 手机号码验证 **/
    Comm.verify.isPhone = function (phone) {
        var reg = /^(13[0-9]|15[1|0|2|3|5|6|7|8|9]|14[5|7]|18[0|1|2|3|4|5|8|6|9|7]|17[0|3|8|6|7]|199|191)\d{8}$/;
        if (!reg.test(phone)) {
            return false;
        } else {
            return true;
        }
    }
    
   	Comm.tuoMin_add = function (str){
		var string=str.substring(0,str.length/2);
	    if(null != str && str != undefined){
	        	for(var i = 0; i < str.length; i++){
	        		if(i>str.length/2){
	        			string = string + "*";
	        		}
	        	}
	            return string;
	    } else {
	        return "";
	    }
	}
	
	Comm.tuoMin = function (str){
		var string="";
	    if(null != str && str != undefined){
	        if(str.length <= 8){
	        	for(var i = 2; i < str.length-3; i++){
	        		string = string + "*";
	        	}
	        	string= str.substring(0,2)+string+str.substring(str.length-3,str.length)
	            return string;
	        }else{
	        	for(var i = 3; i < str.length-4; i++){
	        		string = string + "*";
	        	}
	        	string= str.substring(0,3)+string+str.substring(str.length-4,str.length)
	            return string;
	        }
	    } else {
	        return "";
	    }
	}
    
    Comm.getInitCityInfo = function(latnId) {
    	return CityArea.getInitCityInfo(latnId);
    }
    
    /**
     * 城市区域公共封装类
     */
	Object.assign(CityArea, 
		{
        //数组顺序一一对应
        data: {
            cityCode: ["551", "553", "552", "554", "555", "561", "562", "556", "559", "550", "558", "557", "564", "560", "566", "563"],
            areaCode: ["3401", "3402", "3403", "3404", "3405", "3406", "3407", "3408", "3410", "3411", "3412", "3413", "3415", "3416", "3417", "3418"],
            cityName: ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
            areaMap: {"551":[{"id":"13","name":"安徽省","child":[{"id":"551","name":"合肥市","child":[{"id":"48124","name":"瑶海区 "},{"id":"48124","name":"庐阳区"},{"id":"48124","name":"蜀山区"},{"id":"48124","name":"包河区"},{"id":"48124","name":"滨湖区"},{"id":"48124","name":"高新区"},{"id":"48124","name":"经开区"},{"id":"48124","name":"政务区"},{"id":"48124","name":"新站区"},{"id":"48123","name":"长丰县"},{"id":"48121","name":"肥东县"},{"id":"48122","name":"肥西县"},{"id":"24329","name":"庐江县"},{"id":"24328","name":"巢湖市"}]}]}], 
						"553":[{"id":"13","name":"安徽省","child":[{"id":"553","name":"芜湖市","child":[{"id":"33822","name":"镜湖区 "},{"id":"33822","name":"弋江区"},{"id":"33822","name":"鸠江区"},{"id":"33822","name":"三山区"},{"id":"33825","name":"芜湖县"},{"id":"33824","name":"繁昌县"},{"id":"33823","name":"南陵县"},{"id":"24326","name":"无为县"}]}]}],
						"552": [{"id":"13","name":"安徽省","child":[{"id":"552","name":"蚌埠市","child":[{"id":"4602","name":"龙子湖区 "},{"id":"4602","name":"蚌山区"},{"id":"4602","name":"禹会区"},{"id":"4602","name":"淮上区"},{"id":"4605","name":"怀远县"},{"id":"4603","name":"五河县"},{"id":"4604","name":"固镇县"}]}]}],
						"554":[{"id":"13","name":"安徽省","child":[{"id":"554","name":"淮南市","child":[{"id":"6497","name":"大通区 "},{"id":"6497","name":"田家庵区"},{"id":"6497","name":"谢家集区"},{"id":"6497","name":"八公山区"},{"id":"6497","name":"潘集区"},{"id":"6498","name":"凤台县"},{"id":"23","name":"寿县"}]}]}],
						"555":[{"id":"13","name":"安徽省","child":[{"id":"555","name":"马鞍山市","child":[{"id":"17383","name":"花山区 "},{"id":"17383","name":"雨山区"},{"id":"17383","name":"博望区"},{"id":"17382","name":"当涂县"},{"id":"24327","name":"含山县"},{"id":"24325","name":"和县"}]}]}],
						"561":[{"id":"13","name":"安徽省","child":[{"id":"561","name":"淮北市","child":[{"id":"16444","name":"杜集区 "},{"id":"16444","name":"相山区"},{"id":"16444","name":"烈山区"},{"id":"16443","name":"濉溪县"}]}]}],
						"562":[{"id":"13","name":"安徽省","child":[{"id":"562","name":"铜陵市","child":[{"id":"11319","name":"铜官山区 "},{"id":"11319","name":"狮子山区"},{"id":"11319","name":"郊区"},{"id":"11320","name":"铜陵县"},{"id":"12026","name":"枞阳县"}]}]}],
						"556":[{"id":"13","name":"安徽省","child":[{"id":"556","name":"安庆市","child":[{"id":"12029","name":"迎江区 "},{"id":"12029","name":"大观区"},{"id":"12029","name":"宜秀区"},{"id":"12027","name":"怀宁县"},{"id":"12022","name":"潜山县"},{"id":"12028","name":"太湖县"},{"id":"12030","name":"宿松县"},{"id":"12025","name":"望江县"},{"id":"12023","name":"岳西县"},{"id":"12024","name":"桐城市"}]}]}],
						"559":[{"id":"13","name":"安徽省","child":[{"id":"559","name":"黄山市","child":[{"id":"45657","name":"屯溪区 "},{"id":"45659","name":"黄山区"},{"id":"45656","name":"徽州区"},{"id":"45658","name":"歙县"},{"id":"45655","name":"休宁县"},{"id":"45660","name":"黟县"},{"id":"45661","name":"祁门县"}]}]}],
						"550":[{"id":"13","name":"安徽省","child":[{"id":"550","name":"滁州市","child":[{"id":"7754","name":"琅琊区 "},{"id":"7754","name":"南谯区"},{"id":"7752","name":"来安县"},{"id":"7756","name":"全椒县"},{"id":"7750","name":"定远县"},{"id":"7755","name":"凤阳县"},{"id":"7753","name":"天长市"},{"id":"7751","name":"明光市"}]}]}],
						"558":[{"id":"13","name":"安徽省","child":[{"id":"558","name":"阜阳市","child":[{"id":"27354","name":"颍州区 "},{"id":"27354","name":"颍东区"},{"id":"27354","name":"颍泉区"},{"id":"27356","name":"临泉县"},{"id":"27351","name":"太和县"},{"id":"27353","name":"阜南县"},{"id":"27352","name":"颍上县"},{"id":"27355","name":"界首市"}]}]}],
						"557":[{"id":"13","name":"安徽省","child":[{"id":"557","name":"宿州市","child":[{"id":"20201","name":"埇桥区 "},{"id":"20200","name":"砀山县"},{"id":"20203","name":"萧县"},{"id":"20202","name":"灵璧县"},{"id":"20199","name":"泗县"}]}]}],
						"564":[{"id":"13","name":"安徽省","child":[{"id":"564","name":"六安市","child":[{"id":"22","name":"金安区 "},{"id":"22","name":"裕安区"},{"id":"20","name":"霍邱县"},{"id":"24","name":"舒城县"},{"id":"21","name":"金寨县"},{"id":"19","name":"霍山县"},{"id":"22","name":"叶集区"}]}]}],
						"560":[{"id":"13","name":"安徽省","child":[{"id":"560","name":"亳州市","child":[{"id":"40972","name":"谯城区 "},{"id":"40971","name":"涡阳县"},{"id":"40973","name":"蒙城县"},{"id":"40970","name":"利辛县"}]}]}],
						"566":[{"id":"13","name":"安徽省","child":[{"id":"566","name":"池州市","child":[{"id":"31902","name":"贵池区 "},{"id":"31903","name":"东至县"},{"id":"31900","name":"石台县"},{"id":"31901","name":"青阳县"},{"id":"31899","name":"九华景区"}]}]}],
						"563":[{"id":"13","name":"安徽省","child":[{"id":"563","name":"宣城市","child":[{"id":"43420","name":"宣州区 "},{"id":"43421","name":"郎溪县"},{"id":"43424","name":"广德县"},{"id":"43419","name":"泾县"},{"id":"43422","name":"绩溪县"},{"id":"43423","name":"旌德县"},{"id":"43418","name":"宁国市"}]}]}]}
            
        },
        
        getInitCityInfo: function(latnId) {
        	return this.data.areaMap[latnId];
        },
     
        //通过地市名称获取地市编码
        getCodeByName: function (cityName) {
            var index = $.inArray(cityName, this.data.cityName);
            if (index != -1) {
                return this.data.cityCode[index];
            }
            return "";
        },
        //通过地市编码获取地市名称
        getNameByCode: function (cityCode) {
            var index = $.inArray(cityCode, this.data.cityCode);
            if (index != -1) {
                return this.data.cityName[index];
            }
            return "";
        },
        //通过地市名称获取地市区划代码
        getAreaCodeByname: function (cityName) {
            var index = $.inArray(cityName, this.data.cityName);
            if (index != -1) {
                return this.data.areaCode[index];
            }
            return "";
        }
    });
    var sucCall;
    
    /**wap 资源看选址*/
    Comm.wapMapAddress = function (suc) {
        var d = new Date()
        var day = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        if (month < 10) {
            if (day < 10) {
                var date = year + "0" + month + "0" + day;
            } else {
                var date = year + "0" + month + "" + day;
            }
        } else {
            if (day < 10) {
                var date = year + "" + month + "0" + day;
            } else {
                var date = year + "" + month + "" + day;
            }
        }
        let md5Str = md5.hexMD5('admin|' + date + '|zyxz');
        if (!suc) {
            sucCall = function (address) {
            }
        } else {
            sucCall = suc
        }
        searchIndex = layer.open({
            type: 2,   //类型
            // shadeClose: true,
            title: false,
            //offset  : '20px',
            shade: 0.3,
            move: false,
            area: ['95%', '95%'],
            // maxmin: true, //开启最大化最小化按钮
            success: function (layero, index) {
            },	
            content: 'https://it.jisu8.cn:9999/search/mobileSearch?user=admin&from=wtapp&sign=' + md5Str
        });
    }

    Comm.setAddress = function (address) {
		layer.close(searchIndex);
        sucCall(address);
    }

    /** 判断移动端访问 **/
    Comm.mobileVisit = function (url) {
        var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
        var browser = navigator.userAgent.toLowerCase();
        var isMobile = false;
        for (var i = 0; i < mobileAgent.length; i++) {
            if (browser.indexOf(mobileAgent[i]) != -1) {
                isMobile = true;
                location.href = url;
                break;
            }
        }
    }
    
   
    

})(window.Comm = window.Comm || {}, window.CityArea = window.CityArea || {});

