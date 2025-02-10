let basket = [];

document.addEventListener("DOMContentLoaded", () => {
    const orderNowButtons = document.querySelectorAll(".btn.btn-primary"); //Selecting all the order now buttons
    orderNowButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); //prevent default action of anchor tag

            //find the parent card of the clicked button
            let card = event.target.closest(".card1");

            //Extract Item name and price
            let itemName = card.querySelector(".card-title").innerText;
            let itemPrice = card.querySelector(".btn.btn-primary").innerText;

            //Add item to basket array
            basket.push({
                name: itemName,
                price: itemPrice
            });
            //Storing updated basket in localStorage
            localStorage.setItem("basket", JSON.stringify(basket));

            console.log("Basket:", basket);
        })
    })
})