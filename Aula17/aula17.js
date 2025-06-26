
const varPromise = new Promise ((resolve, reject) => {
    //..
    resolve('Deu tudo ok');
    //.. ou pode
    reject('Não deu ok');
});

function funcaoPromisse()
{
    varPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    });
}

funcaoPromisse();


async function exemploAsyncAwait()
{
    const msg =  await varPromise;
    console.log(msg);
}

exemploAsyncAwait();
