const jwt = require('jsonwebtoken');

tokenVerify = function tokenValue(token) {
    try {
        if (token) {
            jwt.verify(token, 'CBOTS', (err, decode) => {
                if (err) return error;
                else return true;
            });
        } else {
            return error;
        }
    } catch (error) {
        return res.status(400).send({ status: 400, message: 'Token Invalid !' })
    }
}

module.exports = tokenVerify