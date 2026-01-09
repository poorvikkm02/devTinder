const mongoose = require("mongoose");

const connectDb=async ()=>{
 await mongoose.connect("mongodb+srv://poorvik:rPvvYqX2jfdprB0J@node.ufp8fvd.mongodb.net?appName=node", {dbName:"devTinder"});
};

module.exports=connectDb;
