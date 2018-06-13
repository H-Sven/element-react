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