const {GetAllRoles, CreateRole} = require('../controllers/roleController');
const express = require('express');
const router = express.Router();

// GET all roles
router.get('/', GetAllRoles);
router.post('/create', CreateRole);

module.exports = router;
