const listBanner = document.querySelector(".list__banner"),
    itemBanner = document.querySelectorAll(".item__banner"),
    itemDot = document.querySelectorAll(".item__dot"),
    btnNext = document.querySelector("#btn__next"),
    btnPrev = document.querySelector("#btn__prev"),
    listCar = document.querySelector(".list__car"),
    sale = document.querySelector(".item__model span");

var itemActive = 0
var lengthBanner = itemBanner.length - 1

var checkSaleEnd = true;
var min = 30;
var second = 0;

if (sale != null) {
    let saleCar = setInterval(function () {

        second--;
        if (second < 0) {
            second = 59
            min--
        }
        if (second < 10) {
            sale.innerText = min + ":0" + second
        } else {
            sale.innerText = min + ":" + second
        }
        if (min < 0) {
            sale.innerText = "END"
            checkSaleEnd = false;
            clearInterval(saleCar, 0)
        }
    }, 1000)
}

function formatPrice(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}

btnNext.addEventListener("click", () => {
    if (itemActive + 1 > lengthBanner) {
        itemActive = 0
    } else {
        itemActive++
    }
    loadSliderBanner()
})
btnPrev.addEventListener("click", () => {
    if (itemActive - 1 < 0) {
        itemActive = lengthBanner
    } else {
        itemActive--
    }
    loadSliderBanner()
})
var autoSlider = setInterval(function () {
    btnNext.click()
}, 5000);
function loadSliderBanner() {
    let checkLeft = itemBanner[itemActive].offsetLeft
    listBanner.style.left = -checkLeft + 'px'

    let itemBannerActive = document.querySelector(".list_dot li.active")
    itemBannerActive.classList.remove('active')

    itemDot[itemActive].classList.add('active')
    clearInterval(autoSlider)
    autoSlider = setInterval(function () {
        btnNext.click()
    }, 5000);
}
itemDot.forEach((item, key) => {
    item.addEventListener("click", () => {
        itemActive = key;
        loadSliderBanner()
    })
})
function fillCar(arrCarr) {
    for (let i = 0; i < arrCarr.length; i++) {
        let price = formatPrice(Number(arrCarr[i].price), "");
        let index = price.indexOf(".")
        let itemTag = `                    
          <li class="item__car">
              <div onmousemove="onmousemoveCar(this)" onmouseleave="onmouseleaveCar(this)" class="w-item__car" li-index="${i}">
                  <h3 class="car__name">${arrCarr[i].name}</h3>
                  <h5 class="car__price">${price.slice(0, index) + " ₫"}</h5>
                  <img class="car__thumbnail" src="${arrCarr[i].thumbnail_1}" alt="">
                  <div class="item__car-moreinf">
                      <ul class="list__moreinf">
                          <li class="item__moreinf">
                              <i class="fa-solid fa-book"></i>
                              <h3>Learn more</h3>
                          </li>
                          <li onclick="productDetailsClick(this)" class="item__moreinf product__details" li-index="${i}">
                              <i class="fa-solid fa-sliders"></i>
                              <h3>Configure your car</h3>
                          </li>
                          <li class="item__moreinf">
                              <i class="fa-solid fa-cart-shopping"></i>
                              <h3>Find available cars</h3>
                          </li>
                          <li onclick="clickAddToCart(this)" class="item__moreinf add__to-cart" li-index="${i}">
                              <i class="fa-solid fa-cart-plus"></i>
                              <h3>Add to Cart</h3>
                          </li>
                      </ul>
                  </div>
              </div>
          </li>`
        listCar.insertAdjacentHTML("beforeend", itemTag);
    }
}
loading.style.display = "none"
fillCar(list_carSedan)
/* <div class="flash__sale"><i class="fa-solid fa-fire"></i>  Flash sale</div> */


// const wItem__car = document.querySelectorAll(".w-item__car");

// var randomSale = Math.floor(Math.random() * 6);
// wItem__car[randomSale].insertAdjacentHTML("afterbegin",`<div class="flash__sale"><i class="fa-solid fa-fire"></i>  Flash sale -10%</div>`)


var checkArrFill = 0;
const itemBodyType = document.querySelectorAll(".item__bodytype");

