
class Transfer {

    static create(data, tr) {
        tr.recipientId = data.recipientId;
        tr.amount = data.amount;

        return tr;
    }

    static getBytes(tr) {
        return null;
    }

}

module.exports = Transfer;