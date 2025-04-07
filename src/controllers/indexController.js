import db from '../models/index'
import crud from "../services/CRUDService";


let getIndexPage = async (req, res) => {
    try {
        const isNewest = true;
        const limit = 3;

        const blogs = await crud.getAllBlogs(isNewest, limit);

        return res.render('index.ejs', { blogs: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getIndexPage: getIndexPage,
}