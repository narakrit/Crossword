import words from './words_dictionary.js'
import PromptSync from 'prompt-sync'
const prompt = PromptSync()

const newWords = []
const letters = 'abcdefghijklmnopqrstuvwxyz'

for (const word of Object.keys(words)) {
    newWords.push({word: word, wordLength: word.length})
}


function hand(word) {
    const hands = word
    const letterCount = []
    for (const letter of letters) {
        let count = 0
        for (const hand of hands) {
            if (letter === hand) {
                count = count + 1
            }
        }
        if (count > 0) {
            letterCount.push({letter: letter, count: count})
        }
    }
    return letterCount
}





let hands = prompt()
console.log(hand(hands))

console