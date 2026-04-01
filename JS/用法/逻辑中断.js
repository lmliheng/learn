console.log(11 && 22); // 22
console.log(11 || 22); // 11
function fun(x,y){
    // 逻辑中断
    // 如果x为false，中断执行左边代码，x为0
    x=x || 0;
    y=y || 0;
    console.log(x+y);
}
fun(10,20); // 30
fun(10); // 10
fun(); // 0
