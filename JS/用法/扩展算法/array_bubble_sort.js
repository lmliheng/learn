// 冒泡排序
function bubble_sort(array) {
    let newArray = [];
    newArray = array;

    for (let i = 0; i < newArray.length; i++) {
        let flag = false;//设置标志位
        for (let j = 0; j < newArray.length - i - 1; j++) {
            if (newArray[j] > newArray[j + 1]) {
                let temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
                flag = true;//设置标志位
            }
        }
        if (!flag) {
            break;//如果标志位为false，说明没有交换，已经有序
        }
    }
    return newArray;
}

export default bubble_sort;

// 优化:1.设置标志位，如果内循环没有交换，说明已经有序，直接跳出循环
//     2. 内循环的次数可以减少，因为每次交换后，最大的数就会放到最后面，所以内循环的次数可以减少
