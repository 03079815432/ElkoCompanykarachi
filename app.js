const productForm = document.getElementById('product-form');
const productTable = document.getElementById('product-table');
const totalPrice = document.getElementById('total-price');
const printBillBtn = document.getElementById('print-bill');

let products = [];

// Add product to table
function addProduct(e) {
  e.preventDefault();

  // Get user inputs
  const productName = document.getElementById('product-name').value.trim();
  const productPrice = parseFloat(document.getElementById('product-price').value.trim());
  const dueDate = document.getElementById('product-due-date').value.trim();
  const expiryDate = document.getElementById('product-expiry-date').value.trim();
  const productQuantity = parseInt(document.getElementById('product-quantity').value.trim());
  const doctorPercent = parseFloat(document.getElementById('doctor-percent').value.trim() || 0);

  // Calculate subtotal
  const subtotal = productPrice * productQuantity;

  // Calculate doctor amount
  const doctorAmount = subtotal * (doctorPercent / 100);

  // Calculate total price
  const totalPriceValue = subtotal - doctorAmount;

  // Create product object
  const product = {
    name: productName,
    price: productPrice,
    dueDate: dueDate,
    expiryDate: expiryDate,
    quantity: productQuantity,
    subtotal: subtotal,
    doctorAmount: doctorAmount,
    totalPrice: totalPriceValue
  };

  // Add product to array
  products.push(product);

  // Add product to table
  addProductToTable(product);

  // Clear form
  productForm.reset();

  // Update total price
  updateTotalPrice();
}

// Add product to table
function addProductToTable(product) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>${product.dueDate}</td>
    <td>${product.expiryDate}</td>
    <td>${product.quantity}</td>
    <td>${product.subtotal.toFixed(2)}</td>
    <td>${product.doctorAmount.toFixed(2)}</td>
    <td>${product.totalPrice.toFixed(2)}</td>
    <td>
      <button class="btn btn-danger btn-sm delete-product-btn">Delete</button>
    </td>
  `;

  const deleteBtn = tr.querySelector('.delete-product-btn');
  deleteBtn.addEventListener('click', deleteProduct);

  productTable.querySelector('tbody').appendChild(tr);
}

// Delete product from table
function deleteProduct(e) {
  const tr = e.target.closest('tr');
  const productName = tr.querySelector('td:first-child').textContent;

  // Remove product from array
  products = products.filter(product => product.name !== productName);

  // Remove product from table
  tr.remove();

  // Update total price
  updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
  let total = 0;
  for (let product of products) {
    total += product.totalPrice;
  }
  totalPrice.textContent = `₨${total.toFixed(2)}`;
}

// Print bill
function printBill() {
  window.print();
}

// Event listeners
productForm.addEventListener('submit', addProduct);
printBillBtn.addEventListener('click', printBill);
