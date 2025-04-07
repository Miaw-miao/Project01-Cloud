import db from '../models/index'
import crud from "../services/CRUDService";

let getSignUpPage = async (req, res) => {
    return res.render('pages-sign-up.ejs');
}

let createUser = async (req, res) => {
    try {
        let { username, password, confirmPassword } = req.body;

        // Kiểm tra các trường hợp không đủ thông tin
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // Kiểm tra mật khẩu có trùng khớp không
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        // Kiểm tra nếu username đã tồn tại trong cơ sở dữ liệu
        let existingUser = await crud.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({
                message: 'Username is already taken'
            });
        }

        // Tạo người dùng mới
        await crud.createNewUser(username, password, 'Guest');

        // Trả về thông báo thành công
        return res.status(201).json({
            message: 'User created successfully'
        });

    } catch (error) {
        // Trả về thông báo lỗi
        return res.status(500).json({
            message: 'User creation failed',
            error: error.message
        });
    }
};




module.exports = {
    getSignUpPage: getSignUpPage,
    createUser: createUser,
}