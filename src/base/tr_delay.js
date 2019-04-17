

class Delay {

    static create(data, tr) {
        tr.recipientId = data.recipientId;
        tr.amount = data.amount;
        tr.args = data.args;
        return tr;
    }

    static getBytes() {
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

module.exports = Delay;