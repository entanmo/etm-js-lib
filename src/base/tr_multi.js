var crypto = require("./crypto.js")
var constants = require("../lib/constants.js")
var slots = require("../lib/time/slots.js")

class Multi {

    static calculateFee() {
        return 10000000;
    }

    static create(data, tr) {
        tr.args = data.args;
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

module.exports = Multi;