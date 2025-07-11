const urlParams = new URLSearchParams(window.location.search);
const parceiroId = urlParams.get('id');
const container = document.getElementById('detalhesContainer');

function tipoTexto(tipo) {
  const tipos = {
    ECO: 'Ecoponto',
    COO: 'Cooperativa',
    PEV: 'Ponto de Entrega Voluntária'
  };
  return tipos[tipo] || tipo;
}

function formatarResiduos(residuos) {
  const nomes = {
    papel: 'Papel', plastico: 'Plástico', vidro: 'Vidro', metal: 'Metal',
    oleoCozinha: 'Óleo de cozinha', pilhaBateria: 'Pilhas e baterias',
    eletronico: 'Eletrônicos', roupa: 'Roupas', outros: 'Outros'
  };
  return Object.keys(nomes)
    .filter(key => residuos[key])
    .map(key => nomes[key])
    .join(', ') || 'Nenhum informado';
}

function tratar(valor) {
  return valor === undefined || valor === null || valor === '' ? 'Indefinido' : valor;
}

function formatarData(dataISO) {
  return dataISO ? new Date(dataISO).toLocaleDateString('pt-BR') : 'Indefinido';
}

function getIconClass(tipo) {
  const icones = {
    ECO: 'fa-solid fa-leaf',        // Ecoponto 🌿
    COO: 'fa-solid fa-recycle',     // Cooperativa ♻️
    PEV: 'fa-solid fa-box-open'     // PEV 📦
  };
  return icones[tipo] || 'fa-map-marker-alt';
}

fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${parceiroId}`)
  .then(resp => resp.json())
  .then(p => {
    container.innerHTML = `
      <div class="icon-container">
        <i class="fas ${getIconClass(p.tipoParceiro)}"></i>
      </div>
      <h2>${tratar(p.nomeParceiro)}</h2>
      <p><strong>Tipo:</strong> ${tratar(tipoTexto(p.tipoParceiro))}</p>
      <p><strong>Data de Cadastro:</strong> ${formatarData(p.createdAt)}</p>
      <p><strong>Responsável:</strong> ${tratar(p.responsavelParceiro)}</p>
      <p><strong>Telefone:</strong> ${tratar(p.telResponsavel)}</p>
      <p><strong>Email:</strong> ${tratar(p.emailResponsavel)}</p>
      <p><strong>Endereço:</strong> Rua ${tratar(p.rua)}, Nº ${tratar(p.numero)}, Bairro ${tratar(p.bairro)}</p>
      <p><strong>Resíduos Aceitos:</strong> ${formatarResiduos(p)}</p>
    `;

    // Folhas subindo com efeito visual
    for (let i = 0; i < 18; i++) {  // mais folhas (18)
      const folha = document.createElement('i');
      folha.className = 'fas fa-leaf folha-subindo';
      folha.style.left = `${Math.random() * 100}%`;
      folha.style.animationDelay = `${Math.random() * 10}s`;
      folha.style.fontSize = `${Math.random() * 18 + 22}px`; // tamanhos maiores (22px a 40px)
      container.appendChild(folha);
    }

  })
  .catch(() => {
    container.innerHTML = '<p>Erro ao carregar os dados do parceiro. Tente novamente.</p>';
  });
