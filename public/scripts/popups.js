
const StornoBtn = document.getElementById("storno-receipt");
const reklamBtn = document.getElementById("reklam");
const showStornoScreen = document.getElementById("cancel-receipt-form");
const closeStornoScreen = document.getElementById("cancel-storno");


StornoBtn.addEventListener("click",()=>{
    showStornoScreen.style.display = "block";
});
 closeStornoScreen.addEventListener("click", () => {
      showStornoScreen.style.display = "none"; 
});

async function cancelPlacedOrder()  {
    const orderNumber = document.getElementById("ticket-number").value;
    console.log(orderNumber);
    const csrf = document.querySelector('[name=_csrf]').value;
    try {
       const request = await fetch('/' + orderNumber,{
            method: 'POST',
            headers: {
                'csrf-token': csrf
            }
        });
        const response = await request.json();
        console.log(response);
        if (response.valid){
            showStornoScreen.style.display = "none"; 
        }
        else if (!response.valid) {
          document.getElementById("ticket-invalid").innerHTML =
            response.message;
          document.getElementById("ticket-invalid").style.display = "block";
        }

    } catch (error) {
        error.message;
        console.log(" catch from public " );

    }
}



