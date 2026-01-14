const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const { validatorSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validatorSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    return res.send("User added successfuully");
  } catch (err) {
    return res.status(400).send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    return res.status(400).send("Error: " + err.message);
  }
});

app.get("/fetch", async (req, res) => {
  const email = req.body.emailId;
  if (email.length !== 0) {
    const fetchUser = await User.findOne({ emailId: email });
    return res.status(200).send(fetchUser);
  } else {
    res.status(400).send("User not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    return res.status(200).send(feed);
  } catch {
    return res.status(400).send("user not found");
  }
});

app.delete("/delete", async (req, res) => {
  const id = req.body._id;
  try {
    const del = await User.findByIdAndDelete(id);
    return res.send("deleted successfully");
  } catch {
    return res.status(400).send("user not found");
  }
});

app.patch("/update", async (req, res) => {
  const data = req.body;
  const id = req.body._id;
  try {
    const allowedUpdates = [
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
      "firstName",
      "_id",
    ];
    const isupdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );
    if (!isupdateAllowed) {
      throw new error("Update not allowed");
    }

    const update = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(update);
    return res.send("updated successfully");
  } catch {
    res.status(400).send("Updation Unsuccessfull");
  }
});

connectDb()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("SERVER IS RUNNING");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });

// we hv used require to fetch express module fromm node_modules.
//the express is a variable which hold fn now hence its called in 2nd line
//now app has returned value from express which contains lot of inbuilt methods and use is one of those inbuilt method.
//try and catch is not used here as it doesnot catch error bec tryand catch can nly catch synchronous errors or await promises
// .here is error is thrown as events hence try and catch doesnt come into picture.
//we also cant do req.end as it is client side inbuilt method to get to know the server is called
//listen is inbuilt fn which takes port no and callback as paramters.
//we also cant use async await here as it nly works when promise is returned right but here listen returns json not promise.so doesnt work
// so by useing multiple requesthandlers we can get tht path eg: localhoest:3000/Arun it works so we can do tht for different things
// so nodemon is installed from npm i -g nodemon.nodemon is a development tool for Node.js that automatically restarts your server whenever you change your code.
// so run nodemon \src\app.js it runs automatically when i save some changes in file
// so we can use shortforms instead of typing node /src.js etc evry time we hv to run.
// we just can write this command inside package.json scripts my assigning it start ,dev etc and we can use it by npm run start.
