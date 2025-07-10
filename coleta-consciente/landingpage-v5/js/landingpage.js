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

document.getElementById('parceiroForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const checkboxes = document.querySelectorAll('input[name="residuos"]');
  const residuos = {
    papel: false,
    plastico: false,
    vidro: false,
    metal: false,
    oleoCozinha: false,
    pilhaBateria: false,
    eletronico: false,
    roupa: false,
    outros: false
  };

  checkboxes.forEach(cb => {
    if (cb.checked) residuos[cb.value] = true;
  });

    const parceiroData = {
    nomeParceiro: document.getElementById('nomeParceiro').value,
    tipoParceiro: document.getElementById('tipoParceiro').value,
    responsavelParceiro: document.getElementById('responsavelParceiro').value,
    telResponsavel: document.getElementById('telResponsavel').value,
    emailResponsavel: document.getElementById('emailResponsavel').value,
    rua: document.getElementById('rua').value,
    numero: parseInt(document.getElementById('numero').value),
    bairro: document.getElementById('bairro').value,
    createdAt: new Date().toISOString(), // ✅ Adiciona a data de cadastro corretamente
    ...residuos
    };


  try {
    const response = await fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parceiroData)
    });

    if (response.ok) {
      alert('Dados enviados com sucesso!');
      document.getElementById('parceiroForm').reset();
    } else {
      alert('Erro ao enviar os dados. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao enviar:', error);
    alert('Erro de conexão. Verifique sua internet.');
  }
});

// Animação ao scroll
document.addEventListener('DOMContentLoaded', function() {
  const impactCards = document.querySelectorAll('.impact-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay diferente para cada card
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 150 * index);
      }
    });
  }, { threshold: 0.1 });
  
  impactCards.forEach(card => {
    observer.observe(card);
  });
});


$(document).ready(function() 
{
    $('#tipoParceiro').select2({
        minimumResultsForSearch: Infinity, // Remove a busca
        templateResult: formatOption,
        templateSelection: formatOption,
        dropdownCssClass: 'custom-select2-dropdown', // Classe personalizada
        containerCssClass: 'custom-select2-container' // Classe personalizada
    });

    function formatOption(option) {
        if (!option.id) return option.text;
        var $icon = $('<i>').addClass($(option.element).data('icon') + ' me-2');
        var $text = $('<span>').text(option.text);
        return $([$icon[0], $text[0]]);
    }
});