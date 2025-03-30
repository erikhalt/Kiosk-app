document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    let cart = [];

    const menuData = {
        "Drinks": [
            { "name": "Arnold Palmer", "price": 4 },
            { "name": "Clubhouse Coffee", "price": 3 }
        ],
        "Snacks": [
            { "name": "Golf Ball Popcorn", "price": 5 },
            { "name": "Hole-in-One Nachos", "price": 7 }
        ],
        "Food": [
            { "name": "Caddy's Burger", "price": 10 },
            { "name": "Fairway Chicken Wrap", "price": 9 }
        ]
    };

    function renderHome() {
        app.innerHTML = `
            <h1>Golf Club Menu</h1>
            <div id="category-container"></div>
            <button id="view-cart">View Cart (0)</button>
        `;

        const categoryContainer = document.getElementById("category-container");

        for (const category in menuData) {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "category-box";
            categoryDiv.textContent = category;
            categoryDiv.style.backgroundImage = `url('images/${category.toLowerCase()}.jpg')`;
            categoryDiv.addEventListener("click", () => renderCategory(category));

            categoryContainer.appendChild(categoryDiv);
        }

        // Update cart count when returning to home
        updateCartCount();

        // var viewCartButton = document.getElementById("view-cart");
        // console.log(viewCartButton);
        // viewCartButton.addEventListener('click',function() {
        //     console.log('test');
        // });
        document.addEventListener("click", function (event) {
            if (event.target && event.target.id === "view-cart") {
                console.log("test");
                renderCart();
            }
        });
    }

    function renderCategory(category) {
        app.innerHTML = `
            <button id="back-button">
                <box-icon name='left-arrow-circle' type='solid'></box-icon>
            </button>
            <h1>${category}</h1>
            <div class="menu-items"></div>
        `;

        const menuContainer = document.querySelector(".menu-items");
        console.log(cart);
        menuData[category].forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "menu-item";
            var match = false;
            cart.forEach(cartItem => {
                if (cartItem.name == item.name) {
                    itemDiv.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <box-icon name='minus-circle' data-name="${item.name}" data-price="${item.price}" class="add-to-cart"></box-icon>
                <span id="${item.name}span">${cartItem.quantity}</span>
                <box-icon name='plus-circle' data-name="${item.name}" data-price="${item.price}" class="add-to-cart"></box-icon>
                `;
                    match = true;
                }
            })
            if (!match) {

                itemDiv.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <box-icon name='minus-circle' data-name="${item.name}" data-price="${item.price}" class="add-to-cart"></box-icon>
                <span id="${item.name}span">0</span>
                <box-icon name='plus-circle' data-name="${item.name}" data-price="${item.price}" class="add-to-cart"></box-icon>
                `;
            }
            menuContainer.appendChild(itemDiv);
        });

        document.getElementById("back-button").addEventListener("click", renderHome);

        document.querySelectorAll("[name='plus-circle']").forEach(icon => {
            icon.addEventListener("click", (e) => {
                const name = e.currentTarget.getAttribute("data-name");
                const price = parseFloat(e.currentTarget.getAttribute("data-price"));
                addToCart(name, price);
            });
        });

        document.querySelectorAll("[name='minus-circle']").forEach(icon => {
            icon.addEventListener("click", (e) => {
                const name = e.currentTarget.getAttribute("data-name");
                const price = parseFloat(e.currentTarget.getAttribute("data-price"));
                removefromCart(name);
            });
        });


    }

    function addToCart(name, price) {
        console.log("Adding to cart:", name);
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        var amount = document.getElementById(name + "span");
        amount.innerText = `${(parseInt(amount.innerText) + 1)}`;

        updateCartCount();
    }

    function removefromCart(name) {
        console.log("Adding to cart:", name);
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            if (existingItem.quantity > 0) {
                existingItem.quantity -= 1;
                var amount = document.getElementById(name + "span");
                amount.innerText = `${(parseInt(amount.innerText) - 1)}`;
            }
            if (existingItem.quantity == 0) {
                cart.pop(existingItem);
            }
        }

        updateCartCount();
    }


    function updateCartCount() {
        console.log("Updating cart count");
        var cartView = document.getElementById("view-cart");
        var quantitySum = 0;
        for (var i = 0; i < cart.length; i++) {
            quantitySum += cart[i]['quantity'];
        }
        cartView.innerHTML = `View Cart (${quantitySum})`;
    }

    function renderCart() {
        app.innerHTML = `
            <button id="back-button">
                <box-icon name='left-arrow-circle' type='solid'></box-icon>
            </button>
            <h1>Shopping Cart</h1>
            <div class="cart-items"></div>
            <button id="checkout">Checkout</button>
        `;

        const cartContainer = document.querySelector(".cart-items");
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            var totalAmount = 0;
            cart.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.innerHTML = `
                    ${item.name} - $${item.price} x ${item.quantity}
                `;
                cartContainer.appendChild(cartItem);

                totalAmount += (item.price * item.quantity);
            });
            const totalAmountCart = document.createElement("div");
            totalAmountCart.innerHTML = `
            Total: $${totalAmount}
            `
            cartContainer.appendChild(totalAmountCart);
        }

        document.getElementById("back-button").addEventListener("click", renderHome);
    }

    renderHome();
});
