const account = require("../src/base/account");


let secret = "real rally sketch sorry place parrot typical cart stone mystery age nominee";
let keypair = account.getKeypairBySecret(secret);

let addr = account.getAddressByPublicKey(keypair.publicKey);

console.log(keypair, addr)