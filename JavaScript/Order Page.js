const form = document.getElementById('orderForm');
const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
const totalPriceElement = document.getElementById('totalPrice');

document.getElementById('addToCart').addEventListener('click', addToCart);
document.getElementById('buyNow').addEventListener('click', buyNow);
document.getElementById('addToFavourites').addEventListener('click', addToFavourites);
document.getElementById('applyFavourites').addEventListener('click', applyFavourites);
document.getElementById('reset').addEventListener('click', resetCart);

function addToCart() {
    let totalPrice = 0;
    cartTableBody.innerHTML = '';
    const cartItems = [];

    Array.from(form.elements).forEach(element => {
        if (element.type === 'checkbox' && element.checked) {
            const quantityElement = Array.from(form.elements).find(e => e.name === element.name && e.type === 'number');
            if (quantityElement && quantityElement.value > 0) {
                const price = quantityElement.dataset.price * quantityElement.value;
                totalPrice += price;

                const row = cartTableBody.insertRow();
                row.insertCell(0).textContent = quantityElement.name;
                row.insertCell(1).textContent = quantityElement.value;
                row.insertCell(2).textContent = `RS. ${price.toFixed(2)}`;

                cartItems.push({
                    name: quantityElement.name,
                    quantity: quantityElement.value,
                    price: price.toFixed(2)
                });
            }
        }
    });

    totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

function buyNow() {
    window.location.href = 'Payment.html';
}

function addToFavourites() {
    const favourites = {};
    Array.from(form.elements).forEach(element => {
        if (element.type === 'number' && element.value > 0) {
            favourites[element.name] = {
                quantity: element.value,
                checked: Array.from(form.elements).find(e => e.name === element.name && e.type === 'checkbox').checked
            };
        }
    });
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Order added to favourites!');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites) {
        Array.from(form.elements).forEach(element => {
            if (element.name in favourites) {
                element.value = favourites[element.name].quantity;
                const checkbox = Array.from(form.elements).find(e => e.name === element.name && e.type === 'checkbox');
                checkbox.checked = favourites[element.name].checked;
            }
        });
        addToCart();
    }
}

function resetCart() {
    cartTableBody.innerHTML = '';
    totalPriceElement.textContent = 'RS. 0.00';
    Array.from(form.elements).forEach(element => {
        if (element.type === 'number') {
            element.value = 0;
        } else if (element.type === 'checkbox') {
            element.checked = false;
        }
    });
}