const crypto = require('crypto');

const ed = require('../../src/utils/ed-nacl.js');
const address = require('../../src/utils/address');


class Account {

    static getKeypairBySecret(secret) {
        let hash = crypto.createHash("sha256").update(secret, "utf8").digest();
        let keypair = ed.MakeKeypair(hash);

        return {
            publicKey: keypair.publicKey.toString("hex"),
            privateKey: keypair.privateKey.toString("hex")
        };
    }

    static getAddressByPublicKey(publicKey) {
        return address.generateBase58CheckAddress(publicKey);
    }

}

module.exports = Account;