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


app.delete('/api/deleteTweet', function(req, res){
    const chosen = req.body.tweet_id;
  
    db.Tweet.remove({_id: chosen}).then(function(dbtweets){
        db.Tweet.find({}).then(function(dbtweets){
            res.json(dbtweets);
          })
          .catch(function(err){
              res.json(err);
          })
        })
        .catch(function(err){
          res.json(err);
      });
    });
  
  }