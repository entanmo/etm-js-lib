
class Delegate {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;

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

module.exports = Delegate;