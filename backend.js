const express = require("express");
const app = express();

const products = [
    {
        id: 1,
        name: "milk",
        price: 20
    }
    ,
    {
        id: 2,
        name: "egg",
        price: 10
    }
    ,
    {
        id: 3,
        name: "bread",
        price: 5
    }
];


app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method + ' ' + req.data);
    next();
}

app.get("/", (req, res) =>{

    res.send("hello");
});

app.get("/products/", (req, res) => {
    res.send(products);
})

app.get("/products/:id", (req, res) => {
    let id = req.params.id;
    for (let i = 0; i <= products.length; i++ ) {
        if (i === products.length) {
            res.send("Massage: Product Not Found");
            break;
        }
        if (products[i].id == id) {
            res.send(products[i]);
            break;
    }   
}});

app.post("/product", (req, res) => {
    products.push(req.body);
    res.send(req.body);
});

app.delete('/product/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id == req.params.id){
            products.splice(index, 1);
            res.send("The product with the ID of - " + req.params.id + " - deleted");
        }
    });
});


app.listen(3000);