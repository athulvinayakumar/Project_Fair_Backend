// import multer
const multer = require('multer')

//diskStorage is used to create the storage place
const storage = multer.diskStorage({
    // destination: location in which the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // filename: the name in which the file is stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    //mimetype - used to get the type
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Only png,jpg,jpeg files are allowed !!!"))
    }
}



// create multerConfigure
const multerConfig = multer({
    storage,
    fileFilter
})

// export multer
module.exports = multerConfig