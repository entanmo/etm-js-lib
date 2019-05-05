
class UiaIssuer {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.uiaIssuer = {
            name: data.name,
            desc: data.desc
        };

        return tr;
    }

    static getBytes(tr) {
        let buffer = Buffer.concat([
            new Buffer(tr.asset.uiaIssuer.name, 'utf8'),
            new Buffer(tr.asset.uiaIssuer.desc, 'utf8')
        ]);

        return buffer;
    }

}

module.exports = UiaIssuer;