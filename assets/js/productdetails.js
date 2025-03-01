loading.style.display = "none"


const listImgCar = document.querySelector(".list__img-car"),
    itemImgCar = document.querySelectorAll(".item__img-car"),
    itemSelectImg = document.querySelectorAll(".item__select-img"),
    listFeatures = document.querySelector(".list__features"),
    topContentTitle = document.querySelector(".top__content-title h1"),
    setImgCar = document.querySelectorAll(".item__img-car img"),
    setSelectImg = document.querySelectorAll(".item__select-img img"),
    full__name = document.querySelector(".full__name"),
    e__mail = document.querySelector(".e__mail"),
    mobile__phone = document.querySelector(".mobile__phone"),
    address = document.querySelector(".address"),
    wInput = document.querySelectorAll(".w-input h1");
    const technicalDataSheet = document.querySelector(".technical__data-sheet"),
    listTechnicalDataSheet = document.querySelector(".list__technical-data-sheet"),
    iconRight = document.querySelector(".technical__data-sheet i");
let getData;
let getFeatures;
let arrFeatures;
let getTechnicalDataSheet;
let arrTechnicalDataSheet;
window.addEventListener('load', function () {
    getData = JSON.parse(localStorage.getItem("idProduct")),
        setPrice = document.querySelector(".features__title span");
    let price = formatPrice(Number(getData.price), "");
    let index = price.indexOf(".")
    setPrice.innerText = price.slice(0, index) + " ₫"
    topContentTitle.innerText = getData.name
    setImgCar[0].src = getData.thumbnail_1
    setImgCar[1].src = getData.thumbnail_2
    setSelectImg[0].src = getData.thumbnail_1
    setSelectImg[1].src = getData.thumbnail_2
    itemSelectImg.forEach((e, key) => {
        e.addEventListener("click", () => {
            itemImgactive = key
            loadImgSelect()
        })
    });
    getFeatures = getData.exterior
    arrFeatures = getFeatures.split(";")
    for (let i = 0; i < arrFeatures.length; i++) {
        let item = `
                    <li class="item__features">
                        <h3>${arrFeatures[i]}</h3>
                    </li>
                `;
        listFeatures.insertAdjacentHTML("beforeend", item)
    }
    getTechnicalDataSheet = getData.technical_data_sheet
    arrTechnicalDataSheet = getTechnicalDataSheet.split(";")
    for (let i = 0; i < arrTechnicalDataSheet.length; i++) {
        let item = `
                    <li class="item__technical-data-sheet">${arrTechnicalDataSheet[i]}</li>
                `;
        listTechnicalDataSheet.insertAdjacentHTML("beforeend", item)
    }
})

var itemImgactive = 0;
var lengthImg = itemImgCar.length - 1

function loadImgSelect() {
    let checkLeft = itemImgCar[itemImgactive].offsetLeft
    listImgCar.style.left = -checkLeft + 'px'

    let imgActive = document.querySelector(".list__select-img li.active")
    imgActive.classList.remove('active')

    itemSelectImg[itemImgactive].classList.add('active')
}
function formatPrice(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}

technicalDataSheet.addEventListener("click", () => {
    if (listTechnicalDataSheet.offsetHeight === 0) {

        technicalDataSheet.classList.add("technical__data-sheet-active")
        listTechnicalDataSheet.style.height = 632 + "px"
        listTechnicalDataSheet.style.opacity = 1
        listTechnicalDataSheet.style.padding = "24px 12px 36px"
        iconRight.style.rotate = 90 + "deg"

    } else {
        technicalDataSheet.classList.remove("technical__data-sheet-active")
        listTechnicalDataSheet.style.padding = "0px"
        listTechnicalDataSheet.style.height = 0 + "px"
        listTechnicalDataSheet.style.opacity = 0
        iconRight.style.rotate = 0 + "deg"
    }
})


const item__version = document.querySelectorAll(".item__version"),
    item__color = document.querySelectorAll(".item__color"),
    form = document.querySelector("form");

var version = ''
var color = ''

item__version.forEach((e, key) => {
    e.onclick = function () {
        let itemActive = document.querySelector(".list__version li.active")
        if (itemActive != null) {
            itemActive.classList.remove("active")
        }
        e.classList.add("active")
        version = e.innerText
    }
});
item__color.forEach((e, key) => {
    e.onclick = function () {
        let itemActive = document.querySelector(".list__color li.active")
        if (itemActive != null) {
            itemActive.classList.remove("active")
        }
        e.classList.add("active")
        color = e.getAttribute("li-color")
    }
});

full__name.addEventListener("input", function () {
    console.log(full__name.value)
})

function changeInput(e) {
    wInput[e].innerText = ''
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePhone(phone) {
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}

var cF = true;
var fullNameCheck = true;
var emailCheck = true;
var phoneCheck = true;
var addressCheck = true;

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (full__name.value.replace(/\s+$/, '') === '') {
        wInput[0].innerText = "Please fill in this field *"
        fullNameCheck = false;
    } else {
        wInput[0].innerText = ""
        fullNameCheck = true;
    }
    if (e__mail.value.replace(/\s+$/, '') === '') {
        wInput[1].innerText = "Please fill in this field *"
        emailCheck = false;
    } else {
        wInput[1].innerText = ""
        emailCheck = true;

    }
    if (mobile__phone.value.replace(/\s+$/, '') === '') {
        wInput[2].innerText = "Please fill in this field *"
        phoneCheck = false;
    } else {
        wInput[2].innerText = ""
        phoneCheck = true;
    }
    if (address.value.replace(/\s+$/, '') === '') {
        wInput[3].innerText = "Please fill in this field *"
        addressCheck = false;
    } else {
        wInput[3].innerText = ""
        addressCheck = true;
    }

    if (version != '' && color != '' && fullNameCheck && emailCheck && phoneCheck && addressCheck) {
        if (validateEmail(e__mail.value)) {
            wInput[1].innerText = ""
            emailCheck = true
        } else {
            wInput[1].innerText = "Invalid email !"
            emailCheck = false
        }
        if (validatePhone(mobile__phone.value) && mobile__phone.value.length == 10) {
            wInput[2].innerText = ""
            phoneCheck = true
        } else {
            wInput[2].innerText = "Invalid phone !"
            phoneCheck = false
        }
        if (phoneCheck && emailCheck) {
            alert('Success !')
        }
    } else {
        if (version === '' && color === '') {
            alert("Please select product information!")
            return;
        }
        if (version === '') {
            alert("Please select the version of the product!")

        }
        if (color === '') {
            alert("Please choose the color of the product!")
        }
    }
})

const itemCart = document.querySelector(".item__header-cart");

if (itemCart != null) {
    itemCart.addEventListener("click", () => {
        window.open('./cart.html', "_self")
    })
}

