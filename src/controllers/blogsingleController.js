import db from '../models/index'
import crud from "../services/CRUDService";

let getBlogSinglePage = async (req, res) => {
    try {
        let blogId = req.query.id;

        let blog = await crud.getBlogById(blogId);

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        return res.render('blog-single.ejs', { blog: blog });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

module.exports = {
    getBlogSinglePage: getBlogSinglePage,
}