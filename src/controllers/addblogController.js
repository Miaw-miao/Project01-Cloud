import db from '../models/index'
import crud from "../services/CRUDService";

let getAddBlogPage = async (req, res) => {
    try {
        return res.render('add-blog.ejs');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error loading blogs");
    }
}

module.exports = {
    getAddBlogPage: getAddBlogPage,
}