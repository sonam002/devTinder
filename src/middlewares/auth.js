//Cleaner way of handling middlewares
const adminAuth = (req, res, next) => {
    //Logic of fetching the data
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

const userAuth = (req, res, next) => {
    //Logic of fetching the data
    const token = "xyzz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth,
};