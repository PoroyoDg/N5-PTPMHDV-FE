const apiUrl = 'http://localhost:3012/api/product'; // Cập nhật đúng đường dẫn API

let cart = [];
let favorites = [];

// Lấy danh sách sản phẩm từ API
async function fetchProducts(searchTerm = '') {
    try {
        const response = await fetch(`${apiUrl}?search=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();

        if (data.code === 200) {
            renderProducts(data.result);
        } else {
            console.error('Lỗi khi lấy sản phẩm:', data.message);
        }
    } catch (error) {
        console.error('Lỗi kết nối API:', error);
    }
}


// Hiển thị danh sách sản phẩm
function renderProducts(products) {
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    document.getElementById('product-detail').style.display = 'none'; // Ẩn chi tiết sản phẩm

    if (products.length === 0) {
        productList.innerHTML = '<p>Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = `
            <div class="product-card" onclick='showProductDetails(${JSON.stringify(product)})'>
                <img src="${product.image1}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} VND</p>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Chuyển hướng đến trang chi tiết sản phẩm
function showProductDetails(product) {
    const productDetail = document.getElementById('product-detail');
    const banner = document.querySelector('.slider');
    
    banner.style.display = 'none'; // Ẩn banner
    productDetail.style.display = 'block';
    productDetail.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.image1}" alt="${product.name}" style="max-width: 100%; height: auto;">
        <p>Giá: ${product.price} VND</p>
        <p>Mô tả: ${product.discribe}</p>
        <h3>Hình ảnh khác:</h3>
        <div style="display: flex; gap: 10px;">
            <img src="${product.image2}" alt="${product.name} - 2" style="width: 100px; height: auto; border-radius: 5px;">
            <img src="${product.image3}" alt="${product.name} - 3" style="width: 100px; height: auto; border-radius: 5px;">
            <img src="${product.image4}" alt="${product.name} - 4" style="width: 100px; height: auto; border-radius: 5px;">
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
        <button class="favorite" onclick="addToFavorites(${product.id})">Yêu thích</button>
        <button class="back" onclick="backToProducts()">Quay lại danh sách sản phẩm</button>
        <button class="buy-now" onclick="buyNow(${product.id})">Mua ngay</button>
    `;
    document.getElementById('products').style.display = 'none'; // Ẩn danh sách sản phẩm
}

// Quay lại danh sách sản phẩm
function backToProducts() {
    document.getElementById('products').style.display = 'flex'; // Hiển thị lại danh sách sản phẩm
    document.getElementById('product-detail').style.display = 'none'; // Ẩn chi tiết sản phẩm
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    if (!cart.includes(productId)) {
        cart.push(productId);
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } else {
        alert('Sản phẩm đã có trong giỏ hàng!');
    }
}

// Thêm sản phẩm vào danh sách yêu thích
function addToFavorites(productId) {
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        alert('Sản phẩm đã được thêm vào danh sách yêu thích!');
    } else {
        alert('Sản phẩm đã có trong danh sách yêu thích!');
    }
}

// Chức năng tìm kiếm
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    fetchProducts(searchTerm); // Gọi lại hàm fetchProducts với từ khóa tìm kiếm
});

// Hàm Mua ngay
function buyNow(productId) {
    addToCart(productId);
    window.location.href = 'checkout.html'; 
}

// Gọi API khi tải trang
fetchProducts();