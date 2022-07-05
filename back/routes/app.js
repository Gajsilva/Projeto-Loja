const express= require ("express");
const { randomUUID } = require("crypto"); 
const { request } = require("http");
const { response } = require("express");

const app = express();

app.use(express.json());

const produtos = [];


app.post("/produtos", (request, response) => {
    
    const {name, price} = request.body;

    const produto = {
        name,
        price,
        id: randomUUID(),
    };

    produtos.push(produto);


    return response.json(produto);

});

app.get("/produtos", (request, response) => {
    return response.json(produtos)
});

app.get("/produtos/:id", (request, response) => {
    const { id } = request.params;
    const produto = produtos.find(produto => produto.id === id);
    return response.json(produto);
})

app.put("/produtos/:id", (request, response) =>{
    const {id} = request.params;
    const {name, price} = request.body;

    const produtoIndex = produtos.findIndex( produto => produto.id === id);
    produto[produtoIndex] = {
        ...produtos[produtoIndex],
        name,
        price,
    }

    return response.json({message: "Produto alterado"})
})

app.delete("/produtos/:id", (request, response) => {
    const { id } = request.params;

    const produtoIndex = produtos.findIndex( produto => produto.id === id);

    produtos.splice(produtoIndex, 1);

    return response.json ({message: "Produto removido"})
})

app.listen(4001)