module.exports = {
    transaction: require("./src/base/transaction"),
    crypto: require("crypto"),
    utils: {
        ed: require("./src/utils/ed"),
        ed_nacl: require("./src/utils/ed-nacl")
    }

}