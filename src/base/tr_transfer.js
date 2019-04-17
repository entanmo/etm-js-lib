

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

    }

    static getId() {

    }

    static getSignature() {

    }

    static getMultiSignature() {

    }

}

module.exports = Transfer;