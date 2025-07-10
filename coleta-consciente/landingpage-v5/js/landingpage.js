// Scroll suave para links âncora
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
            smoothScrollTo(offsetPosition);
            
            history.pushState(null, null, targetId);
        }
    });
});

// Função de scroll suave com fallback
function smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; 
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Função de easing para efeito suave
    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Corrige posição ao carregar página com hash
window.addEventListener('load', function() {
    if (window.location.hash) {
        setTimeout(function() {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                    behavior: 'instant'
                });
            }
        }, 100);
    }
});
