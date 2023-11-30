const span = document.querySelectorAll('#menuToggle span');

document.addEventListener('scroll', () => {
    
    const scrollPosition = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight - 125;

    const newColor = scrollPosition >= windowHeight ? 'darkblue' : 'white';

    for (let i = 0; i < span.length; i++) {
        span[i].style.backgroundColor = newColor;
        span[i].style.color = newColor;
    }
});