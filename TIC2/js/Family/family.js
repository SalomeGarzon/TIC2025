document.getElementById('nextButton').addEventListener('click', () => {
    window.location.href = 'TIC2/html/Family/family1.html'; // Cambia a la URL de la siguiente página
  });
  
  // Elementos interactivos
  const focusableElements = Array.from(
    document.querySelectorAll('a, button, video, [tabindex="0"]')
  );

  // Añadir y quitar clase 'focused' para manejar el enfoque visual al pasar con mouse o teclado
  focusableElements.forEach((element) => {
    element.addEventListener('focus', () => {
      element.classList.add('focused');
    });

    element.addEventListener('blur', () => {
      element.classList.remove('focused');
    });

    element.addEventListener('mouseover', () => {
      element.classList.add('focused');
    });

    element.addEventListener('mouseout', () => {
      element.classList.remove('focused');
    });
  });

  // Navegación con teclado
  document.addEventListener('keydown', function(event) {
    const currentIndex = focusableElements.indexOf(document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        focusableElements[prevIndex].focus();
        break;

      case 'Enter':
        if (document.activeElement.tagName === 'BUTTON' || document.activeElement.tagName === 'A') {
          document.activeElement.click();
        }
        break;

      default:
        break;
    }
  });