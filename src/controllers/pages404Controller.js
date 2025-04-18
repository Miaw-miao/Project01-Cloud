import db from '../models/index'

let get404Page = async (req, res) => {
    const user = req.session.user || null;
    return res.render('pages-404.ejs', { user });
}

module.exports = {
    get404Page: get404Page,
}