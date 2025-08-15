const mongoose = require("mongoose");
const UserEmail = require("./model/userEmail.js");
require("dotenv").config();

main()
  .then((res) => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

let email = [
  {
    email: "satishm%@gmail.com",
    password: "abcd",
  },
];

UserEmail.insertMany(email);
