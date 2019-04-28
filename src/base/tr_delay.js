
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

}

module.exports = Delay;