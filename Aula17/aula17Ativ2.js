

function soma(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    })
};

soma(1, 2)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

