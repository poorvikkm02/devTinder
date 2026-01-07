const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "kiccha", lastName: "Sudeep" });
});

app.post("/user", (req, res) => {
  console.log("Save Data to the Database");
  res.send("Data Successfully Saved to Database");
});

app.delete("/user", (req, res) => {
  res.send("Data Successfully Deleted from Database");
});

app.use("/Arun", (req, res) => {
  res.send("Hi Arun are u from Basapura Konanduru");
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
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
