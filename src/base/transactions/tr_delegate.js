
class Delegate {

    static create(data, tr) {
        tr.recipientId = "A4MFB3MaPd355ug19GYPMSakCAWKbLjDTb";//TODO:零时添加以后换成基金会地址
        tr.amount = 1000 * 100000000;
        tr.asset.delegate = {
            username: data.username,
            publicKey: data.sender.publicKey
        };

        if (tr.asset.delegate.username) {
            tr.asset.delegate.username = tr.asset.delegate.username.toLowerCase().trim();
        }

        return tr;
    }

    static getBytes(tr) {
        if (!tr.asset.delegate.username) {
            return null;
        }
        try {
            var buf = new Buffer(tr.asset.delegate.username, 'utf8');
        } catch (e) {
            throw Error(e.toString());
        }

        return buf;
    }

}

module.exports = Delegate;