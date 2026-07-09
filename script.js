const currentYear = new Date().getFullYear();

let birthYear = prompt("Введіть рік вашого народження:", "");
let city = prompt("В якому місті ви живете?", "");
let sport = prompt("Ваш улюблений вид спорту?", "");

let message = "";

if (birthYear === null || birthYear.trim() === "") {
    message += "Шкода, що Ви не захотіли ввести свою дату народження.\n";
} else {
    let age = currentYear - parseInt(birthYear);
    message += `Ваш вік: ${age}.\n`;
}

if (city === null || city.trim() === "") {
    message += "Шкода, що Ви не захотіли ввести своє місто.\n";
} else {
    let lowerCity = city.toLowerCase().trim();
    
    if (lowerCity === "київ") {
        message += "Ти живеш у столиці України.\n";
    } else if (lowerCity === "вашингтон") {
        message += "Ти живеш у столиці США.\n";
    } else if (lowerCity === "лондон") {
        message += "Ти живеш у столиці Великої Британії.\n";
    } else {
        message += `Ти живеш у місті ${city}.\n`;
    }
}

if (sport === null || sport.trim() === "") {
    message += "Шкода, що Ви не захотіли ввести свій вид спорту.\n";
} else {
    let lowerSport = sport.toLowerCase().trim();
    
    if (lowerSport === "футбол") {
        message += "Круто! Хочеш стати Ліонелем Мессі?\n";
    } else if (lowerSport === "бокс") {
        message += "Круто! Хочеш стати Олександром Усиком?\n";
    } else if (lowerSport === "баскетбол") {
        message += "Круто! Хочеш стати Майклом Джорданом?\n";
    }
}

alert(message);