import db from '../models/index'

let getContactPage = async (req, res) => {
    return res.render('contact.ejs');
}

module.exports = {
    getContactPage: getContactPage,
}