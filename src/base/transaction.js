const crypto = require('crypto');
const ByteBuffer = require("bytebuffer");

const slots = require('../../src/utils/slots.js');
const ed = require('../../src/utils/ed-nacl.js');

const transfer = require("./tr_transfer");
const delegate = require("./tr_delegate");
const undelegate = require("./tr_undelegate");
const lock = require("./tr_lock");
const unlock = require("./tr_unlock");
const vote = require("./tr_vote");
const delay = require("./tr_delay");
const second = require("./tr_second");
const multi = require("./tr_multi");

const o_trsTypes = {
    0: transfer,
    2: delegate,
    120: undelegate,
    100: lock,
    101: unlock,
    3: vote,
    110: delay,
    1: second,
    4: multi,
}

class Transaction {

    static createTransaction(data) {
        let hash = crypto.createHash('sha256').update(data.secret, 'utf8').digest();
        let keypair = ed.MakeKeypair(hash);
        data.sender = {
            publicKey: keypair.publicKey.toString('hex')
        }
        data.keypair = keypair;
        return Transaction.create(data);
    }

    static create(data) {
        if (!data.sender) {
            throw Error("Can't find sender");
        }

        if (!data.keypair) {
            throw Error("Can't find keypair");
        }

        let tr = {
            type: data.type,
            amount: 0,
            fee: data.fee,
            timestamp: slots.getTime(),
            senderPublicKey: data.sender.publicKey ? data.sender.publicKey.toString('hex') : "",
            asset: {},
            args: data.args,
            message: data.message
        };
        tr = o_trsTypes[tr.type].create.call(Transaction, data, tr);
        tr.signature = Transaction.getSignature(tr, data.keypair);

        if (data.sender.secondSignature && data.secondKeypair) {
            tr.signSignature = Transaction.getSignature(tr, data.secondKeypair);
        }

        tr.id = Transaction.getId(tr);

        return tr;
    }

    static getBytes(tr, skipSignature, skipSecondSignature) {
        if (!o_trsTypes[tr.type]) {
            throw Error('Unknown transaction type ' + tr.type);
        }

        let size = 1 + 4 + 32 + 32 + 8 + 8 + 64 + 64;
        let bytes;
        try {
            let assetBytes = o_trsTypes[tr.type].getBytes.call(Transaction, tr, skipSignature, skipSecondSignature);
            let assetSize = assetBytes ? assetBytes.length : 0;

            let bb = new ByteBuffer(size + assetSize, true);
            bb.writeByte(tr.type);
            bb.writeInt(tr.timestamp);

            let senderPublicKeyBuffer = new Buffer(tr.senderPublicKey, 'hex');
            for (let i = 0; i < senderPublicKeyBuffer.length; i++) {
                bb.writeByte(senderPublicKeyBuffer[i]);
            }

            if (tr.requesterPublicKey) {
                let requesterPublicKey = new Buffer(tr.requesterPublicKey, 'hex');
                for (let i = 0; i < requesterPublicKey.length; i++) {
                    bb.writeByte(requesterPublicKey[i]);
                }
            }

            if (tr.recipientId) {
                if (/^[0-9]{1,20}$/g.test(tr.recipientId)) {
                    let recipient = bignum(tr.recipientId).toBuffer({ size: 8 });
                    for (let i = 0; i < 8; i++) {
                        bb.writeByte(recipient[i] || 0);
                    }
                } else {
                    bb.writeString(tr.recipientId);
                }
            } else {
                for (let i = 0; i < 8; i++) {
                    bb.writeByte(0);
                }
            }

            bb.writeLong(tr.amount);

            if (tr.message) bb.writeString(tr.message);
            if (tr.args) {
                for (let i = 0; i < tr.args.length; ++i) {
                    bb.writeString(tr.args[i])
                }
            }

            if (assetSize > 0) {
                for (let i = 0; i < assetSize; i++) {
                    bb.writeByte(assetBytes[i]);
                }
            }

            if (!skipSignature && tr.signature) {
                let signatureBuffer = new Buffer(tr.signature, 'hex');
                for (let i = 0; i < signatureBuffer.length; i++) {
                    bb.writeByte(signatureBuffer[i]);
                }
            }

            if (!skipSecondSignature && tr.signSignature) {
                let signSignatureBuffer = new Buffer(tr.signSignature, 'hex');
                for (let i = 0; i < signSignatureBuffer.length; i++) {
                    bb.writeByte(signSignatureBuffer[i]);
                }
            }

            bb.flip();
            bytes = bb.toBuffer()
        } catch (e) {
            throw Error(e.toString());
        }
        return bytes;
    }

    static getHash(tr) {
        return crypto.createHash('sha256').update(new Uint8Array(Transaction.getBytes(tr))).digest();

    }

    static getId(tr) {
        return Transaction.getHash(tr).toString('hex')
    }

    static getSignature(tr, keypair) {
        let hash = Transaction.getHash(tr);
        return ed.Sign(hash, keypair).toString('hex');
    }

    static getMultiSignature(tr, keypair) {
        let bytes = Transaction.getBytes(tr, true, true);
        let hash = crypto.createHash('sha256').update(new Uint8Array(bytes)).digest();
        return ed.Sign(hash, keypair).toString('hex');
    }


}

module.exports = Transaction;