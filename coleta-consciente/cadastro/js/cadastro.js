document.getElementById('parceiroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nomeParceiro: document.getElementById('nomeParceiro').value,
        tipoParceiro: document.getElementById('tipoParceiro').value,
        responsavelParceiro: document.getElementById('responsavelParceiro').value,
        telResponsavel: document.getElementById('telResponsavel').value,
        emailResponsavel: document.getElementById('emailResponsavel').value,
        rua: document.getElementById('rua').value,
        numero: parseInt(document.getElementById('numero').value),
        bairro: document.getElementById('bairro').value,
        papel: document.querySelector('input[value="papel"]').checked,
        plastico: document.querySelector('input[value="plastico"]').checked,
        vidro: document.querySelector('input[value="vidro"]').checked,
        metal: document.querySelector('input[value="metal"]').checked,
        oleoCozinha: document.querySelector('input[value="oleoCozinha"]').checked,
        pilhaBateria: document.querySelector('input[value="pilhaBateria"]').checked,
        eletronico: document.querySelector('input[value="eletronico"]').checked,
        roupa: document.querySelector('input[value="roupa"]').checked,
        outros: document.querySelector('input[value="outros"]').checked
    };

    // Enviar dados para a API
    fetch('https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        window.alert('Dados enviados com sucesso!');
        document.getElementById('parceiroForm').reset();
    })
    .catch(error => {
        console.error('Erro:', error);
        window.alert('Ocorreu um erro ao enviar os dados.');
    });
});