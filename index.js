const mainProducts = document.getElementById("mainProducts");
const secondProducts = document.getElementById("secondProducts");
const thirdProducts = document.getElementById("thirdProducts");

function createProductElement(product) {
    const ProductCard = document.createElement("div");
    ProductCard.classList.add("main__product");
    ProductCard.innerHTML = `
        <div class="main__product-content">
            <img src="${product.image}" alt="${product.name}">
            <h3 class="main__product-title">${product.name}</h3>
            <p class="main__product-description">${product.description}</p>
        </div>
    `;
    
    ProductCard.addEventListener("click", function() {
        createModal(product);
    });

    return ProductCard;
}

function displayProducts(products, container) {
    container.innerHTML = "";

    products.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
}

displayProducts(products, mainProducts);
displayProducts(coffee, secondProducts);
displayProducts(food, thirdProducts);