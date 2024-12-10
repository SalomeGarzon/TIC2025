const feedbackText = document.getElementById('feedback-text');
const feedbackImage = document.getElementById('feedback-image');

document.querySelectorAll('.word').forEach(button => {
    button.addEventListener('click', () => {
        const adjective = button.textContent.toLowerCase();

        // Actual logic can be expanded based on your requirements
        if (adjective === "beautiful") {
            feedbackText.textContent = "Correct! This person is beautiful.";
            feedbackImage.src = "img/beautiful.png";
        } else {
            feedbackText.textContent = "Try again!";
        }
    });
});
