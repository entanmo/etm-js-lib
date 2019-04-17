

class Delay {

    static create(data, tr) {
        tr.recipientId = data.recipientId;
        tr.amount = data.amount;
        tr.args = data.args;
        return tr;
    }

    static getBytes() {

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

module.exports = Delay;