const container = document.getElementById('bubble-container');

// Function to create a bubble at the mouse position
document.addEventListener('mousemove', function (e) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Set the size of the bubble (it can be random or fixed)
    const size = Math.random() * 30 + 20; // Random size between 20px and 50px
    const left = e.clientX - size / 2; // Position horizontally where the mouse is
    const top = e.clientY - size / 2;  // Position vertically where the mouse is

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;

    // Append the bubble to the container
    container.appendChild(bubble);

    // Optional: remove bubbles after a while to prevent cluttering the screen
    setTimeout(() => {
        bubble.remove();
    }, 1000); // Remove after 1 second
});