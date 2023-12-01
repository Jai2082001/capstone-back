const { ObjectId } = require('mongodb');
const {exportDb} = require('../util/database');
const Case = require('../models/case');
const Volunteer = require('../models/volunteer');
const LegalOrgs = require('../models/legalorgs');
const Shelter = require('../models/shelter');
const Health = require('../models/health');
const cases = require('../controllers/admincase');
const health = require('../controllers/adminhealth');
const legal = require('../controllers/adminlegal');
const shelter = require('../controllers/admin');
const volunteer = require('../controllers/admin');
const { updateHealth, deleteHealth } = require('./adminhealth');
const orgs = require(`../models/organization`);
const organization = require('../models/organization');

exports.pendingPermission = () => {
    let db = exportDb();
    let seekerId = req.headers.seekerid
    db.collection('permissions').find({seeker: new ObjectId(seekerId), status: null}).toArray().then((response)=>{
        console.log(response);
        res.send(response);
    })
}

exports.cases = () => {
    let seekerId = req.headers.seekerId;
    Case.find({AddedBy: new ObjectId(seekerId)}).then(()=>{
        res.send(response);
    })
}

exports.volunteer = () => {
    let seekerId = req.headers.seekerId;
    Volunteer.find({AddedBy: new ObjectId(seekerId)}).then(()=>{
        res.send(response);
    })
}

exports.legalorgs = () => {
    let seekerId = req.headers.seekerId;
    LegalOrgs.find({AddedBy: new ObjectId(seekerId)}).then(()=>{
        res.send(response);
    })
}

exports.shelter = () => {
    let seekerId = req.headers.seekerId;
    Shelter.find({AddedBy: new ObjectId(seekerId)}).then(()=>{
        res.send(response);
    })
}

exports.health = () => {
    let seekerId = req.headers.seekerId;
    Health.find({AddedBy: new ObjectId(seekerId)}).then(()=>{
        res.send(response);
    })
}


exports.editActions = (req, res, next) => {
    if(req.headers.action == 'cases'){
        cases.updateCase(req, res, next)
    }else if(req.headers.action == 'health'){
        updateHealth(req, res, next);
    }else if(req.headers.action == 'legal'){
        legal.updateCase(req, res, next)
    }else if(req.headers.action == 'shelter'){
        shelter.updateShelter(req, res, next);
    }else{
        volunteer.updateVolunteer(req, res, next);
    }
}


exports.deleteActions = () => {
    if(req.headers.action == 'cases'){
        cases.deleteCase(req, res, next)
    }else if(req.headers.action == 'health'){
        deleteHealth(req, res, next);
    }else if(req.headers.action == 'legal'){
        legal.deleteCase(req, res, next)
    }else if(req.headers.action == 'shelter'){
        shelter.deleteShelter(req, res, next);
    }else{
        volunteer.deleteVolunteer(req, res, next);
    }
}

exports.orgLogin = (req, res, next) => {
    console.log(`asdasdionkbo`)
    const {orname, secret} = req.headers;
    console.log(orname, secret);
    organization.findOne({OrganizationName: orname, SecretKey: secret}).then((response)=>{
        if(response){
            res.send({status: 'log', response: response})
        }else{
            res.send({status: `not`})
        }
    })

}

exports.orgDetails = () => {
    const {id} = req.headers;
     organization.findOne({_id: id}).then((response)=>{
        res.send(response )
     })
}

