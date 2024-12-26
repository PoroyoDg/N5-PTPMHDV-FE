const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors()); // Cho phép tất cả các yêu cầu từ bất kỳ nguồn nào


// Kết nối đến cơ sở dữ liệu admin
const ketnoi = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin' // Cơ sở dữ liệu cho admin
});
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'frontend'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API: Lấy danh sách sản phẩm
app.get('/api/product', (req, res) => {
    const search = req.query.search || '';
    const sql = `SELECT * FROM product WHERE name LIKE ?`;
    ketnoi.query(sql, [`%${search}%`], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send({ error: 'Lỗi truy vấn' });
            return;
        }
        res.json(results); // Trả về kết quả
    });
});

// Start server
app.listen(3012, () => {
  console.log('Server is running on http://localhost:3012');
});