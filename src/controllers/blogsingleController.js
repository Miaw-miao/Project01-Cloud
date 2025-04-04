import db from '../models/index'

let getBlogSinglePage = async (req, res) => {
    return res.render('blog-single.ejs');
}

module.exports = {
    getBlogSinglePage: getBlogSinglePage,
}