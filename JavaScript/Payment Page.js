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
    if (validateForm()) {
      document.getElementById('orderConfirmation').style.display = 'block';
    } else {
      alert('Please fill out all required fields.');
    }
}

function validateForm() {
    let isValid = true;
    const formElements = document.getElementById('orderForm').elements;
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].required && !formElements[i].value) {
            isValid = false;
            break;
        }
    }
    return isValid;
}
  
function closePopup() {
    document.getElementById('orderConfirmation').style.display = 'none';
    window.location.href = 'index.html';
}