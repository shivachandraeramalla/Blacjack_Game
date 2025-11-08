let player = {
  name: "ShivaChandra",
  chips: 100,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let betAmount = 10;

let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = `${player.name}: $${player.chips}`;

// Function to get a random card
function getRandomCard() {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1=Ace, 11=Jack,12=Queen,13=King

  let value = values[Math.floor(Math.random() * values.length)];
  let suit = suits[Math.floor(Math.random() * suits.length)];

  let cardValue = value > 10 ? 10 : value === 1 ? 11 : value; // Ace=11, Face=10
  let image = `images/${value}_of_${suit}.png`;

  return { value: cardValue, image };
}

// Start the game
function startGame() {
  if (player.chips < betAmount) {
    messageEl.textContent = "You're out of chips! Game over 💀";
    return;
  }

  player.chips -= betAmount;
  playerEl.textContent = `${player.name}: $${player.chips}`;

  isAlive = true;
  hasBlackJack = false;
  cards = [getRandomCard(), getRandomCard()];
  sum = cards[0].value + cards[1].value;

  renderGame();
}

// Draw new card
function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    cards.push(card);
    sum += card.value;
    renderGame();
  }
}

// Render cards & game status
function renderGame() {
  // Clear previous cards
  cardsEl.innerHTML = "";

  // Display cards
  cards.forEach((card, index) => {
    let cardImg = document.createElement("img");
    cardImg.src = card.image;
    cardImg.classList.add("card-img");
    cardImg.style.animationDelay = `${index * 0.3}s`;
    cardsEl.appendChild(cardImg);
  });

  sumEl.textContent = "Sum: " + sum;

  if (sum < 21) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "🎉 Blackjack! You win!";
    hasBlackJack = true;
    player.chips += betAmount * 2; // win double
    playerEl.textContent = `${player.name}: $${player.chips}`;
  } else {
    message = "😞 You're out of the game!";
    isAlive = false;
  }

  messageEl.textContent = message;
}
