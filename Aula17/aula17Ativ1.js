
function sleep(ms) 
{
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function concluirProcesso() {
    await sleep(3000);
    console.log('Processo concluido');
}

concluirProcesso();
