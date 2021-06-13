//route not found

exports.routeNotFound = (req,res,next) => {
    const error = new Error(`Rouute not found - ${req.originalUrl}`);
    console.log(req.originalUrl);
    res.status(404);
    next(error);
}

//error handler

exports.errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 :res.statusCode;
    res.status(statusCode);
    console.log(err);
    res.json({message: err.message});
}