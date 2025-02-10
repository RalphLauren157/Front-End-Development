document.addEventListener("DOMContentLoaded", () => {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    const basketContainer = document.getElementById("basket-items")
    if (basket.length === 0) {
        basketContainer.innerHTML = "<p>Your Basket is empty.</p>";
        return;
    }

    basket.forEach((item, index) => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("basket-item");
        itemElement.innerHTML = `
        <p><strong>${item.name}</strong> - ${item.price}</p>
        <button class="remove-item" data-index="${index}">Remove</button>
        `;
        basketContainer.appendChild(itemElement);
    });

    //Remove from basket
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            basket.splice(index, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
            location.reload(); //refresh page to update 
        })
    })
})