for (let i = 0; i < itemBodyType.length; i++) {
    itemBodyType[i].addEventListener("click", () => {
        let itemBodyTypeActive = document.querySelector(".list__bodytype li.active")
        listCar.innerHTML = ''
        itemBodyTypeActive.classList.remove("active")
        itemBodyType[i].classList.add("active")

        let getArrCarr = Number(itemBodyType[i].getAttribute("li-list"));
        switch (getArrCarr) {
            case 1:
                fillCar(list_carSedan);
                checkArrFill = 0;
                break;
            case 2:
                fillCar(list_carSUVs);
                checkArrFill = 1;
                break;
            case 3: break;
            case 4: break;
        }
    })
}




var checkBodyType = 1;

const itemCarMoreinf = document.querySelectorAll(".item__car-moreinf"),
    carThumbnail = document.querySelectorAll(".car__thumbnail"),
    carName = document.querySelectorAll(".car__name"),
    carPrice = document.querySelectorAll(".car__price"),
    wItemCar = document.querySelectorAll(".w-item__car"),
    addToCart = document.querySelectorAll(".add__to-cart"),
    productDetails = document.querySelectorAll(".product__details"),
    cartLeftQuantity = document.querySelector(".cart__left-quantity");

// for (let i = 0; i < wItemCar.length; i++) {
//     let index = wItemCar[i].getAttribute("li-index")
//     wItemCar[i].onmousemove = function () {
//         itemCarMoreinf[index].style.bottom = -157 + "px"
//         itemCarMoreinf[index].style.opacity = 1
//         itemCarMoreinf[index].style.zIndex = 100;
//         carThumbnail[index].src = list_carSedan[index].thumbnail_2
//     }
//     wItemCar[i].onmouseleave = function () {
//         itemCarMoreinf[index].style.bottom = -107 + "px"
//         itemCarMoreinf[index].style.opacity = 0
//         itemCarMoreinf[index].style.zIndex = -100;
//         carThumbnail[index].src = list_carSedan[index].thumbnail_1
//     }
// }
function onmousemoveCar(e) {
    let index = e.getAttribute("li-index")
    e.querySelector(".item__car-moreinf").style.bottom = -157 + "px"
    e.querySelector(".item__car-moreinf").style.opacity = 1
    e.querySelector(".item__car-moreinf").style.zIndex = 100;
    if (checkArrFill == 0) {
        e.querySelector(".car__thumbnail").src = list_carSedan[index].thumbnail_2
    } else {
        e.querySelector(".car__thumbnail").src = list_carSUVs[index].thumbnail_2
    }
}
function onmouseleaveCar(e) {
    let index = e.getAttribute("li-index")
    e.querySelector(".item__car-moreinf").style.bottom = -107 + "px"
    e.querySelector(".item__car-moreinf").style.opacity = 0
    e.querySelector(".item__car-moreinf").style.zIndex = -100;
    if (checkArrFill == 0) {
        e.querySelector(".car__thumbnail").src = list_carSedan[index].thumbnail_1
    } else {
        e.querySelector(".car__thumbnail").src = list_carSUVs[index].thumbnail_1
    }
}


var arrCarr = []
// arrCarr.push(list_carSedan[0])
// arrCarr.push(list_carSedan[1])


// for (let i = 0; i < productDetails.length; i++) {
//     productDetails[i].addEventListener("click", () => {

//         localStorage.setItem("idProduct", JSON.stringify(list_carSedan[i]));

//         window.open("./product_details.html", "_self")
//     })
// }

function productDetailsClick(e) {
    let index = e.getAttribute("li-index");
    if (checkArrFill == 0) {
        localStorage.setItem("idProduct", JSON.stringify(list_carSedan[index]))
    } else {
        localStorage.setItem("idProduct", JSON.stringify(list_carSUVs[index]))
    }
    window.open("./product_details.html", "_self")
}



var countLoad = 10;
for (let i = 0; i < countLoad; i++) {
    let e = document.createElement("div")
    e.classList.add('item__loading')
    e.style.setProperty('--time', (i * 0.2) + "s")
    loading.appendChild(e)
}

const ip__search = document.querySelector(".ip__search")
let indexSetPlace;
let arrPlaceholder = [];
let placeholderIp = "Your search term . . .          ";
let startPlaceholder = "";
let endPlaceholder = "";
let checkPlaceholderIp = 0;
const lengthPlace = placeholderIp.length;


