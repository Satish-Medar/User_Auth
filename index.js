require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./model/chat.js");
const UserEmail = require("./model/userEmail.js");

let port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ✅ ONLY ONE connect + ONLY ONE listen
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected ✅");

    app.listen(port, () => {
      console.log(`Server Started at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);
// const user1 = new User({
//   name: "Satish",
//   age: 21,
// });

// user1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/chats", (req, res) => {
  res.render("allchats.ejs");
});

app.post("/chats", async (req, res) => {
  let { email: newEmail } = req.body;
  // console.log(newEmail);
  const existEmail = await UserEmail.findOne({ email: newEmail });

  // console.log(existEmail);
  if (existEmail) {
    res.render("index3.ejs", { newEmail });
  } else {
    await setnewMail(newEmail);
    res.render("index2.ejs", { newEmail });
  }
});

app.post("/chats/signup", async (req, res) => {
  let { password: newPassword } = req.body;
  await newPassw(newPassword);
  res.redirect("/chats");
});

let mail, pass;
async function setnewMail(newEmail) {
  mail = newEmail;
}

async function newPassw(newpass) {
  pass = newpass;
  await UserEmail.insertOne({ email: mail, password: pass });
}

app.post("/chats/verify", async (req, res) => {
  let { email, userPassword } = req.body;
  console.log(email);
  console.log(userPassword);
  try {
    let obj = await UserEmail.findOne({ email: email });
    if (obj.password != userPassword) {
      console.log("InCorrect");
      res.render("inncorectPassword.ejs", { email });
    } else {
      res.redirect("/chats");
    }
  } catch (err) {
    res.render("inncorectPassword.ejs", { email });
  }
});

app.get("/chats/new", (req, res) => {
  res.send("create chat");
});
