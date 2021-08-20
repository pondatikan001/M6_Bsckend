console.log('Hello CAMT');
console.count('Hello CAMT'); //การนับว่าใส่เข้าไปกี่ครั้ง
console.count('A');
console.count('B');
console.table([{name:'nodejs', value:33},{name:'javascrit', value:33}])

console.time('program');
console.warn('Greeting!');
console.log('Hello ' + process.env.name); //ใช้คำสั่ง $env:='name' แล้วRun node test.js

console.timeEnd('program');
console.assert(4 ==6, 'it\'s false!');
var str = 'Good morning CAMT';

console.log(str.substr(5,6));
console.log(str.slice(4,6)); //เอาตำแหน่งที่ 5 - 6

var lst = [3, 4, 7, 5, 1, 2]; //หลายอย่างเชื่อมกัน
console.log(lst.join(', '));

var spl = str.split(' ');
console.table(spl);

console.log(lst.sort()); // เรียงค่าจากมากไปน้อย


