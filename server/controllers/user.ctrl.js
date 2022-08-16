const User = require("../models/User");
const Article = require("../models/Article");

module.exports = {
  addUser: (req, res, next) => {
    new User(req.body).save((err, newUser) => {
      if (err) {
        res.send(err);
      } else if (!newUser) {
        res.send(400);
      } else {
        res.send(newUser);
      }

      next();
    });
  },

  getUser: (req, res, next) => {
    User.findById(req.params.id).then((err, user) => {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.send(400);
      } else {
        res.send(user);
      }

      next();
    });
  },

  followUser: (req, res, next) => {
    User.findById(req.body.id)
      .then((user) => {
        return user.follow(req.body.user_id).then(() => {
          return res.json({ msg: "followed" });
        });
      })
      .catch(next);
  },

  getUserProfile: (req, res, next) => {
    User.findById(req.params.id)
      .then((_user) => {
        return User.find({ following: req.params.id }).then((_user) => {
          _user.forEach((user_) => {
            _user.addFollower(user_);
          });

          return Article.find({ author: req.params.id }).then((_article) => {
            return res.json({ user: _user, article: _article });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
