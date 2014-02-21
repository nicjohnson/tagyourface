
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { videoid: req.query.videoid });
};