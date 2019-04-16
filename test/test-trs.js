const trs = require("../src/base/transaction")

let tr = trs.createTransaction({
    type: 0,
    secret: "race forget pause shoe trick first abuse insane hope budget river enough",
    amount: 100000000,
    recipientId: "A79wqbYgZC5Bb923wWDXKjD7KBDn5BD6gg"
})

console.log(tr)