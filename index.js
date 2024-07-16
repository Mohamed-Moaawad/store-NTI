let inputSearch = document.querySelector('.input-search')
let btnSearch = document.getElementById('btn-search')
let selectCat = document.querySelector('.select-cat')
let selectSort = document.querySelector('.select-sort')
let listCart = document.querySelector('.list-cart')


var allCart = []

//============== Get All Data From API ==================
const allData = []

const getData = async()=>{
    const res = await fetch(`https://fakestoreapi.com/products?limit=8&_limit=10`)
    const data = await res.json()
    allData.push(data)
    showData(data);

}
getData()

//============== Get Data by Search ==================
btnSearch.addEventListener('click', async(e)=>{
    e.preventDefault()
    const res = await fetch(`https://fakestoreapi.com/products/category/${inputSearch.value}`)
    const data = await res.json()
    showData(data)
})


//=============== sort data by category ============
selectCat.addEventListener('change', async(e)=>{
    if(e.target.value === 'all'){
        const res =  await fetch(`https://fakestoreapi.com/products`)
        const data = await res.json()
        showData(data)
    }else{
        const res =  await fetch(`https://fakestoreapi.com/products/category/${e.target.value}`)
        const data = await res.json()
        showData(data)
    }
})

//=============== sort data price and asc =================
selectSort.addEventListener('change', async(e)=>{
    if(e.target.value === 'Z'){
        const res = await fetch(`https://fakestoreapi.com/products?sort=desc`);
        const data = await res.json();
        showData(data)
    }else if(e.target.value === 'A'){
        const res = await fetch(`https://fakestoreapi.com/products?sort=asc`);
        const data = await res.json();
        showData(data)
    }
})


//=============== Function Show Data UI  ================
const showData = (data)=>{
    const productUI = data.map((item)=>{
        return(
        `<div key="${item.id}" class="product">
            <div class="img">
                <img src=${item.image} alt="product image">
            </div>
            <p>${item.title}</p>
            <span>$ ${item.price}</span>
            <button onclick="addToCart(${item.id})">add to cart</button>
        </div>`
    )})
    
    const products = document.querySelector('.products')
    products.innerHTML = productUI
}
showData()


//================== Function add to cart =================

async function addToCart(id){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()

    if(allCart.length < 5){
        allCart.push(data)
        console.log(allCart.length);
        showCart()

        window.scrollTo(0,0)

        getQuantity()
        getPrice()

    }else{
        alert('The maximum is 5 products')
    }

    // const findID = allCart.find((id)=> id.id === data.id)
    // if(findID){
    //     console.log('yes');
    // }else{
    //     console.log('no');
    // }
    
}

// ==================== show Cart =================
function showCart(){
    const proList = allCart.map((item)=>{
        return `
            <li>
                ${item.title.slice(1, 20)} - $${item.price} - <button onclick="deleteFromCart(${item.id})">remove</button>
            </li>
        `
    }).join('')
    //     const productList = `
    //     <li>
    //         ${data.title.slice(1, 20)} - $${data.price} - <button onclick="deleteFromCart(${data.id})">remove</button>
    //     </li>
    // `

    listCart.innerHTML = proList
}


//================== delete from cart =======================
function deleteFromCart(id){
    const newCart = allCart.filter((el)=> el.id !== id)
    allCart = newCart
    showCart()
    getQuantity()
    getPrice()
}   


//==================== Function Get Total Quantity ==================
function getQuantity(){
    const quantity = document.querySelector('.totalQuantity')
    quantity.innerHTML = allCart.length
}

// ================= Function Get Total Price =================
function getPrice(){
    const total = allCart.reduce((acc, cur)=>{
        return acc + cur.price
    },0)
    const totalPrice = document.querySelector('.totalPrice')
    totalPrice.innerHTML = total.toFixed(2)

}


