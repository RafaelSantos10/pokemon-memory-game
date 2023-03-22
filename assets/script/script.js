const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const onePlayer = document.querySelector('.play1')
const twoPlayer = document.querySelector('.play2')

onePlayer.addEventListener('click', initGame)
twoPlayer.addEventListener('click', initGame)

function startGame() {
	initializeCards(game.creatCardsFromPokemons());

}

function initializeCards() {
	let gameBoard = document.getElementById("gameboard");
	gameBoard.innerHTML = ''

	game.cards.forEach((card) => {
		let cardElement = document.createElement('div');
		cardElement.id = card.id;
		cardElement.classList.add(CARD);
		cardElement.dataset.icon = card.icon;

		createCardContent(card, cardElement);

		cardElement.addEventListener('click', flipCard)
		gameBoard.appendChild(cardElement);
	})
}

function createCardContent(card, cardElement) {
	createCardFace(FRONT, card, cardElement);
	createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
	let cardElementFace = document.createElement('div');
	cardElementFace.classList.add(face);


	if (face === FRONT) {
		let iconElement = document.createElement('img');
		iconElement.src = "./assets/img/" + card.icon + ".png";
		iconElement.classList.add(ICON);
		cardElementFace.appendChild(iconElement);
	} else {
		let iconElement = document.createElement('img');
		iconElement.src = "./assets/img/poke.png";
		iconElement.classList.add(ICON);
		cardElementFace.appendChild(iconElement);
	}
	element.appendChild(cardElementFace);
}


function flipCard() {
				
	if (game.setCard(this.id)) {
		this.classList.add('flip')
				
		if (game.secondCard) {
			if (game.checkMatch()) {
			console.log(game.checkMatch())			
				game.clearCard()
				if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameover")
                    gameOverLayer.style.display = 'flex'
                }
			} else {
				setTimeout(() => {
					let firstCardView = document.getElementById(game.firstCard.id)
					let secondCardView = document.getElementById(game.secondCard.id)

					firstCardView.classList.remove('flip')
					secondCardView.classList.remove('flip')
					game.unflipCards()
				}, 1000)				
			}
		}
	}
	
}

function restart() {
    game.clearCard();
    startGame();
    let gameOverLayer = document.getElementById("gameover");
    gameOverLayer.style.display = 'none';
}

function initGame(e){
	
	if(e.target.classList.contains("play1")){
		startGame()
	} else if(e.target.classList.contains("play2")){
		console.log("two players")
	}

}

