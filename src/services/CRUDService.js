import db from '../models/index';
const { Op } = require('sequelize');

let createNewCRUD = async (data) => {
    return new Promise(async(resolve, rejct) => {
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
            rejct(e);
        }
    })
}


module.exports = {
    createNewCRUD: createNewCRUD,
}