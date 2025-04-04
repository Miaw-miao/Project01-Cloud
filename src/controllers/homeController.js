
let getHomePage = (req, res) => {
    return res.render('contact.ejs');
}

module.exports = {
    getHomePage: getHomePage,
}