/*Cart*/
// Get elements
const form = document.getElementById('orderForm');
const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
const totalPriceElement = document.getElementById('totalPrice');

// Event listeners
document.getElementById('addToCart').addEventListener('click', addToCart);
document.getElementById('buyNow').addEventListener('click', buyNow);
document.getElementById('addToFavourites').addEventListener('click', addToFavourites);
document.getElementById('applyFavourites').addEventListener('click', applyFavourites);

// Functions
function addToCart() {
    let totalPrice = 0;
    cartTableBody.innerHTML = '';

    Array.from(form.elements).forEach(element => {
        if (element.type === 'number' && element.value > 0) {
            const price = element.dataset.price * element.value;
            totalPrice += price;

            const row = cartTableBody.insertRow();
            row.insertCell(0).textContent = element.name;
            row.insertCell(1).textContent = element.value;
            row.insertCell(2).textContent = `RS. ${price.toFixed(2)}`;
        }
    });

    totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`;
}

function buyNow() {
    window.location.href = 'Payment.html';
}

function addToFavourites() {
    const favourites = {};
    Array.from(form.elements).forEach(element => {
        if (element.type === 'number' && element.value > 0) {
            favourites[element.name] = element.value;
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
                element.value = favourites[element.name];
            }
        });
        addToCart(); // Update cart with favourites
    }
}

document.getElementById('reset').addEventListener('click', resetCart);
function resetCart() {
    cartTableBody.innerHTML = '';
    totalPriceElement.textContent = 'RS. 0.00';
    Array.from(form.elements).forEach(element => {
        if (element.type === 'number') {
            element.value = 0;
        }
    });
}

/*Payment*/
//Pop up
function showPopup() {
    document.querySelector('.popup').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    window.location.href = 'index.html';
}