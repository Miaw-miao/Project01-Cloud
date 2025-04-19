import db from '../models/index'
const { Op } = require('sequelize');
import crud from "../services/CRUDService";

let getSearchPage = async (req, res) => {
    const user = req.session.user || null;
    return res.render('search.ejs', { user });
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
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0); // Đặt thời gian đầu ngày
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999); // Đặt thời gian cuối ngày
        
            if (Object.keys(searchConditions).length > 0) {
                searchConditions = {
                    [Op.and]: [
                        searchConditions,
                        { created_date: { [Op.between]: [startOfDay, endOfDay] } }
                    ]
                };
            } else {
                searchConditions.created_date = { [Op.between]: [startOfDay, endOfDay] };
            }
        }
        

        let blogs = await db.Blog.findAll({
            where: searchConditions,
            include: [
                {
                    model: db.User,
                    as: 'authorData',
                    attributes: ['username']
                }
            ]
        });

        const user = req.session.user || null; 
        
        if (blogs.length === 0) {
            return res.render('pages-404.ejs', { user });
        }

        // Xác định giá trị isNewest
        const isNewest = true;

        let recentPosts = await crud.getAllBlogs(true, 4);

        return res.render('blog-list.ejs', {
            blogs: blogs,
            isNewest: isNewest,
            recentPosts: recentPosts,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Có lỗi xảy ra trong quá trình tìm kiếm");
    }
};

module.exports = {
    getSearchPage: getSearchPage,
    searchBlog: searchBlog,
}