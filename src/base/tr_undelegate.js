
class Delegate {
    static calculateFee() {
        return 10000000;
    }

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;

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

module.exports = Delegate;