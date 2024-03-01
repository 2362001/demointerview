const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://nguyentienthanhdz:anhthanh236@cluster0.6uqrlcx.mongodb.net/demointerview";

const connectDatabase = () => {
  mongoose
    .connect(dbURL)
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
