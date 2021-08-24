a = [1, 2, 3, 4]

console.log(a.map(b => (b*2)));
console.log(a); //เอาแต่ค่า a

let sum = a.reduce((sum,num) =>{
    return sum + num;
},50);
console.log(sum);

var names = ['Atikan', 'Backend', 'Bobby'];
console.log(names.filter(n =>(n.includes('n')))); //เอาที่มีตัว อัการที่ต้องการ

var personnel = [
    {name: 'Alex', age: 21, role: ['editor']},
    {name: 'Gabriel', age: 20, role: ['editor', 'admin']},
    {name: 'Jenny', age: 22, role: ['editor']},
    {name: 'Sienna', age: 21, role: ['editor', 'admin']},
    {name: 'Stephan', age: 20, role: ['moderator']},
    {name: 'William', age: 23, role: ['admin']},
    {name: 'Brianne', age: 18, role: ['moderator', 'editor']},
    ];

    console.table(personnel.filter(p =>(p.role.includes ('admin'))));
    console.table(personnel.sort((a,b) => b.age - a.age)); //เรียงข้อมูลจากมากไปน้อย
 
    var price = [10, 30, 50, 20];  // 1US = 34฿
    console.log(price.map(n => n*34));

    var total_price = price.reduce((sum, num) => { // หาราคารวม
        return sum + (num *34 )
    });
    console.log(total_price);

    
    
