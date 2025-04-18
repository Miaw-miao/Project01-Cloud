import db from '../models/index'
import crud from "../services/CRUDService";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

let getEditBlogPage = async (req, res) => {
    try {
        const blogId = req.query.id;
        const user = req.session.user || null;

        if (!blogId) {
            return res.status(400).send("Blog ID is required");
        }

        const blog = await db.Blog.findOne({ where: { id: blogId } });

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        if (blog.author !== user.id) {
            return res.status(403).send("You are not authorized to edit this blog");
        }

        return res.render('add-blog.ejs', { blog, user });
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

        const { id, title, description, content } = req.body;

        if (!id || !title || !description || !content) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Lấy blog cũ để kiểm tra ảnh cũ
        let oldBlog;
        try {
            oldBlog = await db.Blog.findOne({ where: { id } });
            if (!oldBlog) {
                return res.status(404).json({ message: 'Blog not found!' });
            }
        } catch (err) {
            console.error('Error fetching blog:', err);
            return res.status(500).json({ message: 'Error fetching blog' });
        }

        // Tạo object chứa dữ liệu cần cập nhật
        const blogData = {
            title,
            description,
            content,
            last_modified_date: new Date(),
        };

        // Nếu có ảnh mới thì xóa ảnh cũ và cập nhật đường dẫn mới
        if (req.file) {
            if (oldBlog.imageUrl) {
                const imageName = path.basename(oldBlog.imageUrl); // lấy tên file
                const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', imageName);
        
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error('Error cannot delete image:', err);
                        } else {
                            console.log('Old image has been deleted:', imageName);
                        }
                    });
                }
            }
        
            // Cập nhật ảnh mới
            blogData.imageUrl = `/uploads/${req.file.filename}`;
        }             

        try {
            const updatedRows = await db.Blog.update(blogData, { where: { id } });
            console.log(updatedRows);

            if (updatedRows[0] === 0) {
                return res.status(404).json({ message: 'Blog not found!' });
            }

            return res.status(200).json({
                message: 'Blog updated successfully!',
                blog: blogData,
                redirectUrl: `/blog-single?id=${id}`, // Chuyển hướng frontend
                redirectUrl: `/blog-single?id=${id}`,
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