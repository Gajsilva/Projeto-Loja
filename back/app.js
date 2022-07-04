const express= require ("express");
const app = express();


const produtos = [];


app.post("/produtos", (request, response) => {
    const body = request.body;

    console.log(body)
});


app.listen(4001)