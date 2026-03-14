var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const hashPassword = ( password ) => {
    var hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

const comparePassword = ( plainpassword, hashedPassword ) => {
    const isMatching = bcrypt.compareSync(plainpassword, hashedPassword);
    return isMatching;
}
module.exports = {
    hashPassword,
    comparePassword
}