let basket = JSON.parse(sessionStorage.getItem("basket")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const basketItemsList = document.getElementById("basket-items")
    const subtotalAmount = document.getElementById("subtotal-amount"); // Get the subtotal span
    const orderNowButtons = document.querySelectorAll(".btn.btn-primary"); //Selecting all the order now buttons
    const clearBasketBtn = document.getElementById("clear-basket");
    const checkoutBtn = document.getElementById("checkout");
    const notification = document.getElementById("notification");

    function updateSubtotal() {
        let subtotal = basket.reduce((sum, item) => sum + parseFloat(item.price.replace("£", "")), 0);
        subtotalAmount.textContent = `£${subtotal.toFixed(2)}`; //Update UI with formatted subtotal
    }

    function updateBasketUI() {
        if (!basketItemsList) return; //Prevents errors on pages without a basket
        basketItemsList.innerHTML = ""; //Clear previous content

        if (basket.length === 0) {
            basketItemsList.innerHTML = "<li class='list-group-item'>Your Basket is empty.</li>";
            subtotalAmount.textContent = "£0.00"; // Reset subtotal when empty
            clearBasketBtn.style.display = "none"; // Hide buttons
            checkoutBtn.style.display = "none";
            return;
        }

        basket.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            listItem.innerHTML = `
                <span><strong>${item.name}</strong> - ${parseFloat(item.price.replace("£", "")).toFixed(2)}</span>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            basketItemsList.appendChild(listItem);
        });

        //Show buttons if items exist
        clearBasketBtn.style.display = "inline-block";
        checkoutBtn.style.display = "inline-block";

        //Add event listeners for removing items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");

                //confirmation alert
                let confirmRemoval = confirm("Are you sure you want to remove this item from the basket?");
                if (confirmRemoval) {
                    basket.splice(index, 1);
                    sessionStorage.setItem("basket", JSON.stringify(basket)); // Save updated basket
                    updateBasketUI(); // Refresh UI
                }
            });
        });
        updateSubtotal();
    }

    orderNowButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); //prevent default action of anchor tag

            //find the parent card of the clicked button
            let card = event.target.closest(".card1");

            //Extract Item name and price and create notification
            let itemName = card.querySelector(".card-title").innerText;
            let itemPrice = card.querySelector(".btn.btn-primary").innerText;
            showNotification(`${itemName} added to basket!`);
            //Add item to basket array
            basket.push({
                name: itemName,
                price: itemPrice
            });
            sessionStorage.setItem("basket", JSON.stringify(basket)); // Store in sessionStorage
            updateBasketUI(); // Update UI
        });
    });

    clearBasketBtn.addEventListener("click", () => {
        let confirmClear = confirm("Ain't no going back now choom");
        if (confirmClear) {
            basket = []
            sessionStorage.setItem("basket", JSON.stringify(basket)); //Clear basket and session storage
            updateBasketUI();
        }
    });

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove("hidden");
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                notification.classList.add("hidden");
            }, 500);
        }, 2000); //hide after 2 secs
    }
    
    updateBasketUI(); //initial UI update
});