// --- POMODORO TIMER ---
// --- POMODORO TIMER ---
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    // Safety check: if the element doesn't exist yet, stop to prevent crashing
    if (!timerElement) return; 
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    const startBtn = document.getElementById('start-btn');
    if (isRunning) {
        clearInterval(timer);
        if (startBtn) {
            startBtn.textContent = 'Start';
            startBtn.style.backgroundColor = '#00adb5';
        }
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert("Time's up! Take a short break.");
                resetTimer();
            }
        }, 1000);
        if (startBtn) {
            startBtn.textContent = 'Pause';
            startBtn.style.backgroundColor = '#ff5722';
        }
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    isRunning = false;
    updateTimerDisplay();
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.textContent = 'Start';
        startBtn.style.backgroundColor = '#00adb5';
    }
}

// --- FLASHCARDS DATA ---
const deck = [
    { q: "What is the UI framework we are using?", a: "HTML and CSS!" },
    { q: "What runs our Timer?", a: "JavaScript vanilla code." },
    { q: "Where will we host this code?", a: "GitHub!" }
];

let currentCardIndex = 0;

function showCard() {
    const innerCard = document.getElementById('card-inner');
    if (!innerCard) return; // Safety check
    
    innerCard.classList.remove('is-flipped'); 
    
    setTimeout(() => {
        const qElem = document.getElementById('question');
        const aElem = document.getElementById('answer');
        if (qElem) qElem.textContent = deck[currentCardIndex].q;
        if (aElem) aElem.textContent = deck[currentCardIndex].a;
    }, 150); 
}

function flipCard() {
    const innerCard = document.getElementById('card-inner');
    if (innerCard) innerCard.classList.toggle('is-flipped');
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % deck.length;
    showCard();
}

// --- WAIT FOR HTML TO LOAD SAFELY ---
window.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    showCard();
});
