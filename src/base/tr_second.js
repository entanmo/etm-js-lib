const ByteBuffer = require("bytebuffer");

class Second {

    static calculateFee() {
        return 500000000;
    }

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.signature = {
            publicKey: data.secondKeypair.publicKey.toString('hex')
        };
        return tr;
    }

    static getBytes(tr) {
        try {
            var bb = new ByteBuffer(32, true);
            var publicKeyBuffer = new Buffer(tr.asset.signature.publicKey, 'hex');

            for (var i = 0; i < publicKeyBuffer.length; i++) {
                bb.writeByte(publicKeyBuffer[i]);
            }

            bb.flip();
        } catch (e) {
            throw Error(e.toString());
        }
        return bb.toBuffer();
    }

    static getHash() {

    }

    static getId() {

    }

    static getSignature() {

    }

    static getMultiSignature() {

    }

}

module.exports = Second;