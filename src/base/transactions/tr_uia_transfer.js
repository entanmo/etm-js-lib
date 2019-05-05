
class UiaTransfer {

    static create(data, tr) {
        tr.amount = 0;
        tr.recipientId = data.recipientId;
        tr.asset.uiaTransfer = {
            currency: data.currency,
            amount: data.amount
        };

        return tr;
    }

    static getBytes(tr) {
        let buffer = Buffer.concat([
            new Buffer(tr.asset.uiaTransfer.currency, 'utf8'),
            new Buffer(tr.asset.uiaTransfer.amount, 'utf8')
        ]);

        return buffer;
    }

}

module.exports = UiaTransfer;