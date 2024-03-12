const productsContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const autoCompleteMenu = document.getElementById("autoCompleteMenu");

function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <div class="product__content">
            <h3 class="product__title">${product.name}</h3>
            <p class="product__description">${product.description}</p>
        </div>
        `;
        
        productCard.addEventListener("click", function() {
            createModal(product);
        });

        productsContainer.appendChild(productCard);
    });
}

function displayAllProducts() {
    const allProducts = [...products, ...coffee, ...food];
    displayProducts(allProducts);
}

searchInput.addEventListener("click", function() {
    displayAllProducts();
});

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

document.addEventListener("click", function(event) {
    if (event.target !== searchInput && event.target !== autoCompleteMenu) {
        productsContainer.innerHTML = "";
    }
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        searchInput.blur();
        searchInput.value = "";
        productsContainer.innerHTML = "";
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

function createModal(product) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modal";
    modal.innerHTML = `
    <div class="modal__bg"></div>
    <div class="modal__w">
        <div class="modal__containter">
                <div class="modal__content">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <button class="modal__close-btn">Close</button>
            </div>
        </div>
    </div>
    `;
    
    document.body.appendChild(modal);

    const closeButton = modal.querySelector(".modal__close-btn");
    closeButton.addEventListener("click", function() {
        modal.remove();
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            modal.remove();
        }
    });
}

function attachModalListeners() {
    const productCards = document.querySelectorAll(".product");

    productCards.forEach((productCard, index) => {
        productCard.addEventListener("click", function() {
            createModal(products[index]);
        });
    });
}