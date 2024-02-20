// import dotenv

// Loads.env file contents into process.env by default.
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./Routers/router')

// create server
// Creates an Express application. The express() function is a top-level function exported by the express module.
const pfserver = express()

// use cors in server
pfserver.use(cors())

// import connection.js file
require('./DB/connections')

// Returns middleware that only parses json - javascript object
pfserver.use(express.json())

// //middleware appmiddleware 
// pfserver.use(jwtMiddleware) 
// pfserver.use(appMiddleware) 

// use of router by server
pfserver.use(router)

//export uploads
//first arg - how other apllication should use it 
//second argument - to export that file from server
pfserver.use('/uploads',express.static('./uploads'))

// customize the port - by default - 3000
const PORT = 4000 || process.env

// to run server
pfserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//get request
pfserver.get('/',(req,res)=>{
    res.send(`<h1>project fair server running successfully and ready to accept request from client</h1>`)
})
