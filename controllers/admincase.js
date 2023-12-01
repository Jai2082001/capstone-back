const { ObjectId } = require('mongodb');
const Case = require('../models/case');


exports.displayCase = (req, res, next) => {
    console.log('Display Shelter');
    Case.find().then((response) => {
        console.log(response);
        res.send(response)
    })
}

exports.saveCase = (req, res, next) => {
    console.log("body ", req.body)
    const { CaseName, CaseDescription, image } = req.body;
    Case.findOne({ CaseName: CaseName }).then((response) => {
        if (!response) {
            const CaseInstance = new Case({ CaseName: CaseName, CaseRegisteredBy: 'Admin', CaseDescription: CaseDescription, ImageUrl: image, AddedBy: 'Admin' })
            CaseInstance.save().then((response) => {
                console.log(response)
                console.log("Volunteer SAVED");

            }).catch((err) => {
                console.log(err)
                console.log('Instance not saved');
            });
        } else {
            console.log('Volunteer opportunity already exists');
        }
    }).catch((err) => {
        console.log('Error while confirming the availability of the email');
    })
}

exports.deleteCase = (req, res, next) => {
    console.log("Delete Case");
    console.log(req)
    Case.deleteOne({_id: new ObjectId(req.headers._id)}).then((response)=>{
        res.send(response);
    })
}

exports.updateCase = (req, res, next) => {
    console.log('delete one');
    const { CaseName, CaseDescription, image } = req.body;

    Case.updateOne({_id: new ObjectId(req.headers._id)}, {$set: {
        CaseName: CaseName,
        CaseDescription: CaseDescription,
        ImageUrl: image
    }}).then((response)=>{
        res.send(response)        
    })
}
