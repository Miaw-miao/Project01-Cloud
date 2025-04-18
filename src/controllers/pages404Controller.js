import db from '../models/index'

let get404Page = async (req, res) => {
    console.log("Request User:", req.user);
    return res.render('pages-404.ejs');
}

module.exports = {
    get404Page: get404Page,
}