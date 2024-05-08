import { AmazingCard } from './card.js';
(function () {
  const appContainer = document.querySelector('.game__cards');
  let cardsNumberArray = [];
  let cards = [];
  let cardChoose = null;
  let cardsCount = 0;
  const inputCount = document.getElementById('count');
  const inputTime = document.getElementById('timer');
  let time = 0;
  let started = false;
  let score = 0;
  let countPairs = 0;
  let interval;


  function createNumbersArray(count) {
    let countCards = count;
    if (count < 2 || count > 10 || count % 2 !== 0) {
      countCards = 4;
      inputCount.value = 4;
      countPairs = 4;
    }
    cardsNumberArray = [];
    for (let i = 1; i < countCards + 1; i++) {
      cardsNumberArray.push(i, i);
    }
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function removeCards() {
    cards = [];
    const cardsElements = document.querySelectorAll('.game__card');
    clearInterval(interval);
    cardsElements.forEach((card) => {
      card.remove();
    });
  }

  function createCards() {
    for (const cardNumber of cardsNumberArray) {
      const card = new AmazingCard(appContainer, cardNumber, function(card) {
        if (cardsCount < 2 && !card.success) {
          cardsCount += 1;
          if (!cardChoose) {
            cardChoose = card;
            card.open = true;
          } else if (!card.open && !card.success) {
            card.open = true;
            const tempCardChoose = cardChoose;
            if (cardChoose.cardNumber === card.cardNumber) {
              setTimeout(() => {
                tempCardChoose.success = true;
                card.success = true;
                cardsCount = 0;
                score += 1;
                const scoreText = document.querySelector('.game__result-score');
                scoreText.innerText = score;
                if (score == countPairs) {
                  document.querySelector(".game__result").innerText = "Ты победил";
                  clearInterval(interval);
                }
              }, 500);
            } else {
              setTimeout(() => {
                tempCardChoose.open = false;
                card.open = false;
                cardsCount = 0;
              }, 1000);
            }
            cardChoose = null;
          }
        }
      });
      cards.push(card);
      console.log(card)
    }
    started = true;
  }

  function loseGame() {
    cards.forEach((card) => {
      card.open = 1;
    });
  }

  function startTimer() {
    time--;
    const timer = document.querySelector('.game__result-seconds');
    timer.innerText = time;
    if (time === 0) {
      document.querySelector('.game__result').innerText = 'Ты проиграл';
      loseGame();
      clearInterval(interval);
    }
  }

  function startGame(count) {
    createNumbersArray(count);
    shuffle(cardsNumberArray);
    if (started) removeCards();
    createCards();
    interval = setInterval(startTimer, 1000);
  }

  function createGame() {
    score = 0;
    time = parseInt(inputTime.value, 10);
    if (time < 30 || time > 180) {
      time = 60;
      inputTime.value = 60;
    }
    document.querySelector('.game__result').innerHTML = `Счет: <span class='game__result-score'>${score}</span>
     Время: <span class='game__result-seconds'>${time}</span>`;
    const count = parseInt(inputCount.value, 10);
    timer.innerText = time;
    countPairs = count;
    startGame(count);
  }

  window.createGame = createGame;
})();
