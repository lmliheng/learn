// 数组最小值
function array_min(array) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
        min > array[i] ? min = array[i] : min;
    }
    return min;
}
export default array_min;