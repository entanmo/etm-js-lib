
module.exports = {
    transfer: {
        properties: {
            id: {
                type: "string"
            },
            height: {
                type: "integer"
            },
            blockId: {
                type: "string"
            },
            type: {
                type: "integer"
            },
            timestamp: {
                type: "integer"
            },
            senderPublicKey: {
                type: "string",
                format: "publicKey"
            },
            requesterPublicKey: {
                type: "string",
                format: "publicKey"
            },
            senderId: {
                type: "string"
            },
            recipientId: {
                type: "string"
            },
            amount: {
                type: "integer",
                minimum: 0,
                maximum: constants.totalAmount
            },
            fee: {
                type: "integer",
                minimum: 0,
                maximum: constants.totalAmount
            },
            signature: {
                type: "string",
                format: "signature"
            },
            signSignature: {
                type: "string",
                format: "signature"
            },
            asset: {
                type: "object"
            },
            args: {
                type: "array"
            },
            message: {
                type: "string",
                maxLength: 256
            }
        },
        required: ['type', 'timestamp', 'senderPublicKey', 'signature']
    },
    delegate: {},
    undelegate: {},
    lock: {},
    unlock: {},
    vote: {},
    delay: {},
    second: {},
    multi: {}
};