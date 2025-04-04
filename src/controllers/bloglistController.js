import db from '../models/index'

let getBlogListPage = async (req, res) => {
    return res.render('blog-list.ejs');
}

module.exports = {
    getBlogListPage: getBlogListPage,
}