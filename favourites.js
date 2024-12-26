const apiUrl = 'http://localhost:3012/api/favourite/1'; // Đường dẫn đến API

// Hàm để lấy danh sách yêu thích
async function fetchFavorites(accountId) {
    try {
        const response = await fetch(`${apiUrl}/${accountId}`);
        const data = await response.json();

        if (data.code === 200) {
            renderFavorites(data.result);
        } else {
            console.error('Lỗi khi lấy danh sách yêu thích:', data.message);
        }
    } catch (error) {
        console.error('Lỗi kết nối API:', error);
    }
}

// Hàm để hiển thị danh sách yêu thích
function renderFavorites(favorites) {
    const favoritesList = document.getElementById('favorites');
    favoritesList.innerHTML = ''; // Xóa nội dung cũ

    favorites.forEach(item => {
        const favoriteItem = `
            <div class="favorite-item">
                <h3>${item.pname}</h3>
                <p>Added by: ${item.aname}</p>
            </div>
        `;
        favoritesList.innerHTML += favoriteItem;
    });
}

// Gọi hàm fetchFavorites khi cần thiết (ví dụ: khi tải trang)
const accountId = 1; // Thay đổi theo ID tài khoản của người dùng
fetchFavorites(accountId);