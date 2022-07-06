
const express= require ("express");
const { randomUUID } = require("crypto");
const  fs  = require("fs");

const app = express();

app.use(express.json());

let produtos = [];

fs.readFile("produtos.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err)
    } else {
        produtos = JSON.parse(data);
    }
});

app.post("/produtos", (request, response) => {
    
    const {name, price} = request.body;

    const produto = {
        name,
        price,
        id: randomUUID(),
    };

    produtos.push(produto);

    fs.writeFile ("produtos.json",JSON.stringify(produtos), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Produto inserido");
        }
    });

    

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