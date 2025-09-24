const randomNumber = (a, b) => {
  return Math.floor(Math.random() * b) + a;
};

const randomNum = randomNumber(1, 5);
let userNumber = 0;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("", (answer) => {
  userNumber = parseInt(answer, 10);

  if (userNumber === randomNum) {
    console.log("Congratulations! You guessed the number.");
  } else {
    console.log(`Sorry, the correct number was ${randomNum}.`);
  }
  rl.close();
});
