document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const nextButton = document.querySelector('.next-level');

    let currentLevel = parseInt(localStorage.getItem('currentLevel') || '1');
    let correctCount = parseInt(localStorage.getItem('correctCount') || '0');
    let incorrectCount = parseInt(localStorage.getItem('incorrectCount') || '0');

    // Actualiza la barra de progreso
    document.getElementById('progressBar').style.width = `${(currentLevel / 7) * 100}%`;

    options.forEach(option => {
        option.addEventListener('click', function() {
            // Elimina la clase 'selected' de todas las opciones
            options.forEach(opt => opt.classList.remove('selected'));
            // Añade la clase 'selected' a la opción clickeada
            this.classList.add('selected');
            // Habilita el botón Next Level
            nextButton.disabled = false;
            nextButton.classList.add('active');
        });
    });

    nextButton.addEventListener('click', function() {
        if (currentLevel === 7) {
            // Al llegar al nivel 7, muestra el feedback y reinicia el juego
            alert(`Juego completado. Acertaste: ${correctCount}, Errores: ${incorrectCount}`);
            localStorage.clear(); // Limpiar el almacenamiento para reiniciar
            location.reload(); // Recarga la página para empezar de nuevo
        } else {
            // Incrementa el nivel y recarga la página para el siguiente nivel
            localStorage.setItem('currentLevel', (currentLevel + 1).toString());
            location.reload();
        }
    });
});
