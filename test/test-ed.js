const ed1 = require("../src/utils/ed");
const ed2 = require("../src/utils/ed-nacl");
const crypto = require('crypto');

let hash = crypto.createHash('sha256').update("aaa", 'utf8').digest();
let keypair1 = ed1.MakeKeypair(hash);
let keypair2 = ed2.MakeKeypair(hash);
console.log(keypair1, keypair1.publicKey.toString('hex'), keypair1.privateKey.toString('hex'))
console.log(keypair2, keypair2.publicKey.toString('hex'), keypair2.privateKey.toString('hex'))

let sign1 = ed1.Sign(hash, keypair1);
let sign2 = ed2.Sign(new Uint8Array(hash.buffer), keypair2);
console.log(sign1, sign1.toString('hex'))
console.log(sign2, sign2.toString('hex'))

console.log(ed1.Verify(hash, sign1, keypair1.publicKey))
console.log(ed2.Verify(hash, sign2, keypair2.publicKey))