
// Verifica se usuário está logado. Se não, redireciona para login.
if (!localStorage.getItem('emailUsuario')) 
{
    alert('Usuário não autenticado. Faça login.');
    window.location.href = 'login.html';
}


// Botão logout no menu
document.getElementById('logoutLink').addEventListener('click', e => 
{
    e.preventDefault();
    localStorage.removeItem('emailUsuario');
    window.location.href = 'login.html';
});


document.getElementById('parceiroForm').addEventListener('submit', function(e) 
{
    e.preventDefault();
    const form = e.target;
    const data = 
    {
        nomeParceiro: form.nomeParceiro.value,
        tipoParceiro: form.tipoParceiro.value,
        responsavelParceiro: form.responsavelParceiro.value,
        telResponsavel: form.telResponsavel.value,
        emailResponsavel: form.emailResponsavel.value,
        rua: form.rua.value,
        numero: parseInt(form.numero.value),
        bairro: form.bairro.value,
        papel: form.elements['papel'].checked,
        plastico: form.elements['plastico'].checked,
        vidro: form.elements['vidro'].checked,
        metal: form.elements['metal'].checked,
        oleoCozinha: form.elements['oleoCozinha'].checked,
        pilhaBateria: form.elements['pilhaBateria'].checked,
        eletronico: form.elements['eletronico'].checked,
        roupa: form.elements['roupa'].checked,
        outros: form.elements['outros'].checked
    };
    fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(() => alert('Dados enviados com sucesso!'))
    .catch(() => alert('Erro ao enviar. Tente novamente.'));
});


window.addEventListener('scroll', function() 
{
    var header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

