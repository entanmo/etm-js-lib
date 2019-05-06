const ByteBuffer = require("bytebuffer");

class UiaFlags {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.uiaFlags = {
            currency: data.currency,
            flagType: data.flagType,
            flag: data.flag
        };

        return tr;
    }

    static getBytes(tr) {
        let bb = new ByteBuffer();
        let asset = tr.asset.uiaFlags;
        bb.writeString(asset.currency);
        bb.writeByte(asset.flagType);
        bb.writeByte(asset.flag);
        bb.flip();

        return bb.toBuffer();
    }

}

module.exports = UiaFlags;