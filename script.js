diff --git a/script.js b/script.js
index 7da3e1c48a55053b75d05acca932a7fee161283e..4642303533285e705ddfb2bce3b8d4db7dafae58 100644
--- a/script.js
+++ b/script.js
@@ -1,66 +1,79 @@
-// Чекаємо, поки вся HTML-структура завантажиться
-document.addEventListener("DOMContentLoaded", function() {
-
-    // 1. Генеруємо секретне число
-    let secretNumber = Math.floor(Math.random() * 100) + 1;
-    let attempts = 0;
-
-    // 2. Отримуємо доступ до наших HTML-елементів
-    const guessInput = document.getElementById("guessInput");
-    const guessButton = document.getElementById("guessButton");
-    const messageEl = document.getElementById("message");
-    const attemptsCountEl = document.getElementById("attemptsCount");
-
-    console.log((Секретне число для тестування: ${secretNumber}));
-
-    // 3. Додаємо обробник події для кнопки
-    guessButton.addEventListener("click", checkGuess);
-
-    // Дозволяємо вгадувати натисканням Enter у полі вводу
-    guessInput.addEventListener("keyup", function(event) {
-        if (event.key === "Enter") {
-            checkGuess();
-        }
-    });
-
-    // 4. Основна функція гри
-    function checkGuess() {
-        // Отримуємо значення з поля вводу і перетворюємо його на число
-        let userGuess = parseInt(guessInput.value);
-
-        // Скидаємо класи стилів
-        messageEl.className = "";
-
-        // Перевірка, чи введено коректне число
-        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
-            messageEl.textContent = "Введіть число від 1 до 100!";
-            messageEl.classList.add("message-error");
-            return; // Виходимо з функції
-        }
-
-        // Оновлюємо лічильник спроб
-        attempts++;
-        attemptsCountEl.textContent = attempts;
-
-        // Логіка порівняння
-        if (userGuess < secretNumber) {
-            messageEl.textContent = "Замало! Спробуйте більше.";
-            messageEl.classList.add("message-low");
-        } else if (userGuess > secretNumber) {
-            messageEl.textContent = "Забагато! Спробуйте менше.";
-            messageEl.classList.add("message-high");
-        } else {
-            messageEl.textContent = Вітаємо! Ви вгадали число ${secretNumber} за ${attempts} спроб!;
-            messageEl.classList.add("message-win");
-            
-            // Блокуємо гру після перемоги
-            guessInput.disabled = true;
-            guessButton.disabled = true;
-            guessButton.textContent = "Грати знову?"; // Можна додати логіку перезапуску
-        }
-        
-        // Очищуємо поле вводу для наступної спроби
-        guessInput.value = "";
-        guessInput.focus(); // Ставимо фокус назад на поле вводу
-    }
-});
\ No newline at end of file
+// Очікуємо, поки HTML буде готовий
+document.addEventListener('DOMContentLoaded', () => {
+    let secretNumber = 0;
+    let attempts = 0;
+
+    const guessInput = document.getElementById('guessInput');
+    const guessButton = document.getElementById('guessButton');
+    const messageEl = document.getElementById('message');
+    const attemptsCountEl = document.getElementById('attemptsCount');
+
+    function setMessage(text, className) {
+        messageEl.textContent = text;
+        messageEl.className = '';
+        if (className) {
+            messageEl.classList.add(className);
+        }
+    }
+
+    function resetGame() {
+        secretNumber = Math.floor(Math.random() * 100) + 1;
+        attempts = 0;
+        attemptsCountEl.textContent = '0';
+        guessInput.value = '';
+        guessInput.disabled = false;
+        guessButton.disabled = false;
+        guessButton.textContent = 'Вгадати!';
+        guessButton.dataset.state = 'guess';
+        setMessage('', '');
+        guessInput.focus();
+
+        console.log(`Секретне число для тестування: ${secretNumber}`);
+    }
+
+    function checkGuess() {
+        const userGuess = Number(guessInput.value);
+        setMessage('', '');
+
+        if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
+            setMessage('Введіть ціле число від 1 до 100!', 'message-error');
+            return;
+        }
+
+        attempts += 1;
+        attemptsCountEl.textContent = attempts;
+
+        if (userGuess < secretNumber) {
+            setMessage('Замало! Спробуйте більше.', 'message-low');
+        } else if (userGuess > secretNumber) {
+            setMessage('Забагато! Спробуйте менше.', 'message-high');
+        } else {
+            setMessage(`Вітаємо! Ви вгадали число ${secretNumber} за ${attempts} спроб!`, 'message-win');
+            guessInput.disabled = true;
+            guessButton.textContent = 'Грати знову';
+            guessButton.dataset.state = 'play-again';
+            guessButton.focus();
+        }
+
+        guessInput.value = '';
+        if (!guessInput.disabled) {
+            guessInput.focus();
+        }
+    }
+
+    guessButton.addEventListener('click', () => {
+        if (guessButton.dataset.state === 'play-again') {
+            resetGame();
+        } else {
+            checkGuess();
+        }
+    });
+
+    guessInput.addEventListener('keyup', (event) => {
+        if (event.key === 'Enter' && guessButton.dataset.state !== 'play-again') {
+            checkGuess();
+        }
+    });
+
+    resetGame();
+});
