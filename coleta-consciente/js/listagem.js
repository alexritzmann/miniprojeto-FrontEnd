

const emailUsuario = localStorage.getItem('emailUsuario');


if (!emailUsuario) 
{
    alert('Usuário não autenticado. Redirecionando para login.');
    window.location.href = '/coleta-consciente/login.html';
} else {
    document.getElementById('emailUsuario').textContent = emailUsuario;
}


document.getElementById('logoutBtn').addEventListener('click', () => 
{
    localStorage.removeItem('emailUsuario');
    window.location.href = '/coleta-consciente/login.html';
});


function tipoParceiroTexto(tipo) 
{
    const tipos = {ECO:'Ecoponto', COO:'Cooperativa', PEV:'Ponto de Entrega Voluntária'};
    return tipos[tipo] || tipo;
}


function residuosAceitos(obj) 
{
    const nomes = 
    {
        papel: 'Papel', plastico: 'Plástico', vidro: 'Vidro', metal: 'Metal',
        oleoCozinha: 'Óleo de cozinha', pilhaBateria: 'Pilhas e baterias',
        eletronico: 'Eletrônicos', roupa: 'Roupas', outros: 'Outros'
    };
    return Object.keys(nomes).filter(key => obj[key]).map(key => nomes[key]).join(', ') || 'Nenhum informado';
}

fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros')
.then(resp => resp.json())
.then(data => 
{
    const tbody = document.querySelector('#parceirosTable tbody');
    data.forEach(p => 
    {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.nomeParceiro}</td>
            <td>${tipoParceiroTexto(p.tipoParceiro)}</td>
            <td>${p.responsavelParceiro}</td>
            <td>${p.telResponsavel}</td>
            <td>${p.emailResponsavel}</td>
            <td>${p.rua}, ${p.numero} - ${p.bairro}</td>
            <td>${residuosAceitos(p)}</td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('loading').style.display = 'none';
    document.getElementById('parceirosTable').style.display = 'table';
})
.catch(() => 
{
    document.getElementById('loading').textContent = 'Erro ao carregar parceiros. Tente recarregar a página.';
});

