/* eslint-disable */
const arrryClone = arr=>arr.reduce((pre, item)=>(pre.push(deepClone(item)),pre),[]);
const ObjectClone = obj=>Object.keys(obj).reduce((pre, item)=>(pre[item] = deepClone(obj[item]), pre),{});
export function deepClone(val){
  const continueFuc = {
    "[object Object]": ObjectClone,
    "[object Array]": arrryClone
  }[Object.prototype.toString.call(val)];
  return continueFuc ? continueFuc(val) : val;
}

export function getCurrentViewBBox(map, ol, noTransform = true){
  var bboxview = map.getView().calculateExtent(map.getSize());
  return noTransform ? ol.proj.transformExtent(bboxview, "EPSG:3857", 'EPSG:4326') : bboxview;
}


export function formatDate(date,fmt){
	if(/(Y+)/.test(fmt))
	fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'')).substr(4-RegExp.$1.length);
	let o ={
		"M+":date.getMonth()+1,
		"D+":date.getDate(),
		"h+":date.getHours(),
		"m+":date.getMinutes(),
		"s+":date.getSeconds()
	}
	for(let key in o){
		let match = fmt.match(new RegExp(`${key}`));
		if(match){
			let matchStr = match[0]
			let str = o[key]+'';
			fmt = fmt.replace(matchStr,matchStr.length==1?str:padLeftZero(str));
		}
	}

	return fmt; 
}

function padLeftZero(str){
	return ("00"+str).substr(str.length);
}