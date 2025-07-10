const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btn = document.querySelector('button');


function toggleButton() 
{
    btn.disabled = !(emailInput.value.trim() && senhaInput.value.trim());
}

emailInput.addEventListener('input', toggleButton);
senhaInput.addEventListener('input', toggleButton);


document.getElementById('loginForm').addEventListener('submit', e => 
{
    e.preventDefault();
    localStorage.setItem('emailUsuario', emailInput.value.trim());
    window.location.href = '/coleta-consciente/listagem/listagem.html';
});