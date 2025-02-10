let basket = [];

document.addEventListener("DOMContentLoaded", () => {
    const basketContainer = document.getElementById("basket-items")
    const orderNowButtons = document.querySelectorAll(".btn.btn-primary"); //Selecting all the order now buttons

    function updateBasketUI() {
        basketContainer.innerHTML = ""; //Clear previous content

        if (basket.length === 0) {
            basketContainer.innerHTML = "<p>Your Basket is empty</p>";
            return;
        }

        basket.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("basket.item");
            itemElement.innerHTML = `
                <p><strong>${item.name}</strong> - ${item.name}</p>
                <button class="remove-item data-index="${index}">Remove</button>
                `;
                basketContainer.appendChild(itemElement);
        });

        //Add event listeners for removing items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");
                basket.splice(index, 1);
                updateBasketUI();
            });
        });
    }
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

            updateBasketUI();
        });
    });
    updateBasketUI(); //initial UI update
});