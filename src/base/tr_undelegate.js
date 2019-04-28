
class Delegate {

    static create(data, tr) {
        tr.recipientId = null;
        tr.amount = 0;

        return tr;
    }

    static getBytes(tr) {
        return null;
    }

}

module.exports = Delegate;