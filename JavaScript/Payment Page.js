// Order Summary
document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.getElementById('cartTableBody');
    const totalPriceElement = document.getElementById('totalPriceElement');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get cart items from local storage or an empty array
    const totalPrice = localStorage.getItem('totalPrice') || '0.00'; // Get total price from local storage or '0.00'

    cartItems.forEach(item => {
        const row = cartTableBody.insertRow(); // Create a new table row
        row.insertCell(0).textContent = item.name; // Set the text content of the first cell to the item's name
        row.insertCell(1).textContent = item.quantity; // Set the text content of the second cell to the item's quantity
        row.insertCell(2).textContent = `RS. ${item.price}`; // Set the text content of the third cell to the item's price
    });

    totalPriceElement.textContent = `RS. ${totalPrice}`; // Set the text content of the total price element
});

// Pop up
function placeOrder() {
    if (validateForm()) { // Validate the form
      document.getElementById('orderConfirmation').style.display = 'block'; // Display the order confirmation popup
    } else {
      alert('Please fill out all required fields.');
    }
}

function validateForm() {
    let isValid = true; // Initialize form validity
    const formElements = document.getElementById('orderForm').elements; // Get form elements
    for (let i = 0; i < formElements.length; i++) { // Loop through each form element
        if (formElements[i].required && !formElements[i].value) { // Check if the required field is empty
            isValid = false; // Set form validity to false
            break;
        }
    }
    return isValid; // Return form validity
}
  
function closePopup() {
    document.getElementById('orderConfirmation').style.display = 'none'; // Hide the order confirmation popup
    window.location.href = 'index.html';
}