const mongoose = require("mongoose");
const Chat = require("./model/chat.js");
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

let allChats = [
  {
    from: "satish",
    to: "sanket",
    msg: "Hi Bro",
    created_at: new Date(),
  },
  {
    from: "satish2",
    to: "sanket2",
    msg: "Hi Bro 2",
    created_at: new Date(),
  },
  {
    from: "satish 3",
    to: "sanket 3",
    msg: "Hi Bro 3",
    created_at: new Date(),
  },
  {
    from: "satish 4",
    to: "sanket 4",
    msg: "Hi Bro 4",
    created_at: new Date(),
  },
  {
    from: "satish 5",
    to: "sanket 5",
    msg: "Hi Bro 5",
    created_at: new Date(),
  },
  {
    from: "satish 6",
    to: "sanket 6",
    msg: "Hi Bro 6",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
console.log(allChats);
