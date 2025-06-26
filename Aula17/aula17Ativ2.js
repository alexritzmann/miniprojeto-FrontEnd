

function parOuImpar(num) {
    return new Promise((resolve, reject) => {
        if (num % 2 === 0) {
            resolve('Par');
        } else {
            reject('Impar');
        }
    })
}

function testar(){
    const num = 8;
    parOuImpar(num)
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => console.log('número de parâmetro foi: ' + num));
}



parOuImpar(10)
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => console.log('número de parâmetro foi: ' + num));

    