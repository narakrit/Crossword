import w from './words_dictionary.js'
import p from 'prompt-sync'

const prompt = p()
// format จาก ['abc', 'abb'] ไปเป็น
// [
//  [{ alphabet: a, count: 1 }, { alphabet: b, count: 1 }, { alphabet: c, count: 1 }],
//  [{ alphabet: a, count: 1 }, { alphabet: b: count2 }]
// ]
function formatWords(words) {
  const formattedWords = []
  for (let i = 0; i < words.length; i++) {
    const alphabetsWithCount = []
    for (let j = 0; j < words[i].length; j++) {
      const wordIndex = alphabetsWithCount.findIndex(
        (word) => word.alphabet == words[i][j]
      )
      if (wordIndex > -1) {
        alphabetsWithCount[wordIndex].count += 1
      } else {
        alphabetsWithCount.push({ alphabet: words[i][j], count: 1 })
      }
    }
    formattedWords.push(alphabetsWithCount)
  }
  return formattedWords
}
// format จาก ['a', 'b', 'c'] ไปเป็น
// [{ alphabet: a, count: 1 }, { alphabet: b, count: 1 }, { alphabet: c, count: 1 }],
function formatHand(hand) {
  const handWithCount = []
  for (let i = 0; i < hand.length; i++) {
    const handIndex = handWithCount.findIndex((h) => h.alphabet === hand[i])

    if (handIndex > -1) {
      handWithCount[handIndex].count += 1
    } else {
      handWithCount.push({ alphabet: hand[i], count: 1 })
    }
  }
  return handWithCount
}
// รับ Input
const input = prompt('Enter your alphabets here: ')
// ห้าม Input เกิน 8 ตัวอักษร
if (input.length > 8) {
  throw new Error('Input must not greater than 8 characters.')
}
const plainWords = Object.keys(w)
const words = formatWords(plainWords)
const hand = formatHand(input.split(''))

for (let wordLen = input.length; wordLen > 0; wordLen--) {
  const matchedWords = []
  // ไล่เช็คทีละคำ ถ้า matched ก็ใส่เข้าไปใน matchedWords ในแต่ละรอบของความยาวคำ
  for (let i = 0; i < words.length; i++) {
    let matched = true
    const wordString = plainWords[i]
    const word = words[i]
    for (const alphabetWordObj of word) {
      // เช็คว่ามีตัวอักษรที่ต้องการอยู่ในคำหรือไม่, ตัวอักษรนั้นต้องมีขนาดสั้นกว่าหรือเท่ากับมือของเรา, คำนั้นต้องมีความยาวเท่ากับ wordLen ถึงจะเก็บใส่ matchedWords
      if (
        hand.find(
          (alphabetHandObj) =>
            alphabetHandObj.alphabet === alphabetWordObj.alphabet &&
            alphabetWordObj.count <= alphabetHandObj.count &&
            wordString.length === wordLen
        )
      ) {
        continue
      } else {
        matched = false
        break
      }
    }

    if (matched) {
      matchedWords.push(wordString)
    }
  }
  // แสดงคำทั้งหมดที่ความยาวเท่ากับ wordLen ในแต่ละรอบ เรียงจากมากสุดไปน้อยสุด
  console.log(`${wordLen}: `, matchedWords)
}
