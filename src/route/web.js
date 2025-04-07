import express from "express"
import bloglistController from "../controllers/bloglistController";
import blogsingleController from "../controllers/blogsingleController";
import contactController from "../controllers/contactController";
import indexController from "../controllers/indexController";
import pages404Controller from "../controllers/pages404Controller";
import pagesloginController from "../controllers/loginController";
import pagessignupController from "../controllers/signupController";
import searchController from "../controllers/searchController";
import addblogController from "../controllers/addblogController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', indexController.getIndexPage);

    router.get('/blog-list', bloglistController.getBlogListPage);

    router.get('/contact', contactController.getContactPage);

    router.get('/blog-single', blogsingleController.getBlogSinglePage);

    router.delete('/blog/:id', blogsingleController.deleteBlog);

    router.get('/search', searchController.getSearchPage);

    router.get('/search/results', searchController.searchBlog);

    router.get('/pages-404', pages404Controller.get404Page);

    router.get('/index', indexController.getIndexPage);

    router.get('/login', pagesloginController.getLoginPage);

    router.post('/login', pagesloginController.postLoginPage);

    router.get('/signup', pagessignupController.getSignUpPage);

    router.post('/signup', pagessignupController.createUser);

    router.get('/add-blog', addblogController.getAddBlogPage);

    router.post('/add-blog', addblogController.addBlog);
    return app.use("/", router);
}

module.exports = initWebRoutes;