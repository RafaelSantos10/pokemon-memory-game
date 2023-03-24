const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

const start = document.querySelector('.play')


const audioVictory = document.querySelector('.victory');
const audioWelcome = document.querySelector('.welcome');
const audioTheme = document.querySelector('.Theme');

document.body.addEventListener('mousemove', () => {
	let onHomeScreen = document.querySelector('.homeScreen')
	if (onHomeScreen !== null) {
		audioWelcome.play()

	}
})

start.addEventListener('click', initGame)
twoPlayer.addEventListener('click', initGame)

function startGame() {

	initializeCards(game.creatCardsFromPokemons());


	setTimeout(() => {
		startTimer()
	}, [1700])



}

function initializeCards() {
	let gameBoard = document.getElementById("gameboard");
	gameBoard.innerHTML = ''


	game.cards.forEach((card) => {

		let cardElement = document.createElement('div');
		cardElement.id = card.id;
		cardElement.classList.add(CARD);
		setTimeout(() => {
			cardElement.classList.add('flip');

			setTimeout(() => {
				cardElement.classList.remove('flip');
			}, [1000])
		}, [800])
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
				game.clearCard()
				if (game.checkGameOver()) {
					audioTheme.pause();
					audioVictory.play();
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
	resetTimer()
	startGame();
	audioVictory.pause()
	audioTheme.play()

	let gameOverLayer = document.getElementById("gameover");
	gameOverLayer.style.display = 'none';

	document.getElementById('minute').innerText = '00';
	document.getElementById('second').innerText = '00';
}

function initGame(e) {
	
	audioWelcome.pause();
	audioTheme.play();
	startGame()
}

function startTimer() {
	pauseTimer();
	cron = setInterval(() => { timer(); }, 10);
}

function pauseTimer() {
	clearInterval(cron);
}

function resetTimer() {


	minute = 0;
	second = 0;
	millisecond = 0;



}

function timer() {
	if ((millisecond += 10) == 1000) {
		millisecond = 0;
		second++;
	}
	if (second == 60) {
		second = 0;
		minute++;
	}
	if (minute == 60) {
		minute = 0;
		hour++;
	}

	document.getElementById('minute').innerText = returnData(minute);
	document.getElementById('second').innerText = returnData(second);

	if (game.checkGameOver() === true) {
		pauseTimer()

		localStorage.setItem('seconds', returnData(second))
		localStorage.setItem('minutes', returnData(minute))
		document.querySelector('.minute').innerText = localStorage.getItem("minutes")
		document.querySelector('.second').innerText = localStorage.getItem("seconds");

	}

}

function returnData(input) {
	return input > 10 ? input : `0${input}`
}
