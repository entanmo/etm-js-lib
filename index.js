module.exports = {
    transaction: require("./src/base/transaction"),
    crypto: require("crypto"),
    utils: {
        ed: require("./src/utils/ed-nacl"),
        slots: require("./src/utils/slots"),
        address: require("./src/utils/address"),
        bignumber: require("./src/utils/bignumber")
    }
}