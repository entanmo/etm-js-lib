const crypto = require('crypto');
const ByteBuffer = require("bytebuffer");

const slots = require('../../src/utils/slots.js');
const ed = require('../../src/utils/ed-nacl.js');

const transfer = require("./transactions/tr_transfer");
const delegate = require("./transactions/tr_delegate");
const undelegate = require("./transactions/tr_undelegate");
const lock = require("./transactions/tr_lock");
const unlock = require("./transactions/tr_unlock");
const vote = require("./transactions/tr_vote");
const delay = require("./transactions/tr_delay");
const second = require("./transactions/tr_second");
const multi = require("./transactions/tr_multi");

const uia_issuer = require("./transactions/tr_uia_issuer");
const uia_asset = require("./transactions/tr_uia_asset");
const uia_flags = require("./transactions/tr_uia_flags");
const uia_acl = require("./transactions/tr_uia_acl");
const uia_issue = require("./transactions/tr_uia_issue");
const uia_transfer = require("./transactions/tr_uia_transfer");

const o_trsTypes = {
    0: transfer,
    2: delegate,
    120: undelegate,
    101: lock,
    102: unlock,
    3: vote,
    110: delay,
    1: second,
    4: multi,
    9: uia_issuer,
    10: uia_asset,
    11: uia_flags,
    12: uia_acl,
    13: uia_issue,
    14: uia_transfer
}

class Transaction {

    static create(data) {
        if (!o_trsTypes[data.type]) {
            throw Error('Unknown transaction type ' + data.type);
        }

        if (!data.sender) {
            throw Error("Can't find sender");
        }

        if (!data.keypair) {
            throw Error("Can't find keypair");
        }

        let tr = {
            type: data.type,
            amount: 0,
            // fee: data.isGenesis ? 0 : o_trsTypes[data.type].calculateFee.call(this),
            fee: data.fee || 0,
            timestamp: data.timestamp || slots.getTime(),
            senderPublicKey: data.sender.publicKey ? data.sender.publicKey.toString('hex') : "",
            asset: {},
            args: data.args,
            message: data.message
        };
        tr = o_trsTypes[tr.type].create.call(Transaction, data, tr);
        tr.signature = Transaction.getSignature(tr, data.keypair);

        // if (data.sender.secondSignature && data.secondKeypair) {
        if (tr.type !== 1 && data.secondKeypair) {
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
            let assetSize = 0;
            if (assetBytes) {
                if (assetBytes instanceof ArrayBuffer) {
                    assetSize = assetBytes.byteLength;
                }
                else {
                    assetSize = assetBytes.length;
                }
            }

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
                let arr = new Uint8Array(assetBytes);

                for (let i = 0; i < assetSize; i++) {
                    bb.writeByte(arr[i]);
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
        let bytes = new Uint8Array(Transaction.getBytes(tr))
        let hash = crypto.createHash('sha256').update(bytes).digest();
        return hash;

    }

    static getId(tr) {
        return Transaction.getHash(tr).toString('hex')
    }

    static getSignature(tr, keypair) {
        let hash = Transaction.getHash(tr);
        let sign = ed.Sign(hash, keypair).toString('hex');
        return sign;
    }

    static getMultiSignature(tr, keypair) {
        let bytes = Transaction.getBytes(tr, true, true);
        let hash = crypto.createHash('sha256').update(new Uint8Array(bytes)).digest();
        let sign = ed.Sign(hash, keypair).toString('hex');
        return sign;
    }

}

module.exports = Transaction;