const mongoose = require("mongoose");

class database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb://username:password@host:port/database?options...")

            .then(() => {
                console.log("database connection successful");
            })
            .catch((err) => {
                console.log("database connection error" + err);
            })
    }
}

module.exports = new database();