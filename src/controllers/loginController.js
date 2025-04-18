import db from '../models/index'

let getLoginPage = async (req, res) => {
    return res.render('pages-login.ejs');
}

let postLoginPage = async (req, res) => {
    try {
        const { username, password } = req.body;  // Lấy thông tin người dùng nhập vào từ form

        // Kiểm tra người dùng tồn tại trong cơ sở dữ liệu
        let user = await db.User.findOne({ where: { username: username } });

        if (!user) {
            return res.render('pages-login.ejs', { message: 'User not found' });
        }

        // So sánh mật khẩu (vì không mã hóa, so sánh trực tiếp)
        if (user.password !== password) {
            return res.render('pages-login.ejs', { message: 'Incorrect password' });
        }

        // Tạo session cho người dùng
        req.session.user = user;

        // Đăng nhập thành công, chuyển hướng đến trang chủ hoặc dashboard
        return res.redirect('/index');
    } catch (err) {
        console.error(err);
        return res.render('pages-login.ejs', { message: 'An error occurred, please try again.' });
    }
};

module.exports = {
    getLoginPage: getLoginPage,
    postLoginPage: postLoginPage,
}