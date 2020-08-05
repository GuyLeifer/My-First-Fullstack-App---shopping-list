const express = require("express");
const app = express();

const products = [

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
        }
        if (products[i].id == id) {
            res.send(products[i]);
            break;
    }   
}});

app.post("/products", (req, res) => {
    products.push(req.body);
    res.send(req.body);
});

app.delete('/products/:id', (req, res) =>{
    let maybe = false;
    products.forEach((product, index) =>{
        
        if(product.id == req.params.id){
            maybe = true;
            products.splice(index, 1);
            res.send(products);
            // res.send("The product with the ID of - " + req.params.id + " - has been deleted");
        }    
    });
    if (maybe === false) {
        res.send("The product with the ID of - " + req.params.id + " - has been deleted");
    }  
});

app.put('/products/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id == req.params.id){
            products[index] = req.body;
            res.send(req.body);
        }
    });
});


app.listen(3000);