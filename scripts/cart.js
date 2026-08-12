function getCart()
{
    const cart = localStorage.getItem("tt-cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart)
{
    localStorage.setItem("tt-cart", JSON.stringify(cart));
}

function addToCart(product)
{
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    }
    else {
        cart.push({
            ...product, qty:1
        });
    }

    saveCart(cart);
    console.log("Cart Updated:", getCart());
}

function getCartTotal()
{
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
}


document.querySelectorAll(".btn-cart").forEach(button =>
{
    button.addEventListener("click", () =>
    {
        const card = button.closest(".product-card");
        const product = 
        {
            id: card.dataset.id,
            name: card.dataset.name,
            price: Number(card.dataset.price),
            image: card.dataset.image
        };
    
    addToCart(product);
    });
});


function renderCart()
{
    const cart = getCart();
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const cartCountEl = document.getElementById("cart-count");

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<p style="text-align:center; color: var(--text-secondary);">Your basket is empty 🧺</p>`;
    } else {
        cartItemsEl.innerHTML = cart.map(item => 
             `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">₹${item.price}</p>
          <div class="cart-item-qty">
            <button onclick="changeQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `).join("");
    }

    cartTotalEl.textContent = `₹${getCartTotal()}`;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
}

function changeQty(id, delta)
{
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.qty += delta;
    if(item.qty <= 0)
    {
        removeFromCart(id);
        return;
    }

    saveCart(cart);
    renderCart();
}

function removeFromCart(id)
{
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
}

const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");

function openCart()
{
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);


document.getElementById("cart-checkout").addEventListener("click",() =>
{
    const cart = getCart();

    if (cart.length === 0) return;

    const phoneNumber = "917439469529";

    let message = "Hello! 🌸\n\nI'd like to order:\n\n";
    cart.forEach(item => 
    {
        message += `${item.qty} × ${item.name} - ₹${item.price * item.qty}\n`;
    });

    message += `\n------------------\nTotal: ₹${getCartTotal()}\n\nPlease let me know the next steps.\n\nThank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});


function addToCart(product)
{
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing)
    {
        existing.qty += 1;
    } else {
        cart.push({...product, qty: 1});
    }

    saveCart(cart);
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);



const productOverlay = document.getElementById("product-overlay");
const productModal = document.getElementById("product-modal");
const modalClose = document.getElementById("product-modal-close");

let modalProduct = null;
let modalQty = 1;

document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-cart") || e.target.closest(".btn-buy")) return ;
        openProductModal(card);
    });
});

function openProductModal(card)
{
    modalProduct = {
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
    image: card.dataset.image
    };
    modalQty = 1;

    document.getElementById("product-modal-image").src = modalProduct.image;
    document.getElementById("modal-name").textContent = modalProduct.name;
    document.getElementById("modal-desc").textContent = card.querySelector(".product-desc").textContent;
    document.getElementById("modal-price").textContent = `₹${modalProduct.price}`;
    document.getElementById("modal-qty").textContent = modalQty;

    productOverlay.classList.add("active");
    productModal.classList.add("active");

}

function closeProductModal ()
{
    productOverlay.classList.remove("active");
    productModal.classList.remove("active");
}

modalClose.addEventListener("click", closeProductModal);
productOverlay.addEventListener("click", closeProductModal);

document.getElementById("modal-qty-minus").addEventListener("click", () => {
    if (modalQty > 1) modalQty--;
    document.getElementById("modal-qty").textContent = modalQty;
});

document.getElementById("modal-qty-plus").addEventListener("click", () => {
    modalQty++;
    document.getElementById("modal-qty").textContent = modalQty;
});

document.getElementById("modal-add-cart").addEventListener("click", () => {
    const cart = getCart();
    const existing = cart.find(item => item.id === modalProduct.id);

    if (existing) {
        existing.qty += modalQty;
    } else {
        cart.push({ ...modalProduct, qty: modalQty });
    }

    saveCart(cart);
    renderCart();
    closeProductModal();
});

document.getElementById("modal-buy-now").addEventListener("click", () => {
  const phoneNumber = "917439469529";
  const message = `Hi! 🌸\n\nI'd like to buy:\n\n${modalQty} × ${modalProduct.name} - ₹${modalProduct.price * modalQty}\n\nCould you tell me about availability?\n\nThank you!`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

/* buy button */

document.querySelectorAll(".btn-buy").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();

        const card = button.closest(".product-card"); 
        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        const phoneNumber = "917439469529";
        const message = `Hi! 🌸\n\nI'd like to buy:\n\n1 × ${name} - ₹${price}\n\nCould you tell me about availability?\n\nThank you!`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });
});