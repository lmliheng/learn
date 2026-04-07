function makeAdder(x) {
    return function (y) {
        return x + y; // 访问外部函数的变量 x
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);


console.log(add5(2)); // 7
console.log(add10(2)); // 12


function makeCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}
const counter = makeCounter();
counter();
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4
