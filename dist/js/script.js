const products = [
    { name: "Product 1", description: "Description for Product 1", image: "product1.jpg" },
    { name: "Product 2", description: "Description for Product 2", image: "product2.jpg" },
    { name: "Product 3", description: "Description for Product 3", image: "product3.jpg" },
];

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const autoCompleteMenu = document.getElementById("autoCompleteMenu");

function displayProducts(products) {
    productsContainer.innerHTML = "";
    
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <a class="product__link" href="https://www.google.com/">
            <div class="product__items">
                <h3 class="product__title">${product.name}</h3>
                <p class="product__description">${product.description}</p>
            </div>
        </a>
        `;
        //<img class="product__img" src="${product.image}" alt="${product.name}">
        productsContainer.appendChild(productCard);
    });
}

function filterProducts(searchTerm) {
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
}

function displayAutoCompleteResults(results) {
    autoCompleteMenu.innerHTML = "";
    
    results.forEach(result => {
        const autoCompleteItem = document.createElement("div");
        autoCompleteItem.classList.add("autoCompleteItem");
        autoCompleteItem.textContent = result.name;
        
        autoCompleteItem.addEventListener("click", () => {
            searchInput.value = result.name;
            displayProducts([result]);
            autoCompleteMenu.innerHTML = "";
        });
        
        autoCompleteMenu.appendChild(autoCompleteItem);
    });
}

searchInput.addEventListener("click", function() {
    displayProducts(products);
});

document.addEventListener("click", function(event) {
    if (event.target !== searchInput && event.target !== autoCompleteMenu) {
        productsContainer.innerHTML = "";
        autoCompleteMenu.innerHTML = "";
    }
});

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === "") {
        displayProducts(products);
    } else {
        const filteredProducts = filterProducts(searchTerm);
        displayProducts(filteredProducts);
        
        const autoCompleteResults = filterProducts(searchTerm);
        displayAutoCompleteResults(autoCompleteResults);
    }
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        searchInput.blur();
        searchInput.value = "";
        productsContainer.innerHTML = "";
        autoCompleteMenu.innerHTML = "";
    }
});