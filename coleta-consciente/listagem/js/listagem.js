const emailUsuario = localStorage.getItem('emailUsuario');

if (!emailUsuario) {
  alert('Usuário não autenticado. Redirecionando para login.');
  window.location.href = '/coleta-consciente/login/login.html';
} else {
  document.getElementById('emailUsuario').textContent = emailUsuario;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('emailUsuario');
  window.location.href = '/coleta-consciente/login/login.html';
});

function tipoParceiroTexto(tipo) {
  const tipos = {
    ECO: 'Ecoponto',
    COO: 'Cooperativa',
    PEV: 'Ponto de Entrega Voluntária'
  };
  return tipos[tipo] || tipo;
}

function residuosAceitos(obj) {
  const nomes = {
    papel: 'Papel', plastico: 'Plástico', vidro: 'Vidro', metal: 'Metal',
    oleoCozinha: 'Óleo de cozinha', pilhaBateria: 'Pilhas e baterias',
    eletronico: 'Eletrônicos', roupa: 'Roupas', outros: 'Outros'
  };
  return Object.keys(nomes).filter(key => obj[key]).map(key => nomes[key]).join(', ') || 'Nenhum informado';
}

let parceiros = [];

function renderizarTabela(lista) {
  const tbody = document.querySelector('#parceirosTable tbody');
  tbody.innerHTML = '';

  lista.forEach(p => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', () => {
      window.location.href = `/coleta-consciente/detalhesParceiros/detalhe.html?id=${p.id}`;
    });

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
}

function filtrarParceiros(termo) {
  const termoLower = termo.toLowerCase().trim();
  if (termoLower === '') {
    renderizarTabela(parceiros);
  } else {
    const filtrados = parceiros.filter(p =>
      p.nomeParceiro.toLowerCase().includes(termoLower) ||
      p.bairro.toLowerCase().includes(termoLower)
    );
    renderizarTabela(filtrados);
  }
}

fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros')
  .then(resp => resp.json())
  .then(data => {
    parceiros = data;
    renderizarTabela(parceiros);
  })
  .catch(() => {
    document.getElementById('loading').textContent = 'Erro ao carregar parceiros. Tente recarregar a página.';
  });

// 🔍 Filtragem ao digitar
document.getElementById('searchInput').addEventListener('input', (event) => {
  filtrarParceiros(event.target.value);
});

// 🔘 Filtragem ao clicar no botão
document.getElementById('searchBtn').addEventListener('click', () => {
  const termo = document.getElementById('searchInput').value;
  filtrarParceiros(termo);
});
