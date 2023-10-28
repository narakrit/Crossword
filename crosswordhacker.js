import words from "./words_dictionary.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

const newWords = [];
const letters = "abcdefghijklmnopqrstuvwxyz";
const plainWords = Object.keys(words);
for (const word of Object.keys(words)) {
  newWords.push(hand(word));
}

function hand(word) {
  const hands = word;
  const letterCount = [];
  for (const letter of letters) {
    let count = 0;
    for (const hand of hands) {
      if (letter === hand) {
        count = count + 1;
      }
    }
    if (count > 0) {
      letterCount.push({ alphabet: letter, count: count });
    }
  }
  return letterCount;
}

// let hands = [
//   { alphabet: "a", count: 1 },
//   { alphabet: "b", count: 1 },
//   { alphabet: "c", count: 1 },
//   { alphabet: "d", count: 1 },
//   { alphabet: "e", count: 1 },
//   { alphabet: "f", count: 1 },
//   { alphabet: "g", count: 1 },
//   { alphabet: "h", count: 1 }
// ];
let input = prompt()
const hands = hand(input)

const finals = [];
for (let i = 0; i < newWords.length; i++) {
  let count = 0;
  for (let j = 0; j < newWords[i].length; j++) {
    for (const hand of hands) {
      if (hand.alphabet === newWords[i][j].alphabet) {
        if (newWords[i][j].count <= hand.count) {
          count = count + 1;
          continue;
        } else {
          break;
        }
      }
    }
    if (count === newWords[i].length) {
      finals.push(plainWords[i]);
    }
  }
}

const findMaxs = []
for (const final of finals) {
    findMaxs.push(final.length)
}

const findMax = findMaxs.sort()[findMaxs.length-1]
for (let i = findMax ; i > 0 ; i = i - 1) {
    const allWords = []
    for (const final of finals) {
        if (final.length === i) {
            allWords.push(final)
        }
    }
    console.log("alphabetLength" + i + ":" , allWords) //note: เขียนวิธีอื่นได้ไหม?
}