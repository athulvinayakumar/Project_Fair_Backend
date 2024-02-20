// setup path to resolve request

// import express module
const express = require('express')

// import controller
const userController = require('../Controllers/userController')
// import projectcontroller
const projectController = require('../Controllers/projectController')
// import jwtmiddleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')
// import multerConfig
const multerConfig = require('../Middleware/multerMiddleware')

// create an object for router class inside express module
const router = new express.Router()

// setup path to resolve request
router.post('/user/register', userController.register)

// login
router.post('/user/login', userController.login)

//addproject
//single('which field the file is stored')- only one file is uploaded
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

//homeproject
router.get('/projects/home-project',projectController.gethomeProjects)
//allprojects
router.get('/projects/all-project',jwtMiddleware,projectController.getAllProjects)
//getUserProjects
router.get('/user/all-project',jwtMiddleware,projectController.allUserProjects)

//edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

//delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteproject)


// edit profile
router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.edituser)

// export
module.exports = router