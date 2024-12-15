document.addEventListener("DOMContentLoaded", function() {
    const finalizeBtn = document.getElementById("finalizeBtn");
    const adjectiveDropdowns = document.querySelectorAll(".adjective-dropdown"); // Combo boxes (adjetivos)
    const images = document.querySelectorAll(".img-item"); // Imágenes

    finalizeBtn.addEventListener("click", function() {
        // Contadores para las parejas correctas e incorrectas
        let correctCount = 0;
        let incorrectCount = 0;

        // Verificar cada combo box
        adjectiveDropdowns.forEach(dropdown => {
            const selectedValue = dropdown.value; // Valor seleccionado en el dropdown
            const imageItem = dropdown.closest('.image-item'); // Obtener el contenedor de la imagen asociada
            const image = imageItem.querySelector('img'); // Obtener la imagen dentro del contenedor
            const imageAlt = image.alt; // Obtener el alt de la imagen asociada

            // Comprobar si el valor seleccionado coincide con el alt de la imagen
            if (selectedValue === imageAlt) {
                correctCount++;
                // Pintar la imagen y el dropdown de verde (correcto)
                imageItem.style.borderColor = "green"; // Pintar borde de la imagen
                image.style.borderColor = "green"; // Pintar borde de la imagen
                dropdown.style.borderColor = "green"; // Pintar borde del dropdown
            } else {
                incorrectCount++;
                // Pintar la imagen y el dropdown de rojo (incorrecto)
                imageItem.style.borderColor = "red"; // Pintar borde de la imagen
                image.style.borderColor = "red"; // Pintar borde de la imagen
                dropdown.style.borderColor = "red"; // Pintar borde del dropdown
            }
        });

        // Deshabilitar los combo boxes (dropdowns)
        adjectiveDropdowns.forEach(dropdown => {
            dropdown.disabled = true; // Deshabilita el dropdown para evitar más ediciones
        });

        // Mostrar los resultados
        showResults(correctCount, incorrectCount);
    });

    // Función para mostrar los resultados
    function showResults(correctCount, incorrectCount) {
        const feedbackContainer = document.getElementById("feedback");

        // Crear HTML para mostrar los resultados y los botones
        let feedbackHTML = `
            <h3>Resultados:</h3>
            <p><strong>Parejas Correctas:</strong> ${correctCount}</p>
            <p><strong>Parejas Incorrectas:</strong> ${incorrectCount}</p>
            <button id="retryBtn">Reintentar</button>
            <button id="nextBtn">Siguiente Nivel</button>
        `;

        // Mostrar el feedback final
        feedbackContainer.innerHTML = feedbackHTML;

        // Agregar las funcionalidades a los botones
        document.getElementById("retryBtn").addEventListener("click", retryLevel);
        document.getElementById("nextBtn").addEventListener("click", goToNextLevel);
    }

    // Función para reintentar el nivel
    function retryLevel() {
        // Restablecer todos los combo boxes
        adjectiveDropdowns.forEach(dropdown => {
            dropdown.disabled = false; // Habilitar el dropdown nuevamente
            dropdown.value = ""; // Limpiar la selección
        });

        // Restablecer los bordes de las imágenes y dropdowns
        const imageItems = document.querySelectorAll(".image-item");
        imageItems.forEach(item => {
            item.style.borderColor = ""; // Eliminar el borde de las imágenes
            const img = item.querySelector("img");
            img.style.borderColor = ""; // Eliminar el borde de la imagen
            const dropdown = item.querySelector(".adjective-dropdown");
            dropdown.style.borderColor = ""; // Eliminar el borde del dropdown
        });

        // Limpiar el área de feedback
        document.getElementById("feedback").innerHTML = "";

        // Reiniciar el conteo
        correctCount = 0;
        incorrectCount = 0;
    }

    // Función para ir al siguiente nivel (esto puede ser redirigir a otra página)
    function goToNextLevel() {
        // Aquí puedes redirigir a la siguiente página o nivel
        window.location.href = "/html/nivel2.html"; // Cambia esto por la URL del siguiente nivel
    }
});
