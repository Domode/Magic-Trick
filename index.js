const suit = ["hearts", "clubs", "diamonds", "spades"];
let cards = [];
const orderedCards = [];
const cardsWrapper = document.querySelector(".cards-wrapper");

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  suit.forEach(function(current) {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit: current
      };
      cards.push(cardObject);
      orderedCards.push(cardObject);
    }
  });

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 32;
    const cardElement = document.createElement("div");
    cardElement.setAttribute("data-value", card.value);
    cardElement.classList.add("card", `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  // Your Code
  const buttonWrapper = document.querySelector(".btn-wrapper");

  // Removes Start button when pressed
  const startButton = document.getElementById("start-game");
  startButton.parentNode.removeChild(startButton);

  // Create shuffle button ///////////////////////////////////////////////////
  const shuffleButton = document.createElement("button");
  shuffleButton.classList.add("btn", "btn-lg", "btn-secondary");
  shuffleButton.textContent = "Shuffle";
  shuffleButton.style.margin = "0 1rem 0 0";
  buttonWrapper.appendChild(shuffleButton);

  // shuffle function
  function shuffleCards(array) {
    let newOrder, temp;

    for (let i = array.length - 1; i > 0; i--) {
      newOrder = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[newOrder];
      array[newOrder] = temp;
    }
    return array;
  }

  // Shuffles card array and replaces original card classes with shuffled ones
  shuffleButton.addEventListener("click", () => {
    shuffleCards(cards);
    cards.forEach((card, i) => {
      let newClass = {
        value: card.value,
        suit: card.suit
      };
      const getCard = cardsWrapper.childNodes[i];
      getCard.setAttribute("class", "card " + `${card.suit}-${card.value}`);
    });
  });

  // Create show/hide button ///////////////////////////////////////////////////
  const showHideButton = document.createElement("button");
  showHideButton.classList.add("btn", "btn-lg", "btn-secondary");
  showHideButton.textContent = "Show/Hide";
  buttonWrapper.appendChild(showHideButton);

  // Toggles the hidden class on cards parent
  showHideButton.addEventListener("click", () => {
    cardsWrapper.classList.toggle("hidden");
  });

  // Create magic button ///////////////////////////////////////////////////
  const magicButton = document.createElement("button");
  magicButton.classList.add("btn", "btn-lg", "btn-secondary");
  magicButton.textContent = "Magic";
  magicButton.style.margin = "0 0 0 1rem";
  buttonWrapper.appendChild(magicButton);

  // Re-orders cards
  magicButton.addEventListener("click", () => {
    orderedCards.forEach((card, i) => {
      let newClass = {
        value: card.value,
        suit: card.suit
      };

      const getcard = cardsWrapper.childNodes[i];
      getcard.setAttribute("class", "card " + `${card.suit}-${card.value}`);
    });
  });
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById("start-game").addEventListener("click", startGame);
