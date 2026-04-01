// 数组倒序
function array_reverse(array){
    let newArray=[];
    for(let i=0;i<array.length;i++){
        newArray.unshift(array[i]);
    }
    return newArray;
}
export default array_reverse;
