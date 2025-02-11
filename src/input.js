let basket = JSON.parse(sessionStorage.getItem("basket")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const basketItemsList = document.getElementById("basket-items")
    const orderNowButtons = document.querySelectorAll(".btn.btn-primary"); //Selecting all the order now buttons

    function updateBasketUI() {
        if (!basketItemsList) return; //Prevents errors on pages without a basket
        basketItemsList.innerHTML = ""; //Clear previous content

        if (basket.length === 0) {
            basketItemsList.innerHTML = "<li class='list-group-item'>Your Basket is empty.</li>";
            return;
        }

        basket.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            listItem.innerHTML = `
                <span><strong>${item.name}</strong> - ${item.price}</span>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            basketItemsList.appendChild(listItem);
        });

        //Add event listeners for removing items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");

                //confirmation alert
                let confirmRemoval = confirm("Are you sure you want to remove this item from the basket?");

                if(confirmRemoval) {
                    basket.splice(index, 1);
                sessionStorage.setItem("basket", JSON.stringify(basket)); // Save updated basket
                updateBasketUI(); // Refresh UI
                }
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
            sessionStorage.setItem("basket", JSON.stringify(basket)); // Store in sessionStorage
            updateBasketUI(); // Update UI
        });
    });
    updateBasketUI(); //initial UI update
});