const prompt = require("prompt-sync")({ sigint: true });

const randomNum = (a) => {
  return Math.floor(Math.random() * a);
};

let numOfBoxes = parseInt(prompt("Enter number of boxes: "));

let numMorty1 = randomNum(numOfBoxes);

console.log("Morty Chose his first number.");

let numRick1 = parseInt(prompt("Enter Rick's first number: "));

const gunHiddeninBox = (numMorty1 + numRick1) % numOfBoxes;

console.log("The gun is hidden in a box.");

let rickChoice = parseInt(prompt("Enter Rick's choice: "));

let numMorty2 = randomNum(numOfBoxes);

console.log("Morty Chose his second number.");

let numRick2 = parseInt(prompt("Enter Rick's second number: "));

let secondBox = (numMorty2 + numRick2) % (numOfBoxes - 1);

console.log("So the boxes to save are " + rickChoice + " and " + secondBox);

let choice = parseInt(
  prompt("Do you want to change your choice? (1 for Yes / 0 for No): ")
);

if (choice === 1) {
  rickChoice = parseInt(prompt("Enter Rick's new choice: "));
}

console.log("Morty's First Number: " + numMorty1);
console.log(
  "1st Fair Number " +
    "(" +
    numMorty1 +
    " + " +
    numRick1 +
    ") % " +
    numOfBoxes +
    " = " +
    gunHiddeninBox
);

console.log("Morty's Second Number: " + numMorty2);
console.log(
  "2nd Fair Number " +
    "(" +
    numMorty2 +
    " + " +
    numRick2 +
    ") % (" +
    numOfBoxes +
    " - 1) = " +
    secondBox
);

if (secondBox != gunHiddeninBox && rickChoice != gunHiddeninBox) {
  secondBox = gunHiddeninBox;
}

console.log("Rick's Final Choice: " + rickChoice);

console.log("Boxes that are saved: " + rickChoice + " and " + secondBox);

console.log("Gun was in box: " + gunHiddeninBox);

if (rickChoice === gunHiddeninBox) {
  console.log("Rick is safe!");
} else {
  console.log("Rick is dead!");
}
