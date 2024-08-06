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
    cartTableBody.innerHTML = ''; // Clear the cart table body
    const cartItems = []; // Array to store cart items

    Array.from(form.elements).forEach(element => { // Loop through each form element
        if (element.type === 'checkbox' && element.checked) { // Check whether the checked box is checked
            const quantityElement = Array.from(form.elements).find(e => e.name === element.name && e.type === 'number'); // Find the corresponding quantity input
            if (quantityElement && quantityElement.value > 0) { // Check if the quantity is greater than 0
                const price = quantityElement.dataset.price * quantityElement.value; // Calculate the price
                totalPrice += price; // Add to the total price

                const row = cartTableBody.insertRow(); // Insert a new row in the cart table
                row.insertCell(0).textContent = quantityElement.name; // Insert name cell
                row.insertCell(1).textContent = quantityElement.value; // Insert quantity cell
                row.insertCell(2).textContent = `RS. ${price.toFixed(2)}`; // Insert price cell

                // Add item to cartItems array
                cartItems.push({
                    name: quantityElement.name,
                    quantity: quantityElement.value,
                    price: price.toFixed(2)
                });
            }
        }
    });

    totalPriceElement.textContent = `RS. ${totalPrice.toFixed(2)}`; // Update the total price display

    // Save cartItems and totalPrice to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

function buyNow() {
    window.location.href = 'Payment.html';
}

function addToFavourites() {
    const favourites = {}; // Initialize favourites object
    Array.from(form.elements).forEach(element => { // Loop through each form element
        if (element.type === 'number' && element.value > 0) { // Check if the element is a number input with value > 0
            favourites[element.name] = {
                quantity: element.value, // Store quantity
                checked: Array.from(form.elements).find(e => e.name === element.name && e.type === 'checkbox').checked // Store checked status
            };
        }
    });
    localStorage.setItem('favourites', JSON.stringify(favourites)); // Save favourites to local storage
    alert('Order added to favourites!');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')); // Retrieve favourites from local storage
    if (favourites) {
        Array.from(form.elements).forEach(element => { // Loop through each form element
            if (element.name in favourites) { // Check if the element is in favourites
                element.value = favourites[element.name].quantity; // Set the quantity value
                const checkbox = Array.from(form.elements).find(e => e.name === element.name && e.type === 'checkbox'); // Find the corresponding checkbox
                checkbox.checked = favourites[element.name].checked; // Set the checked status
            }
        });
        addToCart(); // Update the cart
    }
}

function resetCart() {
    cartTableBody.innerHTML = ''; // Clear the cart table body
    totalPriceElement.textContent = 'RS. 0.00'; // Reset the total price display
    Array.from(form.elements).forEach(element => { // Loop through each form element
        if (element.type === 'number') { // Check if the element is a number input
            element.value = 0; // Reset the value to 0
        } else if (element.type === 'checkbox') { // Check if the element is a checkbox
            element.checked = false; // Uncheck the checkbox
        }
    });
}