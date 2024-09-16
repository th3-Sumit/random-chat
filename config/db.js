const mongoose = require('mongoose')
const env = require('dotenv');
const { json } = require('express');
env.config()

const conn = async () => {
    try {
        const connection_url = process.env.connection_url;
        mongoose.connect(connection_url).then((dbo)=>{
            console.log("DB connected")
          },(err)=>{
            console.log(err)
          }
        );
    } catch (error) {
        console.log(error)
    }
}

conn();