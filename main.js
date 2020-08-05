axios.defaults.baseURL = "http://localhost:3000/products";
axios.defaults.headers.common["Content-Type"]="application/json; charset=utf-8"
document.onload=load()

function load(){
    axios.get('/').then(function(res){
        res.data.forEach(prod=>{
            let product=document.createElement("div")
            product.className="product"
            let id=document.createElement("div")
            id.className="id"
            id.innerText=prod.id
            let name=document.createElement("name")
            name.className="name"
            name.innerText=prod.name
            let price=document.createElement("price")
            price.className="price"
            price.innerText=prod.price
            let menu = document.createElement("div");
            menu.className = "menu";
            let del = document.createElement("button");
            del.className = "delete";
            del.innerText = "DELETE";
            del.setAttribute("onclick", "deleteItem(this)");
            let edit = document.createElement("button");
            edit.className = "edit";
            edit.innerText = "EDIT";
            edit.setAttribute("onclick", "editItem(this)");
            menu.appendChild(edit);
            menu.appendChild(del);
            product.appendChild(id)
            product.appendChild(name)
            product.appendChild(price)
            product.appendChild(menu);
            document.getElementById("list").appendChild(product)
        })
    })
}

function addProd(){
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
        let menu = document.createElement("div");
        menu.className = "menu";
        let del = document.createElement("button");
        del.className = "delete";
        del.innerText = "DELETE";
        del.setAttribute("onclick", "deleteItem(this)");
        let edit = document.createElement("button");
        edit.className = "edit";
        edit.innerText = "EDIT";
        edit.setAttribute("onclick", "editItem(this)");
        menu.appendChild(edit);
        menu.appendChild(del);
        product.appendChild(id)
        product.appendChild(name)
        product.appendChild(price)
        product.appendChild(menu);
        axios.get('/').then(function(res){
            let ids=res.data.map(x=>parseInt(x.id));
            if (ids.length!=0){
                id.innerText=Math.max(...ids)+1
            }
            else{
                id.innerText=1
            }
            let body={id:id.innerText,name:name.innerText,price:price.innerText}
            axios.post('/',body)
        }).then(res=>listBox.appendChild(product))
        .catch(function(e){
            console.error(e.massage);notifyError()})
    }
}

function deleteItem(button){
    let product=button.parentElement.parentElement
    let id=product.querySelector(".id").innerText
    axios.delete(`/${id}`).then(res=>product.remove()).catch(e=>{
        console.error(e.massage);
        notifyError()
    })
}

function editItem(button){
    let product=button.parentElement.parentElement
    let name=product.querySelector(".name")
    let price=product.querySelector(".price")
    let editName=document.createElement("input")
    editName.className="tempo-name"
    editName.value=name.innerText
    name.innerText=""
    name.appendChild(editName)
    let editPrice=document.createElement("input")
    editPrice.className="tempo-num"
    editPrice.type="number"
    editPrice.step="0.1"
    editPrice.value=price.innerText
    price.innerText=""
    price.appendChild(editPrice)
    button.setAttribute("onclick","submitEdit(this)")
    button.innerText="SUBMIT"
}

function submitEdit(button){
    let product=button.parentElement.parentElement
    let name=product.querySelector(".name")
    let price=product.querySelector(".price")
    let id=product.querySelector(".id")
    let body={
        id:id.innerText,
        name:name.querySelector(".tempo-name").value,
        price:price.querySelector(".tempo-num").value
    }
    axios.put(`/${id.innerText}`,body).then(function(res){
        name.innerHTML=res.data.name
        price.innerHTML=res.data.price
    }).catch(e=>{console.error(e.massage);
        notifyError()})
    button.setAttribute("onclick","editItem(this)")
    button.innerText="EDIT"
}

function notifyError(){
    document.querySelector("[type=text]").value="seems like we ran into a problem";
}