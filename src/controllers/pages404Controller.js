import db from '../models/index'

let get404Page = async (req, res) => {
    return res.render('pages-404.ejs');
}

module.exports = {
    get404Page: get404Page,
}