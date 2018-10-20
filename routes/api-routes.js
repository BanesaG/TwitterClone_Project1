const db = require('../models');

module.exports = function(app) {
    app.get('/api/tweet', function(req, res) {
        db.Tweet.find({})
          .then(function(tweets) {
              res.json(tweets);
          })
          .catch(function(err) {
              res.json(err);
          }); 
    });

    app.post('/api/tweet', function (req, res) {
        db.Tweet.create(req.body)
        .then(function (tweet) {
            res.json(tweet);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
};

