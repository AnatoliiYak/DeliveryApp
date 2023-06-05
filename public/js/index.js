function getShops() {
    const shops = fetch('/shops') .then((response) => {
        return response.json();
      });
    return shops;
}

function getGoodsByShop(shopId) {
    const goods = fetch('/goods') .then((response) => {
        return response.json();
      });
    return goods.then((res)=>res.filter((el)=>el.shopId === shopId));
}

function showGoods(goods) {
    let goodsPlace =  document.querySelector('#goods');
    goodsPlace.innerHTML = '';
    goods.forEach((good) => {
        goodsPlace.innerHTML +=`
        <div class="good" data-id=${good.id}>
            <img src=${good.img}>
            <p>${good.name}</p>
            <button>Add to card</button>
        </div>`;
    })
}

getShops().then((res) => {
    document.querySelector('#shops ul').innerHTML='';
    res.forEach(element => {
        document.querySelector('#shops ul').innerHTML+=`<li class='but' data-id=${element.id}>${element.name}</li>`;
    });
}).then(()=> {
    document.querySelector('#goods').innerHTML = '';
    document.querySelectorAll('.but').forEach((btn)=>{
        btn.addEventListener('click', () => {
            const shId = btn.dataset.id;
            getGoodsByShop(shId).then((res)=> showGoods(res)).then(()=> {
                document.querySelectorAll('.good').forEach((good) => good.addEventListener('click',(e)=> {
                    if (e.target.tagName.toLowerCase()=='button') {
                        if (localStorage.getItem(good.dataset.id) === null) {
                            localStorage.setItem(good.dataset.id,1);
                        } else {
                            localStorage.setItem(good.dataset.id,parseInt(localStorage.getItem(good.dataset.id),10)+1);
                        }
                    }
                }));
            });
        });
    })});

