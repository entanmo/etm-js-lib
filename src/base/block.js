const crypto = require('crypto');
const ByteBuffer = require("bytebuffer");

const ed = require('../../src/utils/ed-nacl.js');
const constants = require('../../src/utils/constants.js');
const BlockStatus = require('../../src/utils/block-status.js');
const transactiosModule = require("./transaction");

let __private = {};

__private.blockStatus = new BlockStatus();

__private.sortTransactions = (trs) => {
    return trs.sort(function compare(a, b) {
        if (a.type !== b.type) {
            if (a.type === 1) {
                return 1;
            }
            if (b.type === 1) {
                return -1;
            }
            return a.type - b.type;
        }
        if (a.amount !== b.amount) {
            return a.amount - b.amount;
        }
        return a.id.localeCompare(b.id);
    });
};

class Block {

    static create(data) {
        let transactions = __private.sortTransactions(data.transactions);
        let nextHeight = (data.previousBlock) ? data.previousBlock.height + 1 : 1,
            reward = __private.blockStatus.calcReward(nextHeight),
            totalFee = 0,
            totalAmount = 0,
            size = 0;

        let blockTransactions = [];
        let payloadHash = crypto.createHash('sha256');

        for (let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            let bytes = transactiosModule.getBytes(transaction);

            if (size + bytes.length > constants.maxPayloadLength) {
                break;
            }

            size += bytes.length;
            totalFee += transaction.fee;
            totalAmount += transaction.amount;

            blockTransactions.push(transaction);
            payloadHash.update(bytes);
        }

        let version = 0;
        let block = {
            version: version,
            totalAmount: totalAmount,
            totalFee: totalFee,
            reward: reward,
            payloadHash: payloadHash.digest().toString('hex'),
            timestamp: data.timestamp,
            numberOfTransactions: blockTransactions.length,
            payloadLength: size,
            previousBlock: data.previousBlock.id,
            generatorPublicKey: data.keypair.publicKey.toString('hex'),
            transactions: blockTransactions
        };

        try {
            block.blockSignature = Block.getSignature(block, data.keypair);
            // block = self.normalize(block);
        } catch (e) {
            throw Error(e.toString());
        }

        return block;
    }

    static getBytes(block) {
        let size = 4 + 4 + 64 + 4 + 8 + 8 + 8 + 4 + 32 + 32 + 64;
        let bytes;

        try {
            let bb = new ByteBuffer(size, true);
            bb.writeInt(block.version);
            bb.writeInt(block.timestamp);

            if (block.previousBlock) {
                bb.writeString(block.previousBlock)
            } else {
                bb.writeString('0')
            }

            bb.writeInt(block.numberOfTransactions);
            bb.writeLong(block.totalAmount);
            bb.writeLong(block.totalFee);
            bb.writeLong(block.reward);

            bb.writeInt(block.payloadLength);

            let payloadHashBuffer = new Buffer(block.payloadHash, 'hex');
            for (let i = 0; i < payloadHashBuffer.length; i++) {
                bb.writeByte(payloadHashBuffer[i]);
            }

            let generatorPublicKeyBuffer = new Buffer(block.generatorPublicKey, 'hex');
            for (let i = 0; i < generatorPublicKeyBuffer.length; i++) {
                bb.writeByte(generatorPublicKeyBuffer[i]);
            }

            if (block.blockSignature) {
                let blockSignatureBuffer = new Buffer(block.blockSignature, 'hex');
                for (let i = 0; i < blockSignatureBuffer.length; i++) {
                    bb.writeByte(blockSignatureBuffer[i]);
                }
            }

            bb.flip();
            bytes = bb.toBuffer();
        } catch (e) {
            throw Error(e.toString());
        }

        return bytes;
    }

    static getHash(block) {
        let bytes = new Uint8Array(Block.getBytes(block));
        let hash = crypto.createHash('sha256').update(bytes).digest();
        return hash;
    }

    static getId(block) {
        return Block.getHash(block).toString('hex');
    }

    static getSignature(block, keypair) {
        let hash = Block.getHash(block);
        let sign = ed.Sign(hash, keypair).toString('hex');
        return sign;
    }
}

module.exports = Block;