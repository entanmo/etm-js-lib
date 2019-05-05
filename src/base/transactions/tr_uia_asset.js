
class UiaAsset {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.uiaAsset = {
            name: data.name,
            desc: data.desc,
            maximum: data.maximum,
            precision: data.precision,
            strategy: data.strategy,
            allowWriteoff: data.allowWriteoff,
            allowWhitelist: data.allowWhitelist,
            allowBlacklist: data.allowBlacklist
        };

        return tr;
    }

    static getBytes(tr) {
        let asset = tr.asset.uiaAsset;
        let buffer = Buffer.concat([
            new Buffer(asset.name, 'utf8'),
            new Buffer(asset.desc, 'utf8'),
            new Buffer(asset.maximum, 'utf8'),
            Buffer.from([asset.precision || 0]),
            new Buffer(asset.strategy || '', 'utf8'),
            Buffer.from([asset.allowWriteoff || 0]),
            Buffer.from([asset.allowWhitelist || 0]),
            Buffer.from([asset.allowBlacklist || 0])
        ]);

        let strategy = tr.asset.uiaAsset.strategy;
        if (strategy) {
            buffer = Buffer.concat([buffer,])
        }

        return buffer;
    }

}

module.exports = UiaAsset;