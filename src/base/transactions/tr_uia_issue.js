
class UiaIssue {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;
        tr.asset.uiaIssue = {
            currency: data.currency,
            amount: data.amount
        };

        return tr;
    }

    static getBytes(tr) {
        let buffer = Buffer.concat([
            new Buffer(tr.asset.uiaIssue.currency, 'utf8'),
            new Buffer(tr.asset.uiaIssue.amount, 'utf8')
        ]);

        return buffer;
    }

}

module.exports = UiaIssue;