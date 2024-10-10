const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case Constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
        case Constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                massage: err.message,
                stackTrace: err.stack
            })
        case Constants.UNAUTHORIZED:
            res.json({
                title: "Un authorized",
                massage: err.message,
                stackTrace: err.stack
            })
        case Constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                massage: err.message,
                stackTrace: err.stack
            })
        case Constants.SERVER_ERROR:
            res.json({
                title: "Server error",
                massage: err.message,
                stackTrace: err.stack
            })
        default:
            console.log("No Error,All good !")
        break;
}
}
module.exports=errorHandler;