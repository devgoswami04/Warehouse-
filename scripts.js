// Add Product
document.getElementById('addProductForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const product = {
        city: document.getElementById('city').value,
        category: document.getElementById('category').value,
        productName: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value,
        weight: document.getElementById('weight').value,
    };

    const response = await fetch('/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

    const result = await response.json();
    alert(result.message);
});

// Search Products
async function searchProducts() {
    const searchTerm = document.getElementById('searchTerm').value;
    const filename = "warehouse.txt";

    const response = await fetch('/searchProducts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm, filename }),
    });

    const result = await response.json();
    alert(result.message);
}

// Display Products in Grid
async function loadProducts() {
    const response = await fetch('/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();
    const productGrid = document.querySelector('.product-grid-container');
    productGrid.innerHTML = '';  // Clear existing content

    const products = result.message.split('\n').filter(Boolean);
    products.forEach(productLine => {
        const product = productLine.split('|').map(part => part.trim());

        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <div class="product-city">City: ${product[0]}</div>
            <div class="product-category">Category: ${product[1]}</div>
            <div class="product-name">Name: ${product[2]}</div>
            <div class="product-price">Price: $${product[3]}</div>
            <div class="product-quantity">Quantity: ${product[4]}</div>
            <div class="product-weight">Weight: ${product[5]}</div>
        `;
        productGrid.appendChild(productElement);
    });
}

// Call the loadProducts function when the products page is loaded
if (window.location.pathname === '/products.html') {
    window.onload = loadProducts;
}
