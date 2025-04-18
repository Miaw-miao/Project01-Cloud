import db from '../models/index'
import crud from "../services/CRUDService";
import multer from 'multer';
import path from 'path';

let getEditBlogPage = async (req, res) => {
    try {
        const blogId = req.query.id;

        if (!blogId) {
            return res.status(400).send("Blog ID is required");
        }

        const blog = await db.Blog.findOne({ where: { id: blogId } });

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        return res.render('add-blog.ejs', { blog });
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

let editBlogById = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error uploading image.' });
        }

        console.log('req.body:', req.body);
        console.log('req.file:', req.file);

        const { id, title, description, content } = req.body;

        // Kiểm tra dữ liệu
        if (!id || !title || !description || !content) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Cập nhật thông tin blog
        const blogData = {
            title,
            description,
            content,
            last_modified_date: new Date(),
        };

        // Nếu có ảnh mới được upload
        if (req.file) {
            blogData.imageUrl = `/uploads/${req.file.filename}`;
        }

        try {
            // Cập nhật blog trong cơ sở dữ liệu
            const updatedRows = await db.Blog.update(blogData, { where: { id } });

            if (updatedRows[0] === 0) {
                return res.status(404).json({ message: 'Blog not found!' });
            }

            return res.status(200).json({
                message: 'Blog updated successfully!',
                redirectUrl: `/blog-single?id=${id}`, // Chuyển hướng frontend
            });
        } catch (err) {
            console.error('Error updating blog:', err);
            return res.status(500).json({ message: 'Error updating blog' });
        }
    });
};



module.exports = {
    getEditBlogPage: getEditBlogPage,
    editBlogById: editBlogById,
}