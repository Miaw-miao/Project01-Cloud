import express from "express"
import bloglistController from "../controllers/bloglistController";
import blogsingleController from "../controllers/blogsingleController";
import contactController from "../controllers/contactController";
import indexController from "../controllers/indexController";
import pages404Controller from "../controllers/pages404Controller";
import searchController from "../controllers/searchController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', indexController.getIndexPage);

    router.get('/blog-list.ejs', bloglistController.getBlogListPage);

    router.get('/contact.ejs', contactController.getContactPage);

    router.get('/blog-single.ejs', blogsingleController.getBlogSinglePage);

    router.get('/search.ejs', searchController.getSearchPage);

    router.get('/pages-404.ejs', pages404Controller.get404Page);

    router.get('/index.ejs', indexController.getIndexPage);
    return app.use("/", router);
}

module.exports = initWebRoutes;