const express = require('express');

const authController = require('../controllers/admin');
const caseController = require('../controllers/admincase');
const healthController = require('../controllers/adminhealth');
const legalController = require('../controllers/adminlegal');
const permissionController = require('../controllers/adminPermission')

const router = express.Router();

router.post('/volunteerSave', authController.saveVolunteer);
router.post('/updateVolunteer', authController.updateVolunteer);
router.get('/deleteVolunteer', authController.deleteVolunteer);
router.get('/displayVolunteer', authController.displayVolunteer);

router.post('/shelterSave', authController.saveShelter);
router.post('/updateShelter', authController.updateShelter);
router.get('/deleteShelter', authController.deleteShelter);
router.get('/displayShelter', authController.displayShelter);


router.get('/displayCases', caseController.displayCase);
router.post('/updateCase', caseController.updateCase);
router.post('/caseSave', caseController.saveCase);
router.get('/deleteCase', caseController.deleteCase);

router.get('/displayHealthCare', healthController.displayHealth );
router.post('/HealthCareSave', healthController.saveHealth);
router.get('/HealthCareDelete', healthController.deleteHealth);
router.post('/HealthCareUpdate', healthController.updateHealth)
router.get('/detailHealth', healthController.detailHealth)

router.get('/displayLegalOrgs', legalController.displayCase);
router.get('/deleteLegalOrg', legalController.deleteCase);
router.post('/updateLegalOrg', legalController.updateCase);
router.post('/saveLegalOrg', legalController.saveCase);
router.get('/detailLegal', legalController.detailLegal)


router.post('/organizationSave', authController.saveOrganization)
router.get('/organizationDetails', authController.organizationDetails)


router.get('/acceptPermissions', permissionController.acceptPermissionsSave)
router.get('/declinePermissions', permissionController.declinePermission);
router.get('/displayPermissions', permissionController.displayPermissions)


module.exports = router;