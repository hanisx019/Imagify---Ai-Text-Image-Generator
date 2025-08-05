const mongoose = require('mongoose');

require('dotenv').config()
const MongoURL =process.env.MONGOURL

 mongoose.connect(MongoURL)

 const db=mongoose.connection;

 db.on('connected',()=>{
    console.log("MongoDB Database Connected");
 })
 db.on('error',()=>{
    console.log("MongoDB Database Connection Error");
 })
 db.on('disconnected',()=>{
    console.log("MongoDB Database Disconnected");
 })

module.exports=db;