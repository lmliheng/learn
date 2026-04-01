// 测试 node test.js

import array_min from './array_min.js';
import array_out0 from './array_out0.js';
import array_max from './array_max.js';
import bubble_sort from './array_bubble_sort.js';
import array_reverse from './array_reverse.js';

let array=[101,22,322,433,52,62,73,18,91,10];
console.log(array);
console.log('====================');
console.log(bubble_sort(array));
console.log('====================');
console.log(array);//为什么array变化了，
console.log('====================');
console.log(array_min(array));
console.log('====================');
console.log(array_out0(array));
console.log('====================');
console.log(array_max(array));
console.log('====================');
console.log(array_reverse(array));
console.log('====================');