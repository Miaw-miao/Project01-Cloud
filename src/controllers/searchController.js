import db from '../models/index'

let getSearchPage = async (req, res) => {
    return res.render('search.ejs');
}

module.exports = {
    getSearchPage: getSearchPage,
}