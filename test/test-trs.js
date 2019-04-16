const trs = require("../src/base/transaction")
const crypto = require("crypto")
const ed = require("../src/utils/ed-nacl")

// let tr = trs.createTransaction({
//     type: 0,
//     secret: "race forget pause shoe trick first abuse insane hope budget river enough",
//     amount: 1222222,
//     recipientId: "A79wqbYgZC5Bb923wWDXKjD7KBDn5BD6gg"
// })


var secondHash = crypto.createHash('sha256').update("asd", 'utf8').digest();
var secondKeypair = ed.MakeKeypair(secondHash);
let tr = trs.createTransaction({
    type: 1,
    secret: "immense buffalo organ pond illegal erupt prepare arrow cliff fit abstract task",
    secondSecret: "asd",
    secondKeypair
})

console.log(JSON.stringify(tr))