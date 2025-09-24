const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const randomNumber = (b) => {
  return Math.floor(Math.random() * b);
};

let noOfBoxes = 0;

rl.question("Enter Number of Boxes.. ", (number) => {
  noOfBoxes = parseInt(number, 10);
  const gunInsideBox = randomNumber(noOfBoxes);

  console.log("Gun is in box number: ", gunInsideBox);

  rl.question("Enter Box Number to open: ", (answer) => {
    const boxNumber = parseInt(answer, 10);
    if (boxNumber === gunInsideBox) {
      console.log("You are correct");
    } else {
      console.log("You are wrong");
    }
    rl.close();
  });
});
