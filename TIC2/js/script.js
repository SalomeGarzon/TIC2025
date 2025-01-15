document.addEventListener("DOMContentLoaded", () => {
    const focusableElements = document.querySelectorAll(".card-link");
    let isMouseNavigation = false;
  
    // Detecta si el usuario navega con el mouse
    document.addEventListener("mousedown", () => {
      isMouseNavigation = true;
    });
  
    document.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
        isMouseNavigation = false;
      }
    });
  
    focusableElements.forEach((element) => {
      // Navegación por flechas
      element.addEventListener("keydown", (e) => {
        const index = Array.from(focusableElements).indexOf(e.target);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          const nextIndex = (index + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
          e.preventDefault();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
          focusableElements[prevIndex].focus();
          e.preventDefault();
        } else if (e.key === "Enter") {
          e.target.click();
        }
      });
  
      // Añade/remueve clase para foco visible al usar teclado
      element.addEventListener("focus", () => {
        if (!isMouseNavigation) {
          element.classList.add("keyboard-focused");
        }
      });
  
      element.addEventListener("blur", () => {
        element.classList.remove("keyboard-focused");
      });
    });
  });
  