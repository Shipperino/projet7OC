const bcrypt = require('bcrypt');
// const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../models/user.model');
const {
    Sequelize
} = require('sequelize');
const {
    sequelize
} = require('../config/db');



exports.signup = async(req, res, next) => {

    let u = await User.findAll({
        where: {
            email: req.fields.email,
        }
    })
    console.log("u", u)
    if (u.length > 0) {
        return res.status(400).send("utilisateur existant")
    } else {
        try {
            User.create({
                email: req.fields.email,
                username: req.fields.username,
                password: bcrypt.hashSync(req.fields.password, 8)
            }).then((user) => {
                const token = jwt.sign({
                    userId: user.id
                }, '8d7f44bb-6b21-4bdc-a1f6-e8beb4e9e4eb', {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    token: token,
                    username: user.username,
                })
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}



// const token = jwt.sign({
// id: user.id
// }, config.secret, {
// expiresIn: 86400 // expires in 24 hours
// });
// res.status(200).send({
// token: token,
// username: user.username,
// email: user.email,

// });
// });
// });
// };


exports.login = async(req, res, next) => {

    //  const user = await User.create({ email:'a@a', password:bcrypt.hashSync("lol", 8)})
    console.log(req.fields);
    //   user.save()
    let u = await User.findAll({
        where: {

            email: req.fields.email,
        }
    })
    console.log("u", u)

    if (u.length > 0) {
        let user = u[0];
        let passwordHash = user.password;
        if (bcrypt.compareSync(req.fields.password, passwordHash)) {
            const token = jwt.sign({
                userId: user.id
            }, '8d7f44bb-6b21-4bdc-a1f6-e8beb4e9e4eb', {
                expiresIn: '1h'
            });
            res.status(200).send({
                token: token,
                email: user.email,
                username: user.username
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
exports.login2 = async(req, res, next) => {

    res.status(200).send({
        userId: req.currentUser
    });


}