const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
//const mainElement = document.getElementsByClassName('content')
const wpmMsgElement = document.getElementById('wpm-msg')
const catElement = document.getElementById('cat')
const catImgElement = document.getElementById('cat-img')
const scoreElement = document.getElementById('score')

let gamePlay = false
let light = false
let wordCount = 0
let characterCount = 0

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  
  characterCount++
  
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null){
      if(light) {
        characterSpan.classList.remove('correct-light')
        characterSpan.classList.remove('incorrect-light')
      }
      else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
      }   
      correct = false
      catElement.classList.add('play-animation')
    }
    else if (character === characterSpan.innerText){
       if(light) {
        characterSpan.classList.add('correct-light')
        characterSpan.classList.remove('incorrect-light')
      }
      else {
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
      } 
    }
    else {
       if(light) {
        characterSpan.classList.remove('correct-light')
        characterSpan.classList.add('incorrect-light')
      }
      else {
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
      }
      correct = false
      catElement.classList.add('play-animation')
    }
  })
  
  if (correct){
    renderNewQuote()
    catElement.classList.remove('play-animation')
  } 
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character 
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  quoteInputElement.autofocus = true
  if(timerElement.innerText === null || timerElement.innerText == 0) startTimer()

}


var time
let startTime
function startTimer() {
  timerElement.innerText = 0
  time = 60
  startTime = new Date()
  var setInt = setInterval(() => {
    timerElement.innerText = getTimerTime()
    if(timerElement.innerText > time) {
      gamePlay = false
      catImgElement.style.display = "none"
      wpmMsgElement.style.display = "flex"
      timerElement.innerText = 0
      clearInterval(setInt)
      wordCount = characterCount / 5
      console.log(wordCount + ' ' + characterCount)
      scoreElement.innerText = wordCount
      wordCount = 0
      characterCount = 0
    }
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

function gamePlayTrue() {
  wpmMsgElement.style.display = "none"
  gamePlay = true
  catImgElement.style.display = "flex"
  catImgElement.classList.remove('play-animation')
  console.log('pressed')
  renderNewQuote()
  quoteInputElement.autofocus = true
}

function infoShow() {
  if(document.getElementsByClassName('extra-info')[0].style.display == 'none') {
      document.getElementsByClassName('extra-info')[0].style.display = 'block'
    }
  else {
    document.getElementsByClassName('extra-info')[0].style.display = 'none'
  }
  
}

if (gamePlay) {
  renderNewQuote()
} 

function lightFunction() {
   var elementBody = document.body;
   var creditElement = document.getElementById("credit")
   var imgElement = document.getElementById("extraInfo")
   
   elementBody.classList.toggle("light-mode")
   if(quoteInputElement.classList.contains("quote-input")) {
     quoteInputElement.classList.remove("quote-input")
     quoteInputElement.classList.add("quote-input-light")
   }
  else {
     quoteInputElement.classList.add("quote-input")
     quoteInputElement.classList.remove("quote-input-light")
  }
  
  if(light) light = false
  else light = true
  
  if(creditElement.classList.contains("credit")) {
     creditElement.classList.remove("credit")
     creditElement.classList.add("credit-light")
   }
  else {
     creditElement.classList.add("credit")
     creditElement.classList.remove("credit-light")
  }
  
  if(imgElement.src == "https://cdn.glitch.com/a5a91339-abc1-4f24-8b54-7c9e48af1088%2Finfo-round-button.png?v=1625710440885") imgElement.src = "https://cdn.glitch.com/a5a91339-abc1-4f24-8b54-7c9e48af1088%2Finfo-round-button%20(1).png?v=1625718756864"
  else imgElement.src = "https://cdn.glitch.com/a5a91339-abc1-4f24-8b54-7c9e48af1088%2Finfo-round-button.png?v=1625710440885"
}