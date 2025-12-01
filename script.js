// Очікуємо, поки HTML буде готовий

document.addEventListener('DOMContentLoaded', () => {
    let secretNumber = 0;
    let attempts = 0;

    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const messageEl = document.getElementById('message');
    const attemptsCountEl = document.getElementById('attemptsCount');

    function setMessage(text, className) {
        messageEl.textContent = text;
        messageEl.className = '';
        if (className) {
            messageEl.classList.add(className);
        }
    }

    function setButtonState(state) {
        guessButton.dataset.state = state;
        guessButton.textContent = state === 'play-again' ? 'Грати знову' : 'Вгадати!';
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsCountEl.textContent = '0';
        guessInput.value = '';
        guessInput.disabled = false;
        setButtonState('guess');
        setMessage('Уведіть число й натисніть Enter або кнопку.', '');
        guessInput.focus();

        console.log(`Секретне число для тестування: ${secretNumber}`);
    }

    function handleGuess() {
        if (guessButton.dataset.state === 'play-again') {
            resetGame();
            return;
        }

        const rawValue = guessInput.value.trim();
        if (rawValue === '') {
            setMessage('Спершу введіть число від 1 до 100.', 'message-error');
            guessInput.focus();
            return;
        }

        const userGuess = Number(rawValue);
        if (!Number.isFinite(userGuess) || !Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
            setMessage('Потрібно ціле число від 1 до 100.', 'message-error');
            guessInput.focus();
            return;
        }

        attempts += 1;
        attemptsCountEl.textContent = attempts;

        if (userGuess === secretNumber) {
            setMessage(`Вітаємо! Ви вгадали ${secretNumber} за ${attempts} спроб.`, 'message-win');
            guessInput.disabled = true;
            setButtonState('play-again');
            guessButton.focus();
        } else if (userGuess < secretNumber) {
            setMessage('Замало! Спробуйте більше.', 'message-low');
            guessInput.value = '';
            guessInput.focus();
        } else {
            setMessage('Забагато! Спробуйте менше.', 'message-high');
            guessInput.value = '';
            guessInput.focus();
        }
    }

    guessButton.addEventListener('click', handleGuess);

    guessInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleGuess();
        }
    });

    resetGame();
});
