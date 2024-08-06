// Order Summary
document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.getElementById('cartTableBody');
    const totalPriceElement = document.getElementById('totalPriceElement');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';

    cartItems.forEach(item => {
        const row = cartTableBody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `RS. ${item.price}`;
    });

    totalPriceElement.textContent = `RS. ${totalPrice}`;
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