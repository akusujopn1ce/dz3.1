let input = prompt("Введіть тризначне число:", "");
let num = parseInt(input);

if (!isNaN(num) && num >= 100 && num <= 999) {
    
    let d1 = Math.floor(num / 100);      
    let d2 = Math.floor((num % 100) / 10); 
    let d3 = num % 10;                     

    let allSame = (d1 === d2 && d2 === d3);

    let anySame = (d1 === d2 || d1 === d3 || d2 === d3);

    alert(
        `Ви ввели число: ${num}\n` +
        `Всі цифри однакові: ${allSame ? "Так" : "Ні"}\n` +
        `Є однакові цифри: ${anySame ? "Так" : "Ні"}`
    );

} else {
    alert("Помилка! Будь ласка, введіть саме тризначне число (від 100 до 999).");
}