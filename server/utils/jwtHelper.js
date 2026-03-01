var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

function createJwt(userId) {
    var token = jwt.sign({ userId: userId }, SECRET);
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        const formattedToken = token.replace('Bearer ', '');
        jwt.verify(formattedToken, SECRET, (err, decoded) => {
            if (err) return reject({ valid: false, error: err });
            resolve({ valid: true, userId: decoded.userId });
        });
    });
}

module.exports = { createJwt, verifyToken };