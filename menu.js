// menu.js

document.getElementById('start-game').addEventListener('click', function() {
    const difficulty = document.getElementById('difficulty').value; // Obtiene la dificultad seleccionada
    const category = document.getElementById('category').value; // Obtiene la categoría seleccionada
    
    // Redirige a la página del juego con los parámetros seleccionados
    window.location.href = `game.html?difficulty=${difficulty}&category=${category}`;
});