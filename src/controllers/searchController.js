import db from '../models/index'
const { Op } = require('sequelize');

let getSearchPage = async (req, res) => {
    return res.render('search.ejs');
}


let searchBlog = async (req, res) => {
    let searchTerm = req.query.searchTerm;
    let date = req.query.date;

    if (!searchTerm && !date) {
        return res.render('search.ejs', { blogs: [], message: 'Please enter a search term or a date' });
    }

    try {
        let searchConditions = {};

        if (searchTerm) {
            searchConditions[Op.or] = [
                { title: { [Op.like]: `%${searchTerm}%` } },
                { description: { [Op.like]: `%${searchTerm}%` } }
            ];
        }

        // Nếu có date
        if (date) {
            // Nếu đã có điều kiện, thêm AND
            if (Object.keys(searchConditions).length > 0) {
                searchConditions = {
                    [Op.and]: [
                        searchConditions,
                        { created_date: { [Op.eq]: new Date(date) } }
                    ]
                };
            } else {
                // Chỉ lọc theo ngày
                searchConditions.created_date = { [Op.eq]: new Date(date) };
            }
        }

        let blogs = await db.Blog.findAll({
            where: searchConditions
        });

        if (blogs.length === 0) {
            return res.render('pages-404.ejs');
        }

        return res.render('blog-list.ejs', { blogs: blogs });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Có lỗi xảy ra trong quá trình tìm kiếm");
    }
};




module.exports = {
    getSearchPage: getSearchPage,
    searchBlog: searchBlog,
}