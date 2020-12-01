const fs = require('fs');
const sequelize = require('../config/db');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');

exports.createPost = async (req, res, next) => {
    console.log(req.files);
    console.log(req.fields);
    console.log(req.currentUser);
    try {
        Post.create({
                ...req.fields.postContent,
                userId: req.currentUser
            })
            .then(async (post) => {
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
            });
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
            .then(async (comment) => {

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

exports.deletePostByID = async (req, res) => {
    const id = req.params.id;
    console.log("postToDelete:", req.params);
    let delPost = await Post.findOne({
            where: {
                id: id
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Cannot delete Post object with id=${id}!`
            });
        });
    if (delPost) {
        if (req.currentUserIsAdmin === true || delPost.userId === req.currentUser) {
            delPost.destroy();
            res.status(200).json({
                message: "post supprimé"
            })
        } else
            res.status(400).send('Invalid request');
    } else
        res.status(400).send('Invalid request');
};
exports.deleteCommentByID = async (req, res) => {
    const id = req.params.id;
    console.log("commentToDelete:", req.params);
    let delComment = await Comment.findOne({
            where: {
                id: id
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Cannot delete Post object with id=${id}!`
            });
        });
    if (delComment) {
        if (req.currentUserIsAdmin === true || delComment.userId === req.currentUser) {
            delComment.destroy();
            res.status(200).json({
                message: "comment supprimé"
            })
        } else
            res.status(400).send('Invalid request');
    } else
        res.status(400).send('Invalid request');
};
exports.getAllPosts = async (req, res, next) => {
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
    try {
        return res.status(200).json({
            posts
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}