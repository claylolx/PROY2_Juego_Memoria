const characters = [
    'itadori', 'jogo', 'mahito', 'megumi', 'nobara', 'toge', 'toji', 'yuta'
]; // Array que contiene los nombres de los personajes

const gameBoard = document.getElementById('gameBoard'); // Obtiene el elemento del tablero del juego
const timerElement = document.getElementById('timer'); // Obtiene el elemento del temporizador
const modal = document.getElementById('modal'); // Obtiene el elemento modal para mostrar el fin del juego
const closeModal = document.getElementById('closeModal'); // Obtiene el botón para cerrar el modal
const restartGame = document.getElementById('restartGame'); // Obtiene el botón para reiniciar el juego
const closeGame = document.getElementById('closeGame'); // Obtiene el botón para cerrar el juego
let cards = []; // Array para almacenar las tarjetas del juego
let flippedCards = []; // Array para almacenar las tarjetas volteadas
let matchedPairs = 0; // Contador para los pares coincidentes
let timer; // Variable para almacenar el temporizador
let timeRemaining = 60; // Tiempo restante para el juego

// Función para crear el tablero del juego
function createBoard() {
    const cardArray = [...characters, ...characters]; // Duplicar los personajes para crear pares
    cardArray.sort(() => 0.5 - Math.random()); // Mezclar las tarjetas de manera aleatoria

    cardArray.forEach(character => {
        const card = document.createElement('div'); // Crear un elemento div para cada tarjeta
        card.classList.add('card'); // Añadir la clase 'card' al div
        card.dataset.character = character; // Asignar el personaje a un atributo de datos
        card.addEventListener('click', flipCard); // Añadir un evento de clic para voltear la tarjeta

        const frontFace = document.createElement('img'); // Crear un elemento img para la cara frontal de la tarjeta
        frontFace.src = `images/easy/${character}.jpg`; // Asignar la imagen correspondiente al personaje
        card.appendChild(frontFace); // Añadir la imagen al div de la tarjeta

        gameBoard.appendChild(card); // Añadir la tarjeta al tablero del juego
        cards.push(card); // Añadir la tarjeta al array de tarjetas
    });

    startTimer(); // Iniciar el temporizador
}

// Función para iniciar el temporizador
function startTimer() {
    timerElement.textContent = `Tiempo restante: ${timeRemaining}s`; // Mostrar el tiempo restante en el temporizador
    timer = setInterval(() => {
        timeRemaining--; // Decrementar el tiempo restante en 1 segundo
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`; // Actualizar el texto del temporizador
        if (timeRemaining === 0) { // Si el tiempo se agota
            clearInterval(timer); // Detener el temporizador
            showModal(); // Mostrar el modal de fin del juego
        }
    }, 1000); // Ejecutar cada segundo
}

// Función para voltear una tarjeta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) { // Comprobar si hay menos de 2 tarjetas volteadas y la tarjeta actual no está ya volteada
        this.classList.add('flipped'); // Añadir la clase 'flipped' a la tarjeta
        flippedCards.push(this); // Añadir la tarjeta al array de tarjetas volteadas

        if (flippedCards.length === 2) { // Si hay dos tarjetas volteadas
            checkForMatch(); // Comprobar si coinciden
        }
    }
}



createBoard();

