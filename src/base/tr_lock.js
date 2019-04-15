var crypto = require("./crypto.js.js")
var constants = require("../lib/constants.js")
var slots = require("../lib/time/slots.js")

class Lock {

    static calculateFee() {
        return 10000000;
    }

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

    static getHash() {

    }

    static getId() {

    }

    static getSignature() {

    }

    static getMultiSignature() {

    }

}

module.exports = Lock;