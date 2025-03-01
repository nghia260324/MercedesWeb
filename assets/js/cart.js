const loading = document.querySelector("#loading");


var sum = 0;
var getSum = 0;
const numericalOrder = document.querySelectorAll(".numerical__order"),
      carThumbnail = document.querySelectorAll(".car__thumbnail"),
      carName = document.querySelectorAll(".car__name"),
      carPrice = document.querySelectorAll(".car__price"),
      showTotalAmount = document.querySelector(".show-total__amount"),
      listCart = document.querySelector(".list__car-cart"),
      itemCart = document.querySelectorAll(".item__car-cart")
      btnOrder = document.querySelector(".btn__order");
      
      
function formatPrice(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}

for (let i = 0; i < numericalOrder.length; i++) {
    numericalOrder[i].innerText = i
    carThumbnail[i].src = cart[i].thumbnail_1

    let price = formatPrice(Number(cart[i].price), "");
    let index = price.indexOf(".")
    carPrice[i].innerText = price.slice(0, index) + " ₫";
}
loading.style.display = "none"

const btnNextQ = document.querySelectorAll(".next__quantity"),
      btnPrevQ = document.querySelectorAll(".prev__quantity"),
      showQuantity = document.querySelectorAll(".show__quantity");


btnNextQ.forEach(e => {
    e.addEventListener("click", () => {
        nextQuantity(e, 1)
    })
});
btnPrevQ.forEach(e => {
    e.addEventListener("click", () => {
        nextQuantity(e, 2)
    })
});
function getTotalAmount() {
    for (let i = 0; i < cart.length; i++) {
        let getQuantity = Number(showQuantity[i].innerText)
        sum += Number(getQuantity) * Number(cart[i].price)
        let price = formatPrice(sum, "");
        let indexS = price.indexOf(".")
        showTotalAmount.innerText = price.slice(0, indexS) + " ₫"
    }
    getSum = sum
    sum = 0;
}
getTotalAmount(itemCart)
function nextQuantity(e, type) {
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
    showTotalAmount.innerText = price.slice(0, indexS) + " ₫"
    getTotalAmount()
}
btnOrder.addEventListener("click", ()=> {

    if (getSum > 0) {
        alert("Success !")
    } else {
        alert("Please select the quantity of products you want to purchase !")
    }
})
