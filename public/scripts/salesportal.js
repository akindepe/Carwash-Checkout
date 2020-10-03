class Checkout {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  static servicesPaid = [];
}
const openSideNav = document.getElementById("open-side-nav");
const sideNav = document.getElementById("mySidenav");
const closeSideNav = document.getElementById("close-btn");
const services = document.querySelectorAll(".services-rendered");
const mainServices = document.querySelectorAll(".main-service");
const extraServices = document.querySelectorAll(".extra-service");

const resetBtn = document.getElementById("reset");
const barBtn = document.getElementById("cash-payment");
const prepaidBtn = document.getElementById("prepaid");
const sendToDataBaseBtn = document.getElementById("fertig");
const displayedSelection = document.querySelectorAll(".choosen-products");
const totalPriceDisplay = document.getElementById("total-price");
//const items = document.getElementById("choosen-items");

let totalAmount = 0.0;

function addItemsToScreen() {
  var ul = document.getElementById("choosen-items");
  var li = document.createElement("li");
  for (i = 0; i < Checkout.servicesPaid.length; i++) {
    var li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        Checkout.servicesPaid[i].name +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          Checkout.servicesPaid[i].price +
          "€"
      )
    );
    ul.appendChild(li);
  }
}
function removeItemsFromScreen() {
  var ul = document.getElementById("choosen-items");
  if (ul) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}
function resetEverything(){
 Checkout.servicesPaid = [];
 totalAmount = 0;
 console.log(Checkout.servicesPaid);
 removeItemsFromScreen();
 totalPriceDisplay.innerHTML = "Gesamt" + "\xa0\xa0\xa0\xa0\xa0" + 0.0 + "€";
 for (i = 0; i < mainServices.length; i++) {
   mainServices[i].disabled = false;
   mainServices[i].style.backgroundColor = "#3171a5";
 }
 for (i = 0; i < extraServices.length; i++) {
   extraServices[i].disabled = false;
   extraServices[i].style.backgroundColor = " rgb(37, 95, 112)";
 }
}

function wasSelected(clickedId) {
  removeItemsFromScreen();
  var i;

  let clickedButton = document.activeElement.innerHTML;
  let name = clickedButton.split(" ")[0];
  let price = parseFloat(document.getElementById(clickedId).value);
  totalAmount += price;
  let newSale = new Checkout(name, price);
  Checkout.servicesPaid.push(newSale);
  console.log(Checkout.servicesPaid);
  if (document.activeElement.className === "main-service button") {
    for (i = 0; i < mainServices.length; i++) {
      mainServices[i].disabled = true;
      mainServices[i].style.backgroundColor = "#F6EFEE";
    }
  }
  if (document.activeElement.className === "extra-service button") {
    document.getElementById(clickedId).disabled = true;
    document.getElementById(clickedId).style.backgroundColor = "#F6EFEE";
  }
  barBtn.disabled = false;
  sendToDataBaseBtn.disabled = false;
  barBtn.style.backgroundColor = "black";
  sendToDataBaseBtn.style.backgroundColor = "black";
  totalPriceDisplay.innerHTML =
    "Gesamt" + "\xa0\xa0\xa0\xa0\xa0" + totalAmount + "€";
  console.log(totalAmount);
  addItemsToScreen();
}

openSideNav.addEventListener("click", () => {
  sideNav.style.width = "250px";
});
closeSideNav.addEventListener("click", () => {
  sideNav.style.width = "0";
});
resetBtn.addEventListener("click", resetEverything);

barBtn.addEventListener("click",async () =>{
  const csrf = document.querySelector("[name=_csrf]").value;
  var stringtifiedServices= JSON.stringify(Checkout.servicesPaid);
  console.log(stringtifiedServices);
  try {
    
    const request = await fetch("/cash/payment", {
      method: "POST",
      headers: {
        "csrf-token": csrf,
        "Content-Type": "application/json",
      },
      body: stringtifiedServices,
    });
    
    const response = await request.json();
    if(response.message){
      console.log("printing ticket");
       resetEverything();
    }
   
  } catch (error) {
    
  }
});