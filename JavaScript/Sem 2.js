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
        if (element.type === 'checkbox' && element.checked) {
            const quantityElement = Array.from(form.elements).find(e => e.name === element.name && e.type === 'number');
            if (quantityElement && quantityElement.value > 0) {
                const price = quantityElement.dataset.price * quantityElement.value;
                totalPrice += price;

                const row = cartTableBody.insertRow();
                row.insertCell(0).textContent = quantityElement.name;
                row.insertCell(1).textContent = quantityElement.value;
                row.insertCell(2).textContent = `RS. ${price.toFixed(2)}`;
            }
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
        } else if (element.type === 'checkbox') {
            element.checked = false;
        }
    });
}

/*Payment*/
//Pop up
function placeOrder() {
    // Validate form fields
    if (validateForm()) {
      // Generate random date
      const today = new Date();
      const randomHour = Math.floor(Math.random() * 24); // Random hour (0-23)
      const randomMinute = Math.floor(Math.random() * 60); // Random minute (0-59)
      const deliveryDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), randomHour, randomMinute);
      document.getElementById('deliveryDate').textContent = deliveryDate.toLocaleDateString();
      // Show the popup
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