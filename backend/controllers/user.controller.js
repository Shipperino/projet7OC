const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/user.model');
const {
    Sequelize
} = require('sequelize');
const {
    sequelize
} = require('../config/db');

exports.signup = async (req, res, next) => {

    let u = await User.findAll({
        where: {
            email: req.body.email,    
        }
    })
    console.log("u", u)
    if (u.length > 0) {
        return res.status(400).send("utilisateur existant")
    } else {
        try {
            User.create({
                email: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8)
            }).then((user) => {
                const token = jwt.sign({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                }, '8d7f44bb-6b21-4bdc-a1f6-e8beb4e9e4eb', {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    token: token,
                    email: user.email,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    userId: user.id
                })
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

exports.login = async (req, res, next) => {

    console.log(req.body);
    let u = await User.findAll({
        where: {

            email: req.body.email,
        }
    })
    console.log("u", u)

    if (u.length > 0) {
        let user = u[0];
        let passwordHash = user.password;
        if (bcrypt.compareSync(req.body.password, passwordHash)) {
            const token = jwt.sign({
                userId: user.id,
                isAdmin : user.isAdmin,
            }, '8d7f44bb-6b21-4bdc-a1f6-e8beb4e9e4eb', {
                expiresIn: '1h'
            });
            res.status(200).send({
                token: token,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
                userId:user.id
            });
        } else {
            return res.status(401).send('bad')
        }

    } else {
        return res.status(401).send(
            'Request missing username or password param'
        );

    }
}
exports.deleteAcc = async (req, res, next) => {

    let delAcc = await User.findOne({
            where: {
                id: req.currentUser
            }
        })
        .catch(error => {
            console.log(error.message)
        })
    if (!delAcc) {
        console.log("err");
        res.status(400).send('Invalid request');

    } else {
        delAcc.destroy();
        res.status(200).json({message : "Utilisateur supprimé"})
    }
};