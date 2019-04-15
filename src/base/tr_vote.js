var crypto = require("./crypto.js")
var constants = require("../lib/constants.js")
var slots = require("../lib/time/slots.js")

class Vote {

    static calculateFee() {
        return 10000000;
    }

    static create(data, tr) {
        tr.asset.vote = {
            votes: data.votes
        };

        return tr;
    }

    static getBytes(tr) {
        if (!tr.asset.vote.votes) {
            return null;
        }

        let buf;
        try {
            buf = new Buffer(tr.asset.vote.votes.join(''), 'utf8');
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

module.exports = Vote;