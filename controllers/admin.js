const Volunteer = require('../models/volunteer');
const Shelter = require('../models/shelter');
const Organization = require('../models/organization');


const { ObjectId } = require('mongodb');
const permissions = require('../models/permissions');
const organization = require('../models/organization');

exports.displayShelter = (req, res, next) => {
  console.log('Display Shelter');
  Shelter.find().then((response) => {
    console.log(response);
    res.send(response)
  })
}

exports.displayVolunteer = (req, res, next) => {
  console.log('Display Volunteer');
  Volunteer.find().then((response) => {
    console.log(response);
    res.send(response)
  })
}

exports.saveVolunteer = (req, res, next) => {
  console.log(" save volunteer body ", req.body)
  const { eventName, eventOrganization, eventDescription, vNeed, vPresent, contactInfo, image, AddedBy } = req.body;

  
  if (AddedBy == 'Admin') {
    Volunteer.findOne({ EventName: eventName }).then((response) => {
      if (!response) {
        const VolunteerInstance = new Volunteer({ EventName: eventName, EventOrganization: eventOrganization, EventDescription: eventDescription, VolunteersNeed: vNeed, VolunteersPresent: vPresent, ImageUrl: image, AddedBy: 'Admin', ContactInformation: contactInfo })
        VolunteerInstance.save().then((response) => {
          console.log(response)
          console.log("Volunteer SAVED");

          res.send({response: response, status: 'log'})

        }).catch((err) => {
          console.log(err)
          console.log('Instance not saved');
        });
      } else {
        res.send({status: 'error', message: 'Volunteer opportunity with same name already exists'})
      }
    }).catch((err) => {
      console.log('Error while confirming the availability of the email');
    })
  } else {
    console.log('assd');
    permissions.findOne({
      OrId: AddedBy, Activity: 'Save', Model: 'Volunteer', UniqueKey: req.body.UniqueKey}).then((response)=>{
        console.log(response);
        if(!response){
          const PermissionsInstance = new permissions({OrId: AddedBy, Activity: 'Save', Model: 'Volunteer', UniqueKey: req.body.UniqueKey, Permission:{ EventName: eventName, EventOrganization: eventOrganization, EventDescription: eventDescription, VolunteersNeed: vNeed, VolunteersPresent: vPresent, ImageUrl: image, AddedBy: AddedBy, ContactInformation: contactInfo }, Status: 'NO' })
          PermissionsInstance.save().then((response)=>{
            console.log(response)
            res.send({response: response, status: 'log'})
          })
        }else{
          console.log(response);
          res.send({status: 'error'})
        }
      })
  }


}

exports.saveShelter = (req, res, next) => {
  console.log("ShelterSave")
  console.log("body ", req.body)
  const { shelterName, shelterCompany, shelterDescription, sNeed, sPresent, image, addedby } = req.body;
  if (addedby == 'Admin') {
    Shelter.findOne({ ShelterName: shelterName }).then((response) => {
      if (!response) {
        const ShelterInstance = new Shelter({ ShelterName: shelterName, ShelterCompany: shelterCompany, ShelterDescription: shelterDescription, ResidentCapacity: sNeed, ResidentPresentMember: sPresent, ImageUrl: image, AddedBy: 'Admin' })
        ShelterInstance.save().then((response) => {
          res.send(response)
          console.log(response)
          console.log("Shelter SAVED");

        }).catch((err) => {
          console.log(err)
          console.log('Instance not saved');
        });
      } else {
        res.send({status: 'error', message: 'Sheter with same name already exists'})
      }
    }).catch((err) => {
      console.log('Error while confirming the availability of the email');
    })
  } else {
    console.log('assd');
    permissions.findOne({
      OrId: addedBy, Activity: 'Save', Model: 'Shelter', UniqueKey: req.body.UniqueKey}).then((response)=>{
        console.log(response);
        if(!response){
          const PermissionsInstance = new permissions({OrId: addedBy, Activity: 'Save', Model: 'Shelter', UniqueKey: req.body.UniqueKey, Permission:{ ShelterName: shelterName, ShelterCompany: shelterCompany, ShelterDescription: shelterDescription, ResidentCapacity: sNeed, ResidentPresentMember: sPresent, ImageUrl: image, AddedBy: addedBy } , Status: 'NO' })
          PermissionsInstance.save().then((response)=>{
            console.log(response)
            res.send({response: response, status: 'log'})
          })
        }else{
          console.log(response);
          res.send({status: 'error'})
        }
      })

  }

}

