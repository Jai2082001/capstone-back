const exportDb = require('../util/database').exportDb;
const Shelter = require('../models/shelter');
const Blog = require('../models/blog');
const User = require('../models/user');
const Case = require('../models/case');
const Volunteer = require('../models/volunteer');
const health = require('../models/health');
const payment = require('../models/payment');
const legalorgs = require('../models/legalorgs');


exports.randomDisplay = (req, res, next) => {
    Blog.find({}).then((response) => {
        res.send(response);
    })
}

exports.filterVolunteer = (req, res, next) => {
    Volunteer.find({}).then((response) => {
        res.send(response)
    });
}

exports.filterSolunteer = (req, res, next) => {
    console.log('adsdsd')
    Shelter.find({}).then((response) => {
        res.send(response)
    });

}

exports.detailshelter = (req, res, next) => {
    const header = req.headers.id;
    console.log(header)
    Shelter.findOne({ _id: header }).then((response) => {
        if (response) {
            console.log(response);
            res.send(response)
        } else {
            res.send({ status: 'error', message: 'A shelter does not exist' })
        }

    })
}

exports.saveBlog = (req, res, next) => {
    const { pagetitle, pagesubtitle, pagedescription, image } = req.body;
    const instance = new Blog({ PageTitle: pagetitle, PageSubtitle: pagesubtitle, PageDescription: pagedescription, ImageUrl: image });


    instance.save().then((response) => {
        console.log(response);
        res.send(response)
    }).catch('Some error has occured')

}

