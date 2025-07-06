var express = require('express');
const { GetAllUsers, CreateUser, UpdateUserRole, UpdateUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

router.get('/all', GetAllUsers);

router.post('/create', CreateUser);

router.post('/update-role', authenticate, authorize(["STAFF"]),  UpdateUserRole);

router.post('/update/:id', UpdateUser);

module.exports = router;
