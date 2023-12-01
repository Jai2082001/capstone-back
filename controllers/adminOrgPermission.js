const { ObjectId } = require('mongodb');
// const Case = require('../models/case');
const {exportDb} = require('../util/database');

exports.permissionActionOrg = () => {
    let db = exportDb();
    
    let {seeker, action, category} = req.body;

    db.collection('permissions').insertOne({seeker: new ObjectId(seeker), action : action, category: category}).then((response)=>{
        console.log(response);
        res.send(response);
    })
}

exports.displayPermissionsAdmin = () => {
    let db = exportDb();
    
    db.collection('permissions').find().then((response)=>{
        console.log(response);
        res.send(response);
    })
}


exports.grantedPermission = () => {
    let db = exportDb();

    let {seeker, action, _id} = req.body;

    db.collection('permissions').updateOne({_id: new ObjectId(_id)}, {$set: {
        status: true
    }}).then((response)=>{
        res.header('addedby', seeker);
    })
}

exports.deniedPermissions = () => {
    let db = exportDb();

    db.collection('permissions').updateOne({_id: new ObjectId(_id)}, {$set: {
        status: true
    }}).then((response)=>{
        
    })

}




// exports.displayCase = (req, res, next) => {
//     console.log('Display Shelter');
//     Case.find().then((response) => {
//         console.log(response);
//         res.send(response)
//     })
// }

// exports.saveCase = (req, res, next) => {
//     console.log("body ", req.body)
//     const { CaseName, CaseDescription, image } = req.body;


//     Case.findOne({ eventName: eventName }).then((response) => {
//         if (!response) {
//             const CaseInstance = new Case({ CaseName: CaseName, CaseDescription: CaseDescription, ImageUrl: image })
//             CaseInstance.save().then((response) => {
//                 console.log(response)
//                 console.log("Volunteer SAVED");

//             }).catch((err) => {
//                 console.log(err)
//                 console.log('Instance not saved');
//             });
//         } else {
//             console.log('Volunteer opportunity already exists');
//         }
//     }).catch((err) => {
//         console.log('Error while confirming the availability of the email');
//     })
// }

// exports.deleteCase = (req, res, next) => {
//     console.log("Delete Case");
//     console.log(req)
//     Case.deleteOne({_id: new ObjectId(req.headers._id)}).then((response)=>{
//         res.send(response);
//     })
// }

// exports.updateCase = (req, res, next) => {
//     console.log('delete one');
//     const { CaseName, CaseDescription, image } = req.body;

//     Case.updateOne({_id: new ObjectId(req.headers._id)}, {$set: {
//         CaseName: CaseName,
//         CaseDescription: CaseDescription,
//         ImageUrl: image
//     }}).then((response)=>{
//         res.send(response)        
//     })
// }