exports.saveEnrollShelter = (req, res, next) => {
    const { name, address, long, person, nameid } = req.body;
    const { _id } = req.headers
    console.log('Enroll for shelter', req.body);
    console.log(req.headers);

    User.findOne({ _id: _id }).then((response1) => {
        if (response1.enroll) {
            const array = response1.enroll;
            let flag = false;
            for(let i=0;i<array.length;i++){
                if(array[i].id == nameid){
                    flag = true ;
                    break;
                }
            }
            if(!flag){
                array.push({ activity: 'shelter', id: nameid });
                User.updateOne({ _id: _id }, {
                    $set: {
                        enroll: array
                    }
                }).then((response) => {
                    console.log(response);
                    Shelter.findOne({ _id: nameid }).then((response) => {
                        let update;
                        if (response) {
                            if (response.Enrolled.length > 0) {
                                const array = response.Enrolled;
                                if (person == 'For Yourself') {
                                    array.push({ profile: response1, person: 'yourself', doneBy: response1 });
                                } else {
                                    array.push({ profile: { name: name, address: address, long: long }, person: 'yourself', doneBy: response1 })
                                }
                                update = array;
                            } else {
                                const array = []
                                if (person == 'For Yourself') {
                                    array.push({ profile: response1, person: 'yourself', doneBy: response1 });
                                } else {
                                    array.push({ profile: { name: name, address: address, long: long }, person: 'yourself', doneBy: response1 })
                                }
                                update = array;
                            }
                            Shelter.updateOne({ _id: nameid }, {
                                $set: {
                                    Enrolled: update,
                                    ResidentPresentMember: response.ResidentPresentMember + 1
                                }
                            }).then((response) => {
                                console.log(response);
                                res.send(response)
                            })
                        } else {
                            res.send({ status: 'error', message: 'Shelter deleted from admin end' })
                        }
    
                    })
                })   
            }else{
                res.send({status: 'error', message: 'Already registered'})
            }
           
        } else {
            const array = [];
            array.push({ activity: 'shelter', id: nameid });
            User.updateOne({ _id: _id }, {
                $set: {
                    enroll: array
                }
            }).then((response) => {
                console.log(response);
            })

            Shelter.findOne({ _id: nameid }).then((response) => {
                let update;
                if (response) {
                    if (response.Enrolled.length > 0) {
                        const array = response.Enrolled;
                        if (person == 'For Yourself') {
                            array.push({ profile: response1, person: 'yourself', doneBy: response1 });
                        } else {
                            array.push({ profile: { name: name, address: address, long: long }, person: 'yourself', doneBy: response1 })
                        }
                        update = array;
                    } else {
                        const array = []
                        if (person == 'For Yourself') {
                            array.push({ profile: response1, person: 'yourself', doneBy: response1 });
                        } else {
                            array.push({ profile: { name: name, address: address, long: long }, person: 'yourself', doneBy: response1 })
                        }
                        update = array;
                    }
                    Shelter.updateOne({ _id: nameid }, {
                        $set: {
                            Enrolled: update,
                            ResidentPresentMember: response.ResidentPresentMember + 1
                        }
                    }).then((response) => {
                        console.log(response);
                        res.send(response)
                    })
                } else {
                    res.send({ status: 'error', message: 'Shelter locator does not exist anymore' })
                }

            })
        }


    }).catch((err) => {
        console.log('asdsdadasdwe')
    })

}
exports.saveHealthAid = (req,res, next) => {
    const {nameid} = req.body;
    const {_id} = req.headers;
    console.log('Save Health Aid')

    User.findOne({ _id: _id }).then((response1) => {
        if (response1.enroll) {
            const array = response1.enroll;
            let flag = false
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == nameid) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                array.push({ activity: 'health', id: nameid });
                User.updateOne({ _id: _id }, {
                    $set: {
                        enroll: array
                    }
                }).then((response) => {
                    console.log(response);
                    health.findOne({ _id: nameid }).then((response) => {
                        let update;
                        if (response) {
                            if (response.Enrolled.length > 0) {
                                const array = response.Enrolled;
                                array.push(response1);
                                update = array;
                            } else {
                                const array = []
                                array.push(response1);
                                update = array;
                            }
                            health.updateOne({ _id: nameid }, {
                                $set: {
                                    Enrolled: update,
                                }
                            }).then((response) => {
                                console.log(response);
                                res.send({ status: 'good' })
                            })
                        } else {
                            res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                        }

                    })
                })
            }else{
                res.send({status: 'error', message: 'Already registered'})
            }

        } else {
            const array = [];
            array.push({ activity: 'health', id: nameid });
            User.updateOne({ _id: _id }, {
                $set: {
                    enroll: array
                }
            }).then((response) => {
                console.log(response);
            })

            health.findOne({ _id: nameid }).then((response) => {
                let update;
                if (response) {
                    if (response.Enrolled.length > 0) {
                        const array = response.Enrolled;
                        array.push(response1);
                        update = array;
                    } else {
                        const array = []
                        array.push(response1);
                        update = array;
                    }
                    health.updateOne({ _id: nameid }, {
                        $set: {
                            Enrolled: update,
                        }
                    }).then((response) => {
                        console.log(response);
                        res.send({ status: 'good' })
                    })
                } else {
                    res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                }

            })
        }


    }).catch((err) => {
        console.log('asdsdadasdwe')
    })

}

exports.saveDonation = (req, res, next) => {
    const {amount, id, user_id} = req.body
    const newPayment = new payment({amount: amount, stripe_id: id, user: user_id})
    newPayment.save().then((response)=>{
        console.log(response)
        res.send({status: 'good'})
    })

}


exports.saveEnrollVolunteer = (req, res, next) => {
    console.log('Save Enroll Shelter')
    const { nameid } = req.body;
    const { _id } = req.headers;

    console.log(req.body)
    console.log(req.headers);


    User.findOne({ _id: _id }).then((response1) => {
        if (response1.enroll) {
            const array = response1.enroll;
            let flag = false
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == nameid) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                array.push({ activity: 'volunteer', id: nameid });
                User.updateOne({ _id: _id }, {
                    $set: {
                        enroll: array
                    }
                }).then((response) => {
                    console.log(response);
                    Volunteer.findOne({ _id: nameid }).then((response) => {
                        let update;
                        if (response) {
                            if (response.Enrolled.length > 0) {
                                const array = response.Enrolled;
                                array.push(response1);
                                update = array;
                            } else {
                                const array = []
                                array.push(response1);
                                update = array;
                            }
                            Volunteer.updateOne({ _id: nameid }, {
                                $set: {
                                    Enrolled: update,
                                    VolunteersPresent: response.VolunteersPresent + 1
                                }
                            }).then((response) => {
                                console.log(response);
                                res.send({ status: 'good' })
                            })
                        } else {
                            res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                        }

                    })
                })
            }else{
                res.send({status: 'error', message: 'Already registered'})
            }

        } else {
            const array = [];
            array.push({ activity: 'volunteer', id: nameid });
            User.updateOne({ _id: _id }, {
                $set: {
                    enroll: array
                }
            }).then((response) => {
                console.log(response);
            })

            Volunteer.findOne({ _id: nameid }).then((response) => {
                let update;
                if (response) {
                    if (response.Enrolled.length > 0) {
                        const array = response.Enrolled;
                        array.push(response1);
                        update = array;
                    } else {
                        const array = []
                        array.push(response1);
                        update = array;
                    }
                    Volunteer.updateOne({ _id: nameid }, {
                        $set: {
                            Enrolled: update,
                            VolunteersPresent: response.VolunteersPresent + 1
                        }
                    }).then((response) => {
                        console.log(response);
                        res.send({ status: 'good' })
                    })
                } else {
                    res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                }

            })
        }


    }).catch((err) => {
        console.log('asdsdadasdwe')
    })

}

