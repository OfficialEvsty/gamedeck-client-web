const crypto = require('crypto');


export const makeToken = () => {
    return crypto.randomBytes(20).toString('hex');
}