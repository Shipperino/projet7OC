const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const Sauce = require('./models/Sauce');
const userRoutes = require('./routes/user.route');
const path = require('path');
const stuffRoutes = require('./routes/post.route.js');
const auth = require('./middleware/auth');
const formidableMiddleware = require('express-formidable');

require('./models/association');
// mongoose.connect('mongodb+srv://sopekocko:azerty187@cluster0.lwi0z.mongodb.net/sopekocko_db?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    next();
});

// app.use(auth)

// app.use(bodyParser.json());
app.use(formidableMiddleware({ multiples: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', stuffRoutes);

module.exports = app;