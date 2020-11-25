const fs = require('fs');
const sequelize = require('../config/db');
// const db = require('../config/db');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
//const formidable = require('formidable');

exports.createPost = async(req, res, next) => {
    // JSON.parse(req.fields.post);
    //   post.create()
    //     .then(() => res.status(201).json({
    //       message: 'Objet enregistré !'
    //     }))
    //     .catch(error => res.status(400).json({
    //       error
    //     }));
    // };
    //console.log(req.fields)
    console.log(req.files);
    console.log(req.fields);
    console.log(req.currentUser);

    try {

        // const form = formidable({ multiples: true });
        // await new Promise((resolve, reject) => {
        //     form.parse(req, (error, fields, files) => {
        //         console.log("clgfiles", files, fields)

        Post.create({
                ...req.fields.postContent,
                userId: req.currentUser
            })
            .then(async(post) => {
                const createdPost = await Post.findOne({
                    where: {
                        id: post.id
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                            model: Comment,
                            as: 'comments',
                            include: [{
                                model: User,
                                attributes: ['id', 'username']
                            }]
                        },
                        {
                            model: User,
                            attributes: ['id', 'username']
                        }
                    ]
                })
                res.status(201).json({
                    post: createdPost
                })
                resolve();
            });
        //     });
        // });
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

exports.addComment = (req, res, next) => {
    try {
        Comment.create({
                comment: req.fields.postComment,
                userId: req.currentUser,
                postId: req.fields.postId
            })
            .then(async(comment) => {

                const newComment = await Comment.findOne({
                    where: {
                        id: comment.id
                    },
                    include: [{
                        model: User,
                        attributes: ['id', 'username']
                    }]
                });

                res.status(201).json({
                    comment: newComment
                })
            });

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

exports.getPostById = (req, res, next) => {
    try {
        const {
            postId
        } = req.params;
        const post = models.Post.findOne({
            where: {
                id: postId
            },
            include: [{
                    model: models.Comment,
                    as: 'comments',
                    include: [{
                        model: models.User,
                    }]
                },
                {
                    model: models.User,
                }
            ]
        });
        if (post) {
            return res.status(200).json({
                post
            });
        }
        return res.status(404).send('Post with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.updatePost = async(req, res) => {
    try {
        const {
            postId
        } = req.params;
        const [updated] = models.Post.update(req.fields, {
            where: {
                id: postId
            }
        });
        if (updated) {
            const updatedPost = models.Post.findOne({
                where: {
                    id: postId
                }
            });
            return res.status(200).json({
                post: updatedPost
            });
        }
        throw new Error('Post not found');
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.deletePost = async(req, res) => {
    try {
        const {
            postId
        } = req.params;
        const deleted = models.Post.destroy({
            where: {
                id: postId
            }
        });
        if (deleted) {
            return res.status(204).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(500).send(error);
    }
};
exports.getAllPosts = async(req, res, next) => {
    const posts = await Post.findAll(

        {
            order: [
                ['id', 'DESC']
            ],
            include: [{
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        attributes: ['id', 'username']

                    }]
                },

                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ]
        }
    )
    console.log(posts);
    try {


        return res.status(200).json({
            posts
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}