exports.updateShelter = (req, res, next) => {
  console.log("UpdateShelter");
  const { ShelterName, ShelterOrganization, ShelterDescription, ResidentCapacity, ResidentPresentMember, image } = req.body;

  Shelter.updateOne({ _id: new ObjectId(req.headers.id) }, {
    $set: {
      ShelterName: ShelterName,
      ShelterOrganization: ShelterOrganization,
      ShelterDescription: ShelterDescription,
      ResidentCapacity: ResidentCapacity,
      ResidentPresentMember: ResidentPresentMember,
      ImageUrl: image
    }
  }).then((response) => {
    res.send(response)
  })

}

exports.updateVolunteer = (req, res, next) => {

  console.log('pdate volteer');
  console.log(req.headers.id);
  const { eventName, eventOrganization, eventDescription, volunteersNeeded, volunteersPresent, image , contactInfo} = req.body;
  console.log(req.body)
  Volunteer.updateOne({ _id: new ObjectId(req.headers.id) }, {
    $set: {
      EventName: eventName,
      EventOrganization: eventOrganization,
      EventDescription: eventDescription,
      VolunteersNeed: volunteersNeeded,
      VolunteersPresent: volunteersPresent,
      ImageUrl: image,
      ContactInformation: contactInfo
    }
  }).then((response) => {
    res.send(response)
  })

}


exports.deleteVolunteer = (req, res, next) => {
  console.log('DeleteVolunteer');
  console.log(req.headers.id);
  Volunteer.deleteOne({ _id: req.headers.id }).then((response) => {
    console.log(response);
    res.send(response);
  });
}

exports.deleteShelter = (req, res, next) => {
  console.log('DeleteVolunteer');
  console.log(req.headers.id);
  Shelter.deleteOne({ _id: req.headers.id }).then((response) => {
    console.log(response);
    res.send(response);
  });
}

exports.saveOrganization = (req, res, next) => {
  console.log('save organization');
  console.log(req.body);
  const { name, mail, phone, secret } = req.body;


  const OrganizationInstance = new Organization({ OrganizationName: name, OrganizationRepMail: mail, OrganizationRepPhoneNumber: phone, SecretKey: secret })

  OrganizationInstance.save().then((response) => {
    console.log(response);
  })

}

exports.organizationDetails = (req, res, next) => {
  console.log('organization details');
  console.log(req.headers);
  const {id} = req.headers;
  organization.find({_id: id}).then((response)=>{
    console.log(response);
    res.send(response);
  })
}


// this package is to encrypt the password


// exports.postLogin = (req, res, next) => {
//   // const email = req.body.email;
//   // const password = req.body.password;
//     const eName  = req.body.eName

//   console.log('asdsd')
//   Volunteer.findOne({ email: email }).then((Volunteer) => {
//     if (!Volunteer) {
//       req.flash('error', 'Wrong Email')
//     } else {
//       // this is to compare the hashed password and password with which Volunteer is logging in
//       bcrypt.compare(password, Volunteer.password).then((isit) => {
//         if (isit) {
//           req.session.isLoggedIn = true;
//           req.session.Volunteer = Volunteer;
//           req.session.save(err => {
//             console.log(err);
//             res.redirect('/')
//           })
//         } else {
//           req.flash('error', 'Wrong Credentials')
//           // this is to give the error message
//           res.redirect('/login');
//         }
//       })
//     }
//   })

// };
// exports.postLogout = (req, res, next) => {
//   req.session.destroy(err => {
//     console.log(err);
//     res.redirect('/');
//   });
// };
