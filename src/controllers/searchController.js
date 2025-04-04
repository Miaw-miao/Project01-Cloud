import db from '../models/index'
const { Op } = require('sequelize');

let getSearchPage = async (req, res) => {
    return res.render('search.ejs');
}

// Hàm tìm kiếm blog
let searchBlog = async (req, res) => {
    // Lấy chuỗi tìm kiếm và ngày từ query string
    let searchTerm = req.query.searchTerm;  
    let date = req.query.date;  

    // Kiểm tra nếu không có chuỗi tìm kiếm thì trả về kết quả rỗng
    if (!searchTerm && !date) {
        return res.render('search.ejs', { blogs: [], message: 'Please enter a search term or a date' });
    }

    try {
        // Tạo điều kiện tìm kiếm
        let searchConditions = {
            [Op.or]: [
                { title: { [Op.like]: `%${searchTerm}%` } },  // Tìm trong trường title
                { description: { [Op.like]: `%${searchTerm}%` } }  // Tìm trong trường description
            ]
        };

        // Nếu có ngày tìm kiếm, thêm điều kiện tìm theo ngày
        if (date) {
            searchConditions.created_date = { [Op.eq]: new Date(date) };  // Tìm theo ngày
        }

        // Sử dụng Sequelize để tìm các blog có chứa chuỗi tìm kiếm và có thể tìm theo ngày
        let blogs = await db.Blog.findAll({
            where: searchConditions
        });

        // Nếu không tìm thấy blog nào, chuyển đến trang lỗi 404
        if (blogs.length === 0) {
            return res.render('pages-404.ejs');
        }

        // Trả kết quả về cho người dùng
        return res.render('search.ejs', { blogs: blogs });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Có lỗi xảy ra trong quá trình tìm kiếm");
    }
}



module.exports = {
    getSearchPage: getSearchPage,
    searchBlog: searchBlog,
}