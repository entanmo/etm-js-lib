const trs = require("../src/base/transaction")
const crypto = require("crypto")
const ed = require("../src/utils/ed-nacl")


let createTransaction = (data) => {
    let hash = crypto.createHash('sha256').update(data.secret, 'utf8').digest();
    let keypair = ed.MakeKeypair(hash);
    data.sender = {
        publicKey: keypair.publicKey.toString('hex')
    }
    data.keypair = keypair;
    return trs.create(data);
}

// let tr = createTransaction({
//     type: 0,
//     secret: "race forget pause shoe trick first abuse insane hope budget river enough",
//     amount: 1222222,
//     recipientId: "A79wqbYgZC5Bb923wWDXKjD7KBDn5BD6gg"
// })


// var secondHash = crypto.createHash('sha256').update("asd", 'utf8').digest();
// var secondKeypair = ed.MakeKeypair(secondHash);
// let tr = createTransaction({
//     type: 1,
//     secret: "immense buffalo organ pond illegal erupt prepare arrow cliff fit abstract task",
//     secondSecret: "asd",
//     secondKeypair
// })

// let tr = createTransaction({
//     type: 3,
//     secret: "worry net spend unfold desert trust dove waste grain people swap twelve",
//     votes: ["+c6b1f18afa85a21df50cf9580c63c0aca4643a4a4e4ec93c2e397c81e87879b9"],
//     fee: 10000000
// })

// let tr = createTransaction({
//     type: 101,
//     secret: "worry net spend unfold desert trust dove waste grain people swap twelve",
//     fee: 10000000,
//     args: ["100000000"]
// })


// let tr = createTransaction({
//     type: 9,
//     secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
//     fee: 10000000000,
//     name: "QQQ",
//     desc: "QQQ desc"
// })


// let tr = createTransaction({
//     type: 10,
//     secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
//     fee: 50000000000,
//     name: "QQQ.WWW",
//     desc: "QQQ desc",
//     maximum: '1000000000000',
//     precision: 4,
//     strategy: '',
//     allowBlacklist: 0,
//     allowWhitelist: 0,
//     allowWriteoff: 0
// })

// let tr = createTransaction({
//     type: 13,
//     secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
//     fee: 10000000,
//     currency: "QQQ.WWW",
//     amount: '1000000000000'
// })

// let tr = createTransaction({
//     type: 11,
//     secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
//     fee: 10000000,
//     currency: "QQQ.WWW",
//     flagType: 1,
//     flag: 2
// })

// let tr = createTransaction({
//     type: 12,
//     secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
//     fee: 10000000,
//     currency: "QQQ.WWW",
//     operator: "aaaa",
//     flag: 1,
//     list: ["a", "b"]
// })

let tr = createTransaction({
    type: 14,
    secret: "real rally sketch sorry place parrot typical cart stone mystery age nominee",
    recipientId: "A79wqbYgZC5Bb923wWDXKjD7KBDn5BD6gg",
    fee: 10000000,
    currency: "QQQ.WWW",
    amount: "100000000"
})

console.log(JSON.stringify(tr))

