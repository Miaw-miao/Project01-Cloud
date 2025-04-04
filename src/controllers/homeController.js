
let getHomePage = (req, res) => {
    return res.render('blog-single.ejs');
}

module.exports = {
    getHomePage: getHomePage,
}