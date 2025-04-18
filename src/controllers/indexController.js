import db from '../models/index'
import crud from "../services/CRUDService";

let getIndexPage = async (req, res) => {
    try {
        const isNewest = true;
        const limit = 3;

        const blogs = await crud.getAllBlogs(isNewest, limit);

        // Lấy thông tin người dùng từ session
        const user = req.session.user;

        return res.render('index.ejs', { blogs: blogs, user: user });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getIndexPage: getIndexPage,
}