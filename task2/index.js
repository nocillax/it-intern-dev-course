// The result is the 64-character hex hash it produces. Ans would vary based on email.

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const folderPath = "./task2/task2_data";

const files = fs
  .readdirSync(folderPath)
  .filter((f) => fs.statSync(path.join(folderPath, f)).isFile());

files.sort();

console.log("File: " + files.length);

let arr = [];
let email = "asifjarif@gmail.com";

for (let i = 0; i < files.length; i++) {
  const buffer = fs.readFileSync(path.join(folderPath, files[i]));

  const hash = crypto.createHash("sha3-256").update(buffer).digest("hex");

  let score = 1n;
  for (let j = 0; j < hash.length; j++) {
    score *= BigInt(parseInt(hash[j], 16)) + 1n;
  }
  arr.push({ hash: hash, score: score });
}

arr.sort((a, b) => {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
});

let allFileHash = "";

for (let i = 0; i < arr.length; i++) {
  allFileHash += arr[i].hash;
}

allFileHash += email.toLowerCase();

const finalHash = crypto
  .createHash("sha3-256")
  .update(allFileHash)
  .digest("hex");

console.log(finalHash);