function setPlaceholder() {
    if (checkPlaceholderIp == 0) {
        startPlaceholder = placeholderIp.slice(0, placeholderIp.length - 1);
        placeholderIp = startPlaceholder;
        if (arrPlaceholder.length == 0) {
            arrPlaceholder.push("Your search term . . .          ")
        }
        arrPlaceholder.push(startPlaceholder)
        ip__search.placeholder = placeholderIp;
        if (placeholderIp.length == 0) {
            checkPlaceholderIp = 1;
        }
    }
    if (checkPlaceholderIp == 1) {
        indexSetPlace = arrPlaceholder.length - 1;
        placeholderIp = arrPlaceholder[indexSetPlace];
        arrPlaceholder.pop()
        ip__search.placeholder = placeholderIp;

        if (placeholderIp.length == lengthPlace) {
            checkPlaceholderIp = 0;
        }
    }

}
setInterval(setPlaceholder, 70)

const itemCart = document.querySelector(".item__header-cart");

if (itemCart != null) {
    itemCart.addEventListener("click", () => {
        window.open('./cart.html', "_self")
    })
}


const itemSubContent = document.querySelectorAll(".item__sub-content");
itemSubContent.forEach(item => {
    item.onmousemove = function () {

    }
});
const screenGetPosition = document.querySelector('.screen__get-position')
var bottomMouse = 0;
var leftMouse = 0;
document.addEventListener("mousemove", function () {
    bottomMouse = event.clientY
    leftMouse = event.clientX
})


const contentLeftTitle = document.querySelector(".main__content-left-title"),
    list__bodytype = document.querySelector(".list__bodytype"),
    iconLeftTitle = document.querySelector(".main__content-left-title i");

if (contentLeftTitle != null) {
    contentLeftTitle.addEventListener("click", () => {
        if (list__bodytype.offsetHeight === 0) {
            list__bodytype.style.height = 200 + "px"
            list__bodytype.style.opacity = 1
            iconLeftTitle.style.rotate = 90 + "deg"
        } else {
            list__bodytype.style.height = 0 + "px"
            list__bodytype.style.opacity = 0
            iconLeftTitle.style.rotate = 0 + "deg"

        }
    })
}

// addToCart.forEach((element,index) => {
//     element.addEventListener("click", function(){

//         let getBottomItem = carThumbnail[index].getBoundingClientRect().bottom
//         let getLeftItem = carThumbnail[index].getBoundingClientRect().left
//         let imgProduct = document.createElement("img")


//         imgProduct.src = list_carSedan[index].thumbnail_2
//         imgProduct.style.position = "fixed"
//         imgProduct.style.width = 230 + "px"
//         imgProduct.style.height = 170 + "px"
//         imgProduct.style.objectFit = "contain"
//         imgProduct.style.bottom = getBottomItem + "px";
//         imgProduct.style.left = getLeftItem + "px";
//         document.documentElement.style.cssText = `
//         --bottomFrom: ${getBottomItem}px;
//         --leftFrom: ${getLeftItem}px;
//         --bottomTo: ${24}px;
//         --leftTo: ${24}px;
//         `
//         imgProduct.style.animation = "addToCart 1s ease-in"
//         document.body.appendChild(imgProduct)


//         arrCarr.push(list_carSedan[index])
//         cartLeftQuantity.innerHTML = arrCarr.length
//         setTimeout(function(){
//             imgProduct.remove()
//         },1000)
//     })
// });

function clickAddToCart(e) {
    let index = Number(e.getAttribute("li-index"));
    const itemCarMoreinf = document.querySelectorAll(".w-item__car");
    const carThumbnail = itemCarMoreinf[index].querySelector(".car__thumbnail");


    let getBottomItem = carThumbnail.getBoundingClientRect().bottom
    let getLeftItem = carThumbnail.getBoundingClientRect().left
    let imgProduct = document.createElement("img")

    if (checkArrFill == 0) {
        imgProduct.src = list_carSedan[index].thumbnail_2
    } else {
        imgProduct.src = list_carSUVs[index].thumbnail_2
    }
    imgProduct.style.position = "fixed"
    imgProduct.style.width = 230 + "px"
    imgProduct.style.height = 170 + "px"
    imgProduct.style.objectFit = "contain"
    imgProduct.style.bottom = getBottomItem + "px";
    imgProduct.style.left = getLeftItem + "px";
    document.documentElement.style.cssText = `
    --bottomFrom: ${getBottomItem}px;
    --leftFrom: ${getLeftItem}px;
    --bottomTo: ${24}px;
    --leftTo: ${24}px;
    `
    imgProduct.style.animation = "addToCart 1s ease-in"
    document.body.appendChild(imgProduct)

    if (checkArrFill == 0) {
        arrCarr.push(list_carSedan[index])
    } else {
        arrCarr.push(list_carSUVs[index])
    }

    cartLeftQuantity.innerHTML = arrCarr.length
    setTimeout(function () {
        imgProduct.remove()
    }, 1000)
    fillCarCart(arrCarr)
}


