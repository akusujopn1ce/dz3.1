function removeChars(str, charsToRemove) {
  return str
    .split('')
    .filter(char => !charsToRemove.includes(char))
    .join('');
}

const userString = prompt("Введіть вихідний рядок:", " hello world");
const userCharsInput = prompt("Введіть символи для видалення (через кому або пробіл):", "l, d");

if (userString !== null && userCharsInput !== null) {
  const charsArray = userCharsInput.replace(/[, ]+/g, '').split('');
  
  const result = removeChars(userString, charsArray);
  
  console.log("Оригінальний рядок:", userString);
  console.log("Символи для видалення:", charsArray);
  console.log("Результат:", result);
  alert(`Результат: ${result}`);
}