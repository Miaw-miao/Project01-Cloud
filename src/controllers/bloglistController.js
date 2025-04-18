import db from '../models/index'
import crud from "../services/CRUDService";

let getBlogListPage = async (req, res) => {
    let isNewest = req.query.isNewest === undefined || req.query.isNewest === 'true';

    try {
        let blogs = await crud.getAllBlogs(isNewest);
        let recentPosts = await crud.getAllBlogs(true, 4);

        // Lấy user trực tiếp từ session
        const user = req.session.user;

        return res.render('blog-list.ejs', {
            blogs,
            isNewest,
            recentPosts,
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error loading blogs");
    }
};

let getIndexPage = async (req, res) => {
    try {
        const recentPosts = await crud.getAllBlogs(true, 4); // Lấy 4 bài viết mới nhất
        return res.render('index.ejs', { recentPosts });
    } catch (error) {
        console.error('Error fetching recent posts:', error);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getBlogListPage,
    getIndexPage
};