import db from '../models/index'

let getLoginPage = async (req, res) => {
    return res.render('pages-login.ejs');
}

module.exports = {
    getIndexPage: getLoginPage,
}