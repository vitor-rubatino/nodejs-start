const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');

const app = express();

//Usado como se fosse um middleware
app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

/**
 * Body => Sempre que eu quiser enviar dados para  minh aplicação
 * Param => Parâmetros de rota /products/23123123123
 * Query => Fazem parte da rota mas não são obrigatórios /products?id=12312321132&value=123213123
 */


//POST ROUTE
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product);

    createProductFile();

    return res.json(products);
});

//GET ALL ROUTES
app.get('/products', (req, res) => {
    return res.json(products);
});

//GET PRODUCT WITH ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    return res.json(product);
})

//EDIT PRODUCT
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    productFile();

    return res.json({ message: 'Produto alterado com sucesso' });
});


app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    productFile();

    return res.json({ message: 'Produto removido com sucesso' });
})

function productFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Produto inserido com sucesso');
        }
    });
}

app.listen(4002, () => console.log('O servidor está rodando na porta 4002'));