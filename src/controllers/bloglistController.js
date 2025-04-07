import db from '../models/index'
import crud from "../services/CRUDService";

let getBlogListPage = async (req, res) => {
    let isNewest = req.query.isNewest === 'true'; // Chuyển query string thành boolean
    try {
        let blogs = await crud.getAllBlogs(isNewest);
        return res.render('blog-list.ejs', { blogs, isNewest  });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error loading blogs");
    }
}

module.exports = {
    getBlogListPage: getBlogListPage,
}