

class Unlock {

    static create(data, tr) {
        tr.args = data.args;
        return tr;
    }

    static getBytes(tr) {
        return null;
    }

}

module.exports = Unlock;