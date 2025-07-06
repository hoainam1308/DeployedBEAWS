var express = require('express');
var router = express.Router();
const {authenticate, authorize} = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res) {
  res.status(200).json({ status: 'ok' });
});

router.get('/test', authenticate, authorize(["ADMIN"]), function(req, res) {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
