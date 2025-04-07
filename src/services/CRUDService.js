import db from '../models/index';
const { Op } = require('sequelize');

let createNewCRUD = async (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.Blog.create({
                title: data.title,
                author: data.author,
                description: data.description,
                content: data.content,
                created_date: data.created_date,
                last_modified_date: data.last_modified_date,
                like_number: data.like_number,
            })

            resolve('Create a new blog succeed!');
        }catch(e){
            reject(e);
        }
    })
}

let deleteBlogById = async (blogId) => {
    try {
        let blog = await db.Blog.findOne({
            where: { id: blogId }
        });

        if (!blog) {
            return `Blog with ID ${blogId} not found`;
        }

        await blog.destroy(); // Xóa blog
        return `Blog with ID ${blogId} has been deleted successfully`;
    } catch (error) {
        throw error;
    }
};

let getAllBlogs = async (isNewest) => {
    try {
        let blogs = await db.Blog.findAll({
            order: isNewest ? [['id', 'DESC']] : [['id', 'ASC']]
        });
        return blogs;
    } catch (error) {
        console.error("Error getting blogs:", error);
        throw error;
    }
};

let getBlogById = async (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!blogId) {
                resolve(null);
            }

            let blog = await db.Blog.findOne({
                where: { id: blogId },
            });

            resolve(blog);
        } catch (e) {
            reject(e);
        }
    });
};

let editBlogById = async (id, updatedData) => {
    try {
        const blog = await db.Blog.findByPk(id);

        if (!blog) {
            throw new Error('Blog not found');
        }

        // Cập nhật các trường nếu có giá trị mới
        await blog.update({
            title: updatedData.title || blog.title,
            content: updatedData.content || blog.content,
            summary: updatedData.summary || blog.summary,
            author: updatedData.author || blog.author,
            image: updatedData.image || blog.image,
            quote: updatedData.quote || blog.quote,
            additionalContent: updatedData.additionalContent || blog.additionalContent,
            updatedAt: new Date(),
        });

        return blog;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNewCRUD: createNewCRUD,
    deleteBlogById: deleteBlogById,
    getAllBlogs: getAllBlogs,
    getBlogById: getBlogById,
    editBlogById: editBlogById,
}