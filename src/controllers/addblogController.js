import db from '../models/index'
import crud from "../services/CRUDService";
import multer from 'multer';
import path from 'path';

let getAddBlogPage = async (req, res) => {
    try {
        const user = req.session.user || null;
        return res.render('add-blog.ejs', { blog: null, user });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error loading blogs");
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/'); // Lưu vào thư mục uploads
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);  // Lấy phần mở rộng của file
        const fileName = Date.now() + ext;  // Tạo tên file duy nhất
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('image');

let addBlog = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error uploading image.' });
        }

        const { title, description, content, imageDescription } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Lấy đường dẫn hình ảnh

        try {
            const blogData = {
                title,
                description,
                content,
                imageUrl,
                imageDescription,
                author: req.session.user.id, // Giả sử đã có thông tin user
                created_date: new Date(),
                last_modified_date: new Date(),
                like_number: 0
            };

            // Gọi hàm tạo blog
            await crud.createNewCRUD(blogData);
            return res.status(200).json({ message: 'Create a new blog succeed!' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error creating blog.' });
        }
    });
};


module.exports = {
    getAddBlogPage: getAddBlogPage,
    addBlog: addBlog,
}