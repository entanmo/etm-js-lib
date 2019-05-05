
class UiaAcl {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.uiaAcl = {
            currency: data.currency,
            operator: data.operator,
            flag: data.flag,
            list: data.list
        };

        return tr;
    }

    static getBytes(tr) {
        let bb = new ByteBuffer();
        let asset = tr.asset.uiaAcl;
        bb.writeString(asset.currency);
        bb.writeString(asset.operator);
        bb.writeByte(asset.flag)
        for (let i = 0; i < asset.list.length; ++i) {
            bb.writeString(asset.list[i]);
        }
        bb.flip();

        return bb.toBuffer();
    }

}

module.exports = UiaAcl;