function promptNumber() {
  let userInput;

  for (let i = 0; i < 10; i++) {
    userInput = prompt("Введіть число більше 100:", "");

    if (userInput === null) {
      break;
    }
    if (isNaN(userInput) || Number(userInput) > 100) {
      break; 
    }
  }
  console.log(userInput);
}
promptNumber();