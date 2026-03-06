const { verifyToken } = require('../utils/jwtHelper');
const { User } = require('../models/models');

const verifyTokenHandler = async(req, res, next) => {
    let token = req.headers['authorization'];
    if(token && token.includes('Bearer')) {
        try {
            const result = await verifyToken(token);
            const userId = result.userId;
            
            const userExists = await User.findByPk(userId);
            if (!userExists) {
                return res.status(401).json({success: false, message: "User no longer exists, please log in again"});
            }

            req.userId = userId;
            return next();
        } catch (error) {
            res.status(401).json({success:false, message:"Invalid Token"})
        }
    } else {
        res.status(401).json({success:false, message:"No token provided"})
    }
}

module.exports = { verifyTokenHandler }