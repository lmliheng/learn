// 数组过滤0
function array_out0(array){
    let newArray=[];
    for(let i=0;i<array.length;i++){
        if(array[i]!=0){
            newArray.push(array[i]);
        }
    }
    return newArray;
}

export default array_out0;