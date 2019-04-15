

class Transfer {

    static calculateFee() {
        return 10000000;
    }

    static create(data, tr) {
        tr.recipientAddress = data.recipientAddress;
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