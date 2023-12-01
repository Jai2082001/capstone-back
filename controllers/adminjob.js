const {ObjectId} = require('mongodb');
const Jobs = require('../models/jobs');
const Permission = require('../models/permissions')

exports.saveListings = (req, res, next) => {
    console.log("body ", req.body);
    const { JobTitle, SkillDescription, JobAvailability, JobDescription, Contact, AddedBy} = req.body;

    if(AddedBy == 'Admin' ){
        Jobs.findOne({ JobTitle: JobTitle, SkillDescription: SkillDescription, JobDescription: JobDescription }).then((response) => {
            if (!response) {
                const HealthInstance = new Jobs({  JobTitle: JobTitle, SkillDescription, JobAvailability: JobAvailability, JobDescription: JobDescription, Contact: Contact, AddedBy: AddedBy })
                HealthInstance.save().then((response) => {
                    console.log(response)
                    console.log("Listing Saved");
    
                }).catch((err) => {
                    console.log(err)
                    console.log('Instance not saved');
                });
            } else {
                console.log('Listing opportunity already exists');
            }
        }).catch((err) => {
            console.log(err);
            console.log('some error during save Li  sting');
        })
    }else{
        Permission.findOne({OrId: AddedBy, Activity: `Save`, Model: `Jobs`, UniqueKey: req.body.UniqueKey}).then((response) => {
            if (!response) {

                const PermissionInstance = new Jobs({OrId: AddedBy, Activity: `Save`, Model: `Jobs`, UniqueKey: req.body.UniqueKey, Permission: {  JobTitle: JobTitle, SkillDescription, JobAvailability: JobAvailability, JobDescription: JobDescription, Contact: Contact, AddedBy: AddedBy }})
               
                // const HealthInstance = new Jobs({  JobTitle: JobTitle, SkillDescription, JobAvailability: JobAvailability, JobDescription: JobDescription, Contact: Contact, AddedBy: AddedBy })
                PermissionInstance.save().then((response) => {
                    console.log(response)
                    console.log("Listing Permission Saved");
    
                }).catch((err) => {
                    console.log(err)
                    console.log('Instance not saved');
                });
            } else {
                console.log('Listing opportunity already exists');
            }
        }).catch((err) => {
            console.log(err);
            console.log('some error during save Listing');
        })
    }   

    
}

exports.displayListings = (req, res, next) => {
    console.log('Display Jobs Model');
    const {_id} = req.headers
    if(_id){
        Jobs.find({AddedBy: _id}).then((response) => {
            console.log(response);
            res.send(response)
        })
    }else{
        Jobs.find().then((response) => {
            console.log(response);
            res.send(response)
        })
    }
    
}

exports.detailListing = (req, res, next) => {
    console.log('Detail Health');

    const {id} = req.headers;
    Jobs.findOne({_id: id}).then((response)=>{
        res.send(response);
    })   
}

exports.updateListing = (req, res, next) => {
    console.log('Update Health');
    console.log(req.body);
    const {JobTitle, SkillDescription, JobAvailability, JobDescription, Contact  } = req.body;

    Jobs.updateOne({_id: new ObjectId(req.headers.id)}, {$set: {
        JobTitle: JobTitle,
        SkillDescription: SkillDescription,
        JobAvailability: JobAvailability,
        JobDescription: JobDescription,
        Contact: Contact,
    }}).then((response)=>{
        console.log(response)
        res.send(response)        
    })
}

exports.deleteListing = (req, res, next) => {
    console.log('Delete Listings');
    
    Jobs.deleteOne({_id: req.headers.id}).then((response)=>{
        console.log('deleted');
        res.send(respose)
    })
}