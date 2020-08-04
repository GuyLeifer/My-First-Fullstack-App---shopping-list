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
];


app.use(express.json());

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



app.listen(3000);