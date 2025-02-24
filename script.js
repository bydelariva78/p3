// script.js

let score = 0; // Variable para almacenar la puntuación del jugador

// 1️⃣ Obtiene los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const difficulty = params.get('difficulty'); // Extrae la dificultad
const category = params.get('category'); // Extrae la categoría

document.getElementById('next-question').addEventListener('click', fetchQuestion); // Agrega un evento al botón para cargar una nueva pregunta

function fetchQuestion() {
    fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=${category}&type=multiple`)
        .then(response => response.json())
        .then(data => {
            const questionData = data.results[0];
            document.getElementById('question').innerHTML = questionData.question;
            
            const answers = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);

            const answersContainer = document.getElementById('answers');
            answersContainer.innerHTML = ''; // Limpia respuestas anteriores

            answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.style.backgroundColor = ''; // 🔴 Asegura que el color de fondo inicial sea neutro
                button.onclick = () => checkAnswer(button, answer, questionData.correct_answer);
                answersContainer.appendChild(button);
            });
        });
}

function checkAnswer(button, selected, correct) {
    // Desactiva todos los botones para evitar múltiples clics
    document.querySelectorAll('#answers button').forEach(btn => btn.disabled = true);

    if (selected === correct) {
        button.classList.add('correct'); // ✅ Aplica la clase verde solo si es correcta
        score++;
    } else {
        button.classList.add('incorrect'); // ❌ Aplica la clase roja si es incorrecta

        // Resalta la respuesta correcta
        document.querySelectorAll('#answers button').forEach(btn => {
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            }
        });
    }
    
    document.getElementById('score').textContent = score; // Actualiza la puntuación
    setTimeout(fetchQuestion, 2000); // Carga la siguiente pregunta después de 2 segundos
}

// 4️⃣ Llama a la API por primera vez con los parámetros seleccionados
fetchQuestion();