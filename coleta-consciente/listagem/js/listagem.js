const apiUrl = 'https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros';
const cardsContainer = document.getElementById('cardsContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function getIcon(tipo) {
  const icons = {
    ECO: 'fa-leaf',
    COO: 'fa-recycle',
    PEV: 'fa-box-open'
  };
  return icons[tipo] || 'fa-map-marker-alt';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

function renderCards(parceiros) {
  cardsContainer.innerHTML = '';

  if (parceiros.length === 0) {
    cardsContainer.innerHTML = '<p>Nenhum parceiro encontrado.</p>';
    return;
  }

  parceiros.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="icon"><i class="fas ${getIcon(p.tipoParceiro)}"></i></div>
      <h3>${p.nomeParceiro}</h3>
      <p><strong>Bairro:</strong> ${p.bairro}</p>
      <p><strong>Data:</strong> ${p.createdAt ? formatDate(p.createdAt) : 'Não informada'}</p>
    `;

    card.addEventListener('click', () => {
      window.location.href = `/coleta-consciente/detalhesParceiros/detalhe.html?id=${p.id}`;
    });

    cardsContainer.appendChild(card);
  });
}

async function carregarParceiros() {
  try {
    const res = await fetch(apiUrl);
    const parceiros = await res.json();
    renderCards(parceiros);
  } catch (err) {
    console.error('Erro ao carregar parceiros:', err);
    cardsContainer.innerHTML = '<p>Erro ao carregar dados.</p>';
  }
}

searchBtn.addEventListener('click', async () => {
  const termo = searchInput.value.trim().toLowerCase();
  if (!termo) return carregarParceiros();

  try {
    const res = await fetch(apiUrl);
    const parceiros = await res.json();
    const filtrados = parceiros.filter(p =>
      p.nomeParceiro.toLowerCase().includes(termo) ||
      p.bairro.toLowerCase().includes(termo)
    );
    renderCards(filtrados);
  } catch (err) {
    console.error('Erro na pesquisa:', err);
  }
});

window.addEventListener('DOMContentLoaded', carregarParceiros);