exports.saveEnrollLegal = (req, res, next) => {
    console.log('Save Enroll Legal')
    const { nameid } = req.body;
    const { _id } = req.headers;

    console.log(req.body)
    console.log(req.headers);


    User.findOne({ _id: _id }).then((response1) => {
        if (response1.enroll) {
            const array = response1.enroll;
            let flag = false
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == nameid) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                array.push({ activity: 'legal', id: nameid });
                User.updateOne({ _id: _id }, {
                    $set: {
                        enroll: array
                    }
                }).then((response) => {
                    console.log(response);
                    legalorgs.findOne({ _id: nameid }).then((response) => {
                        let update;
                        if (response) {
                            if (response.Enrolled.length > 0) {
                                const array = response.Enrolled;
                                array.push(response1);
                                update = array;
                            } else {
                                const array = []
                                array.push(response1);
                                update = array;
                            }
                            legalorgs.updateOne({ _id: nameid }, {
                                $set: {
                                    Enrolled: update,
                                }
                            }).then((response) => {
                                console.log(response);
                                res.send({ status: 'good' })
                            })
                        } else {
                            res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                        }

                    })
                })
            }else{
                res.send({status: 'error', message: 'Already registered'})
            }

        } else {
            const array = [];
            array.push({ activity: 'volunteer', id: nameid });
            User.updateOne({ _id: _id }, {
                $set: {
                    enroll: array
                }
            }).then((response) => {
                console.log(response);
            })

            legalorgs.findOne({ _id: nameid }).then((response) => {
                let update;
                if (response) {
                    if (response.Enrolled.length > 0) {
                        const array = response.Enrolled;
                        array.push(response1);
                        update = array;
                    } else {
                        const array = []
                        array.push(response1);
                        update = array;
                    }
                    legalorgs.updateOne({ _id: nameid }, {
                        $set: {
                            Enrolled: update,
                        }
                    }).then((response) => {
                        console.log(response);
                        res.send({ status: 'good' })
                    })
                } else {
                    res.send({ status: 'error', message: 'Opportunity does not exist anymore' })
                }

            })
        }


    }).catch((err) => {
        console.log('asdsdadasdwe')
    })

}









exports.saveCaseUser = (req, res, next) => {
    const { phonenumber, country, province, city, name, image, description } = req.body;
    const { id } = req.headers;
    console.log('adsadadadad-----')
    console.log(req.headers);

    const NewCase = new Case({ name: name, description: description, country: country, province: province, city: city, addedBy: id, imageUrl: image, phonenumber: phonenumber })

    NewCase.save().then((response) => {
        console.log(response);
        res.send(response);
    })
}

exports.displayCasesUser = (req, res, next) => {
    const { userid } = req.headers;
    console.log(userid);
    Case.find({ addedBy: userid }).then((response) => {
        console.log(response);
        res.send(response)
    })
}

exports.detailvolunteer = (req, res, next) => {
    const header = req.headers.id;
    console.log(header)
    Volunteer.findOne({ _id: header }).then((response) => {
        console.log(response);
        res.send(response)
    })

}