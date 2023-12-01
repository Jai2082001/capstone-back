const express = require('express');

const authController = require('../controllers/orgsAction');

const router = express.Router();

router.get('/orgLogin', authController.orgLogin);

router.get(`/organizationDetails`, authController.orgDetails)


// router.get('/userRet', authController.userRet);

// router.post('/login', authController.postLogin);
    
// router.get('/register', authController.getRegister);

// router.post('/register', authController.postRegister)

// router.post('/logout', authController.postLogout);

module.exports = router;