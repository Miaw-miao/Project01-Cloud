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

let deleteBlog = async (req, res) => {
    try {
        let blogId = req.params.id;
        let currentUser = req.session.user;
        let blog = await db.Blog.findOne({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author !== currentUser.id) {
            return res.status(403).json({ message: 'Permission deny' });
        }
        await crud.deleteBlogById(blogId);
        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Delete failed', error });
    }
};


module.exports = {
    getBlogSinglePage: getBlogSinglePage,
    deleteBlog: deleteBlog,
}