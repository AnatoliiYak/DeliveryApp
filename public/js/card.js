document.querySelector('#goods').innerHTML = '';

function getGoodById(id) {
    const good = fetch(`/goods/${id}`).then((response) => {
        return response.json();
    });
    return good;
}



async function setContnet() {
    document.querySelector('#goods').innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const good = await getGoodById(localStorage.key(i));
        if (localStorage.getItem(localStorage.key(i)) != 0) {
            document.querySelector('#goods').innerHTML +=
                `<div class='good' data-id=${localStorage.key(i)}>
            <img src=${good.img}>
            <div>
                <p>${good.name}</p>
                <p>Price: ${good.price}</p>
            <input type='number' min='0' value='${localStorage.getItem(localStorage.key(i))}'>
             </div>
        </div>`;
        }
    }
}

async function getTotalPrice() {
    let sum = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const good = await getGoodById(localStorage.key(i));
        sum += good.price*localStorage.getItem(localStorage.key(i));
    }
    return sum;
}
async function updatePrice() {
    document.querySelector('footer p').innerHTML='Total price: ';
    let sum = await getTotalPrice();
    document.querySelector('footer p').innerHTML+=sum;
}

function refreshPage() {
    setContnet().then(() => {
        document.querySelectorAll('.good').forEach((el) => el.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'input') {
                localStorage.setItem(el.dataset.id, e.target.value);
                updatePrice();
                if (parseInt(e.target.value) === 0) {
                   refreshPage();
                }
            }
        }));
        updatePrice();
    });
}

refreshPage();

async function getAllGoodsWithCount() {
    let res = []
    for (let i = 0; i < localStorage.length; i++) {
        const good = await getGoodById(localStorage.key(i));
        good.count = localStorage.getItem(localStorage.key(i));
        res.push(good);
    }
    return res;
}

function subm() {
document.querySelector('footer button').addEventListener('click', async () => {
    let data = {
        name: document.querySelector('input[name=\'fname\']').value,
        email: document.querySelector('input[name=\'email\']').value,
        phone: document.querySelector('input[name=\'phone\']').value,
        adress: document.querySelector('input[name=\'address\']').value,
        goods: await getAllGoodsWithCount()
    }
    console.log(data);
    console.log(JSON.stringify(data));
    if (Object.values(data).some(el=>el === null || el === undefined || el ==='')) {
        alert('Wrond data');
    } else {
        fetch('/orders', {method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)}).then(() =>{
        alert('Your order is accepted');
        localStorage.clear();
        refreshPage();
        document.querySelectorAll('input').forEach((el)=>el.value='');
        }
        );
    }
}
);
}
subm();