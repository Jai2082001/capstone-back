const { ObjectId } = require('mongodb');
const Health = require('../models/health');
const Permissions = require('../models/permissions');


exports.displayHealth = (req, res, next) => {
    console.log('Display Health Model');
    const {_id} = req.headers;
    if(_id){
        Health.find({AddedBy: _id}).then((response) => {
            console.log(response);
            res.send(response)
        })
    }else{
        Health.find().then((response) => {
            console.log(response);
            res.send(response)
        })
    }
    
}

exports.detailHealth = (req, res, next) => {
    console.log('Detail Health');

    const {id} = req.headers;
    Health.findOne({_id: id}).then((response)=>{
        res.send(response);
    })   
}
    
exports.saveHealth = (req, res, next) => {
    console.log("body ", req.body)
    const { HealthName, HealthOrganization, HealthDescription, HealthPr, contact, image, AddedBy } = req.body;

    if(AddedBy == 'Admin'){
        Health.findOne({ HealthName: HealthName }).then((response) => {
            if (!response) {
                const HealthInstance = new Health({ HealthName: HealthName, HealthProDescription: HealthPr, HealthOrganization:HealthOrganization, HealthOrgDescription: HealthDescription,  Contact: contact, ImageUrl: image, AddedBy: 'Admin' })
                HealthInstance.save().then((response) => {
                    console.log(response)
                    console.log("Health SAVED");
                    res.send({status: 'good', message: "Health Opportunity saved"})
                }).catch((err) => {
                    console.log(err)
                    console.log('Instance not saved');
                });
            } else {
                res.send({status: 'error', message: 'Health Care opportunity already exists'})
            }
        }).catch((err) => {
            console.log(err);
            console.log('some error during save health');
        })    
    }else{
        Permissions.findOne({OrId: AddedBy, Activity: 'Save', Model: 'Health', UniqueKey: req.body.UniqueKey}).then((response)=>{

            if(!response){
                const PermissionInstance = new Permissions({OrId: AddedBy, Activity: 'Save', Model: 'Health', UniqueKey: req.body.UniqueKey, Permission: { HealthName: HealthName, HealthProDescription: HealthPr, HealthOrganization:HealthOrganization, HealthOrgDescription: HealthDescription,  Contact: contact, ImageUrl: image, AddedBy: AddedBy }, Status: "No"})

            PermissionInstance.save().then((response)=>{
                console.log(response);
            }).catch((err)=>{
                console.log(err)
            })

            }
            
        })
    }
    
}

exports.deleteHealth = (req, res, next) => {
    console.log("Delete Case");
    console.log(req)
    Health.deleteOne({_id: req.headers.id}).then((response)=>{
        res.send(response);
    })
}

exports.updateHealth = (req, res, next) => {
    console.log('Update Health');
    console.log(req.body);
    const { HealthName, HealthOrganization,HealthProDescription, HealthOrgDescription ,Contact, image } = req.body;

    Health.updateOne({_id: new ObjectId(req.headers.id)}, {$set: {
        HealthName: HealthName,
        HealthOrganization: HealthOrganization,
        HealthOrgDescription: HealthOrgDescription,
        HealthProDescription: HealthProDescription,
        Contact: Contact,
        ImageUrl: image
    }}).then((response)=>{
        console.log(response)
        res.send(response)        
    })
}
