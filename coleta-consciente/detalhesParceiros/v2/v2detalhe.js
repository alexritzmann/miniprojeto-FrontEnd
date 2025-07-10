document.addEventListener('DOMContentLoaded', function() {
    const partnerDetails = document.getElementById('partnerDetails');
    
    function getIconClass(tipo) {
        const icones = {
            ECO: 'fa-solid fa-leaf',
            COO: 'fa-solid fa-recycle',
            PEV: 'fa-solid fa-box-open'
        };
        const tipoNormalizado = tipo?.substring(0, 3).toUpperCase();
        return icones[tipoNormalizado] || 'fa-solid fa-map-marker-alt';
    }

    function loadPartnerDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const partnerId = urlParams.get('id');
        
        if (!partnerId) {
            partnerDetails.innerHTML = '<div class="error">Parceiro não encontrado.</div>';
            return;
        }
        
        fetch(`https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros/${partnerId}`)
            .then(response => {
                if (!response.ok) throw new Error('Parceiro não encontrado');
                return response.json();
            })
            .then(partner => {
                const iconClass = getIconClass(partner.tipo);
                const date = new Date(partner.createdAt);
                const formattedDate = date.toLocaleDateString('pt-BR');
                
                partnerDetails.innerHTML = `
                    <div class="partner-detail-card">
                        <div class="detail-header">
                            <div class="partner-avatar large">
                                <i class="${iconClass}"></i>
                            </div>
                            <h1>${partner.nome}</h1>
                            <div class="partner-type">${partner.tipo}</div>
                        </div>
                        
                        <div class="detail-section">
                            <h2>Informações</h2>
                            <div class="detail-row">
                                <span class="detail-label">Bairro:</span>
                                <span class="detail-value">${partner.bairro}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Endereço:</span>
                                <span class="detail-value">${partner.endereco || 'Não informado'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Cadastrado em:</span>
                                <span class="detail-value">${formattedDate}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h2>Contato</h2>
                            <div class="detail-row">
                                <span class="detail-label">Telefone:</span>
                                <span class="detail-value">${partner.telefone || 'Não informado'}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Email:</span>
                                <span class="detail-value">${partner.email || 'Não informado'}</span>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Erro ao carregar detalhes:', error);
                partnerDetails.innerHTML = `
                    <div class="error">
                        <p>${error.message}</p>
                        <a href="index.html" class="button">Voltar para listagem</a>
                    </div>
                `;
            });
    }
    
    loadPartnerDetails();
});