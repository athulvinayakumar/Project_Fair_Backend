//import project model
const projects = require('../Model/projectSchema')

exports.addProjects = async (req, res) => {
    console.log("inside add project funcion");
    const userId = req.payload
    console.log(userId);


    const projectImage = req.file.filename
    console.log(projectImage)

    const { title, language, overview, github, website } = req.body
    console.log(`${title},${language},${overview},${github},${website} ,${projectImage}`);

    try {
        const existingUser = await projects.findOne({ github })
        if (existingUser) {
            res.status(406).json("Project Already Exist !! Upload Another")
        }
        else {
            
            const newProject = new projects({
                title, language, github, website, overview, projectImage, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    } catch (err) {
        res.status(401).json("Request Failed due to ", err)
    }
}

//allproject
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language: {
            //regular expression , $options means inorder to remove case sensitive
            $regex: searchKey, $options: "i"
        }
    }
    try {
        const allprojects = await projects.find(query)
        res.status(200).json(allprojects)
    } catch (err) {
        res.status(401).json(err)
    }

}

// homeprojects
exports.gethomeProjects = async (req, res) => {
    try {
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//getUserProject
exports.allUserProjects = async (req, res) => {
    //get id from the token
    const userId = req.payload

    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }

}

//edit project
exports.editUserProject = async (req, res) => {
    //get id
    const { id } = req.params
    const userId = req.payload
    const { title, language, github, website, overview, projectImage } = req.body
    const uploadProjectImage = req.file ? req.file.filename : projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, {
            title,
            language,
            github,
            website,
            overview,
            projectImage: uploadProjectImage,
            userId
        }, { new: true })

        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(err)
    }
}

// deleteproject
exports.deleteproject = async (req, res) => {
    //get id
    const { id } = req.params

    try {
        const removeProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json(removeProject)

    } catch (err) {

        res.status(401).json(err)
    }
}