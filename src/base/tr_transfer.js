

class Transfer {

    static create(data, tr) {
        tr.recipientId = data.recipientId;
        tr.amount = data.amount;

        return tr;
    }

    static getBytes(tr) {
        return null;
    }

    static getHash() {
        return null;
    }

    static getId() {
        return null;
    }

    static getSignature() {
        return null;
    }

    static getMultiSignature() {
        return null;
    }

}

module.exports = Transfer;