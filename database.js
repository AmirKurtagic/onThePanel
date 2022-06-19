const mongoose = require("mongoose");

class database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://amirkurtagic:amirkurtagic88@amirprojectdb.hqduw.mongodb.net/kurtagicDB?retryWrites=true&w=majority")

            .then(() => {
                console.log("database connection successful");
            })
            .catch((err) => {
                console.log("database connection error" + err);
            })
    }
}

module.exports = new database();