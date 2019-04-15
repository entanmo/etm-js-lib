var crypto = require("./crypto.js.js")
var constants = require("../lib/constants.js")
var slots = require("../lib/time/slots.js")

class Unlock {

    static calculateFee() {
        return 10000000;
    }

    static create(data, tr) {
        trs.args = data.args;
        return trs;
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

module.exports = Unlock;