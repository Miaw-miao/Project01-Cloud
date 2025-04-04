
let getHomePage = (req, res) => {
    return res.render('search.ejs');
}

module.exports = {
    getHomePage: getHomePage,
}