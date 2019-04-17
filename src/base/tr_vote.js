
class Vote {

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

module.exports = Vote;