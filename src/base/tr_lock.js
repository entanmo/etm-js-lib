
class Lock {

    static create(data, tr) {
        tr.asset.lock = {
            locks: data.locks
        };
        return tr;
    }

    static getBytes(tr) {
        if (!tr.asset.lock.locks) {
            return null;
        }

        let buf;
        try {
            buf = new Buffer(tr.asset.lock.locks.join(''), 'utf8');
        } catch (e) {
            throw Error(e.toString());
        }

        return buf;
    }

}

module.exports = Lock;