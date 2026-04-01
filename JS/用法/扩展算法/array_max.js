// 数组最大值
function array_max(array){
    let max=array[0];
    for(let i=0;i<array.length;i++){
        max<array[i]?max=array[i]:max;
    }
    return max;
}
export default array_max;
