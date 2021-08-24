
let task_a = async() => {
    console.log('task A');
}

let task_b = async() => {
    console.log('task B');
}

let task_c = async() => {
    console.log('task C');
}

let main = async() => {
    await task_a();
    await task_b();
    await task_c();
}
 
//main();
/*
task_a().then((value) => {
    task_b().then(() =>{
        task_c();
    });
});
*/

// transaction
/*
โอนเงิน

1.ถอนเงิน a 2. ฝากเงินเข้า b 3. โอนเงินเรียบร้อย
*/

let withdraw = async (a) =>{
    console.log(`withdraw form ${a}`);
}

let deposit = async(a) =>{
    console.log(`deposit to ${a}`);
}

let transfer = async(a, b) =>{
    await withdraw(a);
    await deposit(b);
    console.log('tranfer completed!');
}
transfer('mr.A', 'mr.B');

let money = 400;

check = (amount) =>{
    return new Promise((resolve, reject) =>{
        if(money >= amount){
            resolve(money);
        } else {
            reject('not enough money');
        }
    });
}

check(500).then((value) =>{
    console.log(value);
}).catch(err =>{
    console.log(err.toString());
});
