axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common["Content-Type"]="application/json; charset=utf-8"
async function addProd(){
    let listBox=document.getElementById("list")
    let inputBox=document.getElementById("input")
    let prod=inputBox.querySelector("[type=text]")
    let money=inputBox.querySelector("[type=number]")
    if (prod.value&&money.value){
        let product=document.createElement("div")
        product.className="product"
        let id=document.createElement("div")
        id.className="id"
        let name=document.createElement("name")
        name.className="name"
        name.innerText=prod.value
        let price=document.createElement("price")
        price.className="price"
        price.innerText=money.value
        product.appendChild(id)
        product.appendChild(name)
        product.appendChild(price)
        axios.get("products/").then(function(res){
            let ids=res.data.map(x=>parseInt(x.id));
            if (ids.length!=0){
                id.innerText=Math.max(...ids)+1
            }
            else{
                id.innerText=1
            }
            let body={id:id.innerText,name:name.innerText,price:price.innerText}
            axios.post('products/',body)
        }).then(res=>listBox.appendChild(product))
        .catch(function(e){
            console.error(e.massage);notifyError()})
    }
}

function notifyError(){
    document.querySelector("[type=text]").value="seems like we ran into a problem";
}