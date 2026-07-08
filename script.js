let userName = prompt("Введіть ваше ім'я:", "");

if (userName !== null && userName !== "") {
    alert(`Hello, ${userName}! How are you?`);
} else {
    alert("Ви не ввели ім'я!");
}