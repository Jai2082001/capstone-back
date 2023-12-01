const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (callback) => {   
    // the connection we are making here is without the help of mongoose(or odm of mongodb) so it could loook a bit different
    // mongodb://prog8105-nodejs-sdp:XC3IAkgPYOHfZjM1eRIhsSCjqlhhV9mLsA5lsmvOXiXg6Wbp7jGEI7VNRKMNDRMxgLCBNgCp2fGuACDbYQO8CQ%3D%3D@prog8105-nodejs-sdp.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@prog8105-nodejs-sdp@
    mongoClient.connect('mongodb://localhost:27017/authenticateMethods', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client)=>{
        console.log(client)
        db = client.db();
        callback();        
    }).catch((err)=>{
        
        throw err
    })

}

const exportDb = () => {
    if(db){
        return db;
    }else{
        return undefined;
    }
}


exports.exportDb = exportDb;
exports.mongoConnect = mongoConnect;