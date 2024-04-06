const express = require('express');
const {renderMain, renderSignup, renderLogin} = require('../controllers/page');

const router = express.Router();


router.get('/', renderMain);
router.get('/signup',renderSignup);
router.get('/login',renderLogin);



module.exports = router;