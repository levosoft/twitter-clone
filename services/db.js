const loki = require("lokijs");
let db = false;

/**
 * Init database
 * @param cb
 */
function initDB(cb) {
  console.log("Init database");
  db = new loki("database.db");
  db.loadDatabase({}, (err) => {
    if (err) {
      return cb(err);
    }
    let tweetModel = db.getCollection("tweet");
    if (tweetModel === null) {
      tweetModel = db.addCollection("tweet", ["id", "userId"]);
    }
    let userModel = db.getCollection("user");
    if (userModel === null) {
      userModel = db.addCollection("user", {
        indices: ["id", "email"],
        unique: ["email"],
      });
    }
    db.saveDatabase((err) => {
      if (err) {
        return cb(err);
      }
      console.log("DB saved after init.");
      // dump all rows from all collection
      console.table(userModel.find());
      console.log(tweetModel.find());
      return cb(undefined, {
        tweetModel,
        userModel,
        saveDB: (cb) => {
          console.log("Saving DB...");
          db.saveDatabase(cb);
        },
      });
    });
  });
}

module.exports.initDB = initDB; //Siker esetén visszaadja modelleket
