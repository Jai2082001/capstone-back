const Permissions = require('../models/permissions');
const health = require('../models/health');
const legal = require('../models/legalorgs');
const jobs = require('../models/jobs');
const shelter = require('../models/shelter');
const volunteer = require('../models/volunteer');


exports.displayPermissions = (req, res, next) => {
    console.log('Get Permissions')
    Permissions.find().then((response)=>{
        console.log(response);
        res.send(response);
    })
}

exports.acceptPermissionsSave = (req, res, next) => {
    
    console.log('Accept Permissions');

    const {_id} = req.headers;

    console.log(_id)

    Permissions.findOne({_id: _id}).then((response)=>{
        if(response.Model == 'Jobs'){
            const Object = response.Permission;
            const JobInstance = new jobs(Object);
            JobInstance.save().then((response)=>{
                Permissions.updateOne({_id: _id}, {$set: {
                    Status: 'Accept'
                }}).then((response)=>{
                    console.log(response);
                    res.send(response);
                })
            })
        }else if(response.Model == 'Health'){
            const Object = response.Permission;
            const JobInstance = new health(Object);
            JobInstance.save().then((response)=>{
                Permissions.updateOne({_id: _id}, {$set: {
                    Status: 'Accept'
                }}).then((response)=>{
                    console.log(response);
                    res.send(response);
                })
            })
        }else if(response.Model == 'Legal'){
            const Object = response.Permission;
            const JobInstance = new legal(Object);
            JobInstance.save().then((response)=>{
                Permissions.updateOne({_id: _id}, {$set: {
                    Status: 'Accept'
                }}).then((response)=>{
                    console.log(response);
                    res.send(response);
                })
            })
        }else if(response.Model == 'Shelter'){

            
            const Object = response.Permission;
            const JobInstance = new shelter(Object);
            JobInstance.save().then((response)=>{
                Permissions.updateOne({_id: _id}, {$set: {
                    Status: 'Accept'
                }}).then((response)=>{
                    console.log(response);
                    res.send(response);
                })
            })
        }else{
            // Volunteer
            const Object = response.Permission;
            console.log(response)
            const JobInstance = new volunteer(Object);
            JobInstance.save().then((response)=>{
                Permissions.updateOne({_id: _id}, {$set: {
                    Status: 'Accept'
                }}).then((response)=>{
                    console.log(response);
                    res.send(response);
                })
            })
        }
    })

}

exports.declinePermission = (req, res, next) => {
    const {_id}  = req.headers;
    Permissions.updateOne({_id: _id}, {$set: {
        Status: 'Decline'
    }}).then((response)=>{
        res.send(response);
    })
}
