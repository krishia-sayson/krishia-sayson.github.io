let clicked = document.getElementsByClassName("clicked");


document.querySelector('.site-container').addEventListener('click', function() {
    this.classList.toggle('clicked');
});