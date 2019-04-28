const base58check0 = require("base58check");
const base58check = require("../src/utils/base58check");
const crypto = require('crypto')

const NORMAL_PREFIX = 'A'

function genAddress0(publicKey) {
    if (typeof publicKey === 'string') {
        publicKey = Buffer.from(publicKey, 'hex')
    }
    let h1 = crypto.createHash('sha256').update(publicKey).digest()
    let h2 = crypto.createHash('ripemd160').update(h1).digest()
    return NORMAL_PREFIX + base58check0.encode(h2, "")//默认 prefix = '00'
}

function genAddress(publicKey) {
    if (typeof publicKey === 'string') {
        publicKey = Buffer.from(publicKey, 'hex')
    }
    console.log(publicKey.toString('hex'))
    let h1 = crypto.createHash('sha256').update(publicKey).digest()
    console.log("h1", h1.toString('hex'))
    let h2 = crypto.createHash('ripemd160').update(h1).digest()
    console.log("h2", h2.toString('hex'))
    return NORMAL_PREFIX + base58check.encode(h2)
}

console.log("111", genAddress0("07187396934e832fc08c8ec0f3095d6c7cce3eb2c53568f0bbafebb3ffa7c582"))

console.log("222", genAddress("07187396934e832fc08c8ec0f3095d6c7cce3eb2c53568f0bbafebb3ffa7c582"))