document.addEventListener("DOMContentLoaded", function () {
  const finalizeBtn = document.getElementById("finalizeBtn");
  const adjectiveDropdowns = document.querySelectorAll(".adjective-dropdown");
  const images = document.querySelectorAll(".img-item");

  finalizeBtn.addEventListener("click", function () {
    let correctCount = 0;
    let incorrectCount = 0;

    // Verificar cada dropdown
    adjectiveDropdowns.forEach((dropdown) => {
      const selectedValue = dropdown.value;
      const imageItem = dropdown.closest(".image-item");
      const image = imageItem.querySelector("img");
      const correctAnswer = image.dataset.answer;

      // Comparar la selección con el alt de la imagen
      if (selectedValue === correctAnswer) {
        correctCount++;
        setStyles(imageItem, "green");
      } else {
        incorrectCount++;
        setStyles(imageItem, "red");
      }
    });

    // Deshabilitar los dropdowns después de verificar
    adjectiveDropdowns.forEach((dropdown) => (dropdown.disabled = true));

    // Mostrar los resultados
    showResults(correctCount, incorrectCount);
  });

  // Función para establecer estilos
  function setStyles(imageItem, color) {
    imageItem.style.borderColor = color;
    const img = imageItem.querySelector("img");
    const dropdown = imageItem.querySelector(".adjective-dropdown");
    img.style.borderColor = color;
    dropdown.style.borderColor = color;
  }

  // Función para mostrar los resultados
  function showResults(correctCount, incorrectCount) {
    const feedbackContainer = document.getElementById("feedback");

    // Crear HTML para los resultados
    feedbackContainer.innerHTML = `
    <h3>Results:</h3>
    <p><strong style="color: green;">Correct :</strong> ${correctCount}</p>
    <p><strong style="color: red;">Incorrect :</strong> ${incorrectCount}</p>
    <button id="retryBtn" tabindex="0">Retry</button>
    <button id="nextBtn" tabindex="0">Next Level</button>
  `;

    // Agregar funcionalidades a los botones
    document.getElementById("retryBtn").addEventListener("click", retryLevel);
    document.getElementById("nextBtn").addEventListener("click", goToNextLevel);
  }

  // Función para reintentar el nivel
  function retryLevel() {
    adjectiveDropdowns.forEach((dropdown) => {
      dropdown.disabled = false;
      dropdown.value = "";
    });

    // Restablecer estilos
    images.forEach((image) => {
      const imageItem = image.closest(".image-item");
      setStyles(imageItem, ""); // Limpia los estilos
    });

    // Limpiar feedback
    document.getElementById("feedback").innerHTML = "";
  }

  // Función para ir al siguiente nivel
  function goToNextLevel() {
    window.location.href = "TIC2/html/Adjetives/adjetives4.html";
  }

  // Accesibilidad: Navegación con Enter y Espacio
  images.forEach((img) => {
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        img.nextElementSibling.focus(); // Mueve el foco al select siguiente
      }
    });
  });
});
