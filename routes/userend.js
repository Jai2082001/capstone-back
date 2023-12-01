const express = require('express');

const authController = require('../controllers/userend');


const router = express.Router();


router.get('/randomDisplay', authController.randomDisplay);

router.get('/filtervolunteer', authController.filterVolunteer);

router.get('/filtershelter', authController.filterSolunteer);

router.get('/detailshelter', authController.detailshelter);

router.post('/saveBlog', authController.saveBlog)

router.post('/enrollShelter', authController.saveEnrollShelter);

router.post('/saveCaseUser', authController.saveCaseUser);
router.get('/displayCasesUser', authController.displayCasesUser)

router.get('/detailvolunteer', authController.detailvolunteer);
router.post('/enrollVolunteer', authController.saveEnrollVolunteer)
router.post('/enrollLegal', authController.saveEnrollLegal)


router.post('/enrollHealthAid', authController.saveHealthAid)

router.post('/donation', authController.saveDonation)

module.exports = router;
