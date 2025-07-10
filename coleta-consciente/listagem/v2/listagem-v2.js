document.addEventListener('DOMContentLoaded', function() {
    const partnersContainer = document.getElementById('partnersContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    let allPartners = [];
    
    function getIconClass(tipo) {
        const icones = {
            ECO: 'fa-solid fa-leaf',
            COO: 'fa-solid fa-recycle',
            PEV: 'fa-solid fa-box-open'
        };
        const tipoNormalizado = tipo?.substring(0, 3).toUpperCase();
        return icones[tipoNormalizado] || 'fa-solid fa-map-marker-alt';
    }

    function loadPartners() {
        fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros')
            .then(response => response.json())
            .then(data => {
                allPartners = data;
                displayPartners(data);
            })
            .catch(error => {
                console.error('Erro ao carregar parceiros:', error);
                partnersContainer.innerHTML = '<div class="loading">Erro ao carregar parceiros. Tente novamente mais tarde.</div>';
            });
    }

    function displayPartners(partners) {
        if (partners.length === 0) {
            partnersContainer.innerHTML = '<div class="loading">Nenhum parceiro encontrado.</div>';
            return;
        }
        
        let html = '<div class="partners-grid">';
        
        partners.forEach(partner => {
            const iconClass = getIconClass(partner.tipo);
            const date = new Date(partner.createdAt);
            const formattedDate = date.toLocaleDateString('pt-BR');
            
            html += `
                <div class="partner-card" data-id="${partner.id}">
                    <div class="partner-avatar">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="partner-name">${partner.nome}</div>
                    <div class="partner-info">${partner.bairro}</div>
                    <div class="partner-info">${partner.tipo}</div>
                    <div class="partner-date">Cadastrado em: ${formattedDate}</div>
                </div>
            `;
        });
        
        html += '</div>';
        partnersContainer.innerHTML = html;
        
        document.querySelectorAll('.partner-card').forEach(card => {
            card.addEventListener('click', function() {
                const partnerId = this.getAttribute('data-id');
                window.location.href = `/coleta-consciente/detalhesParceiros/v2/v2detalhe.html?id=${partnerId}`;
            });
        });
    }
    
    function filterPartners() {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = allPartners.filter(partner => 
            partner.nome.toLowerCase().includes(searchTerm) || 
            partner.bairro.toLowerCase().includes(searchTerm)
        );
        displayPartners(filtered);
    }
    
    searchButton.addEventListener('click', filterPartners);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') filterPartners();
    });
    
    loadPartners();
});