const ByteBuffer = require("bytebuffer");

class Second {

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

}

module.exports = Second;