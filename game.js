

let score = 0; 

const urlParams = new URLSearchParams(window.location.search); 
const difficulty = urlParams.get('difficulty');
const category = urlParams.get('category'); 

document.getElementById('next-question').addEventListener('click', cargarPregunta);

function cargarPregunta() {
    // Llama a la API con los parámetros seleccionados
    const apiURL = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=${category}&type=multiple`;

    fetch(apiURL) // 
        .then(respuesta => respuesta.json()) 
        .then(data => {
            const pregunta = data.results[0]; 
            document.getElementById('question').innerHTML = pregunta.question;

            // Junta respuestas incorrectas + correcta y las mezcla
            const opciones = [...pregunta.incorrect_answers, pregunta.correct_answer];
            opciones.sort(() => Math.random() - 0.5); 

            const contenedorRespuestas = document.getElementById('answers');
            contenedorRespuestas.innerHTML = '';

            opciones.forEach(opcion => {
                const boton = document.createElement('button'); 
                boton.textContent = opcion; 
                boton.style.backgroundColor = '';
                boton.onclick = function() {
                    verificarRespuesta(boton, opcion, pregunta.correct_answer); 
                };
                contenedorRespuestas.appendChild(boton); 
            });
        })
        .catch(error => console.error('Error al cargar la pregunta:', error)); // Maneja errores
}

// 🟢 4️⃣ Función para verificar si la respuesta seleccionada es correcta
function verificarRespuesta(botonSeleccionado, respuestaElegida, respuestaCorrecta) {
    // Desactiva todos los botones para evitar más clics
    const botones = document.querySelectorAll('#answers button');
    botones.forEach(boton => boton.disabled = true);

    if (respuestaElegida === respuestaCorrecta) {
        // Respuesta correcta
        botonSeleccionado.classList.add('correct'); // Aplica estilo verde
        score++; // Suma un punto
    } else {
        // Respuesta incorrecta
        botonSeleccionado.classList.add('incorrect'); // Aplica estilo rojo

        // Resalta la respuesta correcta
        botones.forEach(boton => {
            if (boton.textContent === respuestaCorrecta) {
                boton.classList.add('correct'); // Marca la respuesta correcta
            }
        });
    }

    // Actualiza la puntuación en pantalla
    document.getElementById('score').textContent = score;

    // Después de 2 segundos, carga otra pregunta
    setTimeout(cargarPregunta, 2000);
}

// 🟢 5️⃣ Carga la primera pregunta automáticamente al iniciar el juego
cargarPregunta();

