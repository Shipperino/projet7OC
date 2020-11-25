const Post = require('./post.model');
const User = require('./user.model');
const Comment = require('./comment.model');


Post.belongsTo(User);
Post.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Post);

User.hasMany(Comment);
User.hasMany(Post);


////

User.sync();
Post.sync();
Comment.sync();