import db from '../models/index'

let getIndexPage = async (req, res) => {
    return res.render('index.ejs');
}

module.exports = {
    getIndexPage: getIndexPage,
}