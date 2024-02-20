// apllication to entire project

const appMiddleware = (req,res,next)=>{
    console.log("inside application specific middleware");
    next() //now  the control first go to the middleware then it move to the controller
}

module.exports = appMiddleware