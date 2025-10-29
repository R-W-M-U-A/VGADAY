// Чекаємо, поки вся HTML-структура завантажиться
document.addEventListener("DOMContentLoaded", function() {

    // 1. Генеруємо секретне число
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    // 2. Отримуємо доступ до наших HTML-елементів
    const guessInput = document.getElementById("guessInput");
    const guessButton = document.getElementById("guessButton");
    const messageEl = document.getElementById("message");
    const attemptsCountEl = document.getElementById("attemptsCount");

    console.log((Секретне число для тестування: ${secretNumber}));

    // 3. Додаємо обробник події для кнопки
    guessButton.addEventListener("click", checkGuess);

    // Дозволяємо вгадувати натисканням Enter у полі вводу
    guessInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    // 4. Основна функція гри
    function checkGuess() {
        // Отримуємо значення з поля вводу і перетворюємо його на число
        let userGuess = parseInt(guessInput.value);

        // Скидаємо класи стилів
        messageEl.className = "";

        // Перевірка, чи введено коректне число
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            messageEl.textContent = "Введіть число від 1 до 100!";
            messageEl.classList.add("message-error");
            return; // Виходимо з функції
        }

        // Оновлюємо лічильник спроб
        attempts++;
        attemptsCountEl.textContent = attempts;

        // Логіка порівняння
        if (userGuess < secretNumber) {
            messageEl.textContent = "Замало! Спробуйте більше.";
            messageEl.classList.add("message-low");
        } else if (userGuess > secretNumber) {
            messageEl.textContent = "Забагато! Спробуйте менше.";
            messageEl.classList.add("message-high");
        } else {
            messageEl.textContent = Вітаємо! Ви вгадали число ${secretNumber} за ${attempts} спроб!;
            messageEl.classList.add("message-win");
            
            // Блокуємо гру після перемоги
            guessInput.disabled = true;
            guessButton.disabled = true;
            guessButton.textContent = "Грати знову?"; // Можна додати логіку перезапуску
        }
        
        // Очищуємо поле вводу для наступної спроби
        guessInput.value = "";
        guessInput.focus(); // Ставимо фокус назад на поле вводу
    }
});