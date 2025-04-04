import db from '../models/index'

let getSignUpPage = async (req, res) => {
    return res.render('pages-sign-up.ejs');
}

module.exports = {
    getSignUpPage: getSignUpPage,
}