let checkSale = setInterval(function () {
    const carPrice = document.querySelectorAll(".car__price");
    let price;
    let priceDel;
    if (checkSaleEnd) {
        carPrice.forEach((element, key) => {
            if (checkArrFill === 0) {
                price = formatPrice(Number(list_carSedan[key].price), "");
                priceDel = formatPrice(Number(list_carSedan[key].price * 0.95), "");
            } else {
                price = formatPrice(Number(list_carSUVs[key].price), "");
                priceDel = formatPrice(Number(list_carSUVs[key].price * 0.95), "");
            }
            let index = price.indexOf(".")
            let text = `<del style="margin-right:12px;color:red;">${price.slice(0, index) + " ₫"}</del>${priceDel.slice(0, index) + " ₫"}`
            carPrice[key].innerHTML = text;
        });
    } else {
        carPrice.forEach((element, key) => {
            price = formatPrice(Number(list_carSedan[key].price), "");
            let index = price.indexOf(".")
            element.innerHTML = price.slice(0, index) + " ₫";
            clearInterval(checkSale, 0)
        });
    }
}, 1000)
var sum = 0;


const listItemCart = document.querySelector(".list__item-cart"),
      cart__left = document.querySelector(".cart__left"),
      show__all = document.querySelector(".show__all span");

function getTotalAmount(arr) {
    let showQuantity = document.querySelectorAll(".show__quantity");
    for (let i = 0; i < arr.length; i++) {
        let getQuantity = Number(showQuantity[i].innerText)
        sum += Number(getQuantity) * Number(arr[i].price)
        let price = formatPrice(sum, "");
        let indexS = price.indexOf(".")
        show__all.innerText = price.slice(0, indexS) + " ₫"
    }
    getSum = sum
    sum = 0;
}


function fillCarCart(arr) {
    listItemCart.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let price = formatPrice(Number(arr[i].price), "");
        let index = price.indexOf(".")
        let itemTag = `                    
            <li onClick="productDetailsClick(this)" class="item__show-cart">
                <h3 class="stt">${i + 1}</h3>
                <img class="img__cart" src="${arr[i].thumbnail_1}" alt="">
                <h3 class="name__pro"> ${arr[i].name}</h3>
                <h3 class="price__pro"> ${price.slice(0, index) + " ₫"}</h3>
                <div class="item__car-cart-quantity">
                <button onclick="nextNumber(this,2)" class="prev__quantity" btn-index="${i}">-</button>
                <div class="show__quantity">1</div>
                <button onclick="nextNumber(this,1)" class="next__quantity" btn-index="${i}">+</button>
            </div>
            </li>`
        listItemCart.insertAdjacentHTML("beforeend", itemTag);
    }
    getTotalAmount(arrCarr)
}
fillCarCart(arrCarr)
getTotalAmount(arrCarr)

const hoverShowCart = document.querySelector(".hover__show-cart")
function moveCart(e) {
    hoverShowCart.classList.add("activeCart")
}
function leaveCart(e){
    hoverShowCart.classList.remove("activeCart")
}
function nextNumber(e,type) {
    let showQuantity = document.querySelectorAll(".show__quantity");

    let index = e.getAttribute("btn-index")
    let value = showQuantity[index].innerText
    if (type === 1) {
        if (Number(value) + 1 >= 10) {
            value = 9
        }
        value = Number(value) + 1
        showQuantity[index].innerText = value
    } else {
        if (Number(value) - 1 <= 0) {
            value = 1
        }
        value = Number(value) - 1;
        showQuantity[index].innerText = value
    }
    let price = formatPrice(sum, "");
    let indexS = price.indexOf(".")
    show__all.innerText = price.slice(0, indexS) + " ₫"
    getTotalAmount(arrCarr)
}
function prevNumber(e) {

}
const btn__order = document.querySelector(".btn__order")

btn__order.addEventListener("click", ()=>{
    window.open("./cart.html", "_self")
})