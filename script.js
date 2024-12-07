// console.log("JavaScript is running");

//     const container = document.getElementById('bubble-container');

//     if (container) {
//         console.log("Container found, adding event listener...");

//         container.addEventListener('mousemove', function (e) {
//             console.log("Mousemove event detected");

//             const bubble = document.createElement('div');
//             bubble.classList.add('bubble');

//             const size = Math.random() * 30 + 20;
//             const left = e.clientX - container.getBoundingClientRect().left - size / 2;
//             const top = e.clientY - container.getBoundingClientRect().top - size / 2;

//             bubble.style.width = `${size}px`;
//             bubble.style.height = `${size}px`;
//             bubble.style.left = `${left}px`;
//             bubble.style.top = `${top}px`;

//             console.log(`Bubble created at (${left}, ${top}) with size ${size}px`);
//             const color1 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
//             const color2 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`;
            
//             bubble.style.background = `radial-gradient(circle, ${color1} 10%, ${color2} 70%)`;
        
//             container.appendChild(bubble);

//             setTimeout(() => {
//                 bubble.remove();
//             }, 5600);
//         });
//     } else {
//         console.error("Container not found!");
//     }

document.addEventListener("DOMContentLoaded", () => {
    const certs = document.querySelector(".certs");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          certs.classList.add("visible");
          observer.unobserve(certs); // Stop observing once it's visible
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of .certs is in view
  
    observer.observe(certs);
  });
const container = document.getElementById('bubble-container');

// Function to create a bubble at the mouse position
function createBubble(e) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = Math.random() * 30 + 20; // Random size between 20px and 50px
    const left = e.clientX - container.getBoundingClientRect().left - size / 2; // Position horizontally based on mouse
    const top = e.clientY - container.getBoundingClientRect().top - size / 2; // Position vertically based on mouse

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;

    container.appendChild(bubble);

    // Remove the bubble after the pop effect (around 5.6 seconds)
    setTimeout(() => {
        bubble.remove();
    }, 5600); // 5600ms = 5.6 seconds (float + pop duration)
}

// Function to handle mouse hovering over the container
container.addEventListener('mousemove', function (e) {
    createBubble(e); // Create a bubble when the mouse moves
});


// Stop creating bubbles when the mouse leaves the container
container.addEventListener('mouseleave', function () {
    container.removeEventListener('mousemove', createBubble);
});
