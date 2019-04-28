const crypto = require('crypto');

let hash = crypto.createHash('sha256').update("abc").digest();
console.log(hash.toString('hex'))


