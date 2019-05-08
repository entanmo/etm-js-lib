const crypto = require("crypto");
const block = require("../src/base/block");

const slots = require("../src/utils/slots");
const ed = require("../src/utils/ed-nacl")

let secret = "real rally sketch sorry place parrot typical cart stone mystery age nominee";
let hash = crypto.createHash('sha256').update(secret, 'utf8').digest();
let keypair = ed.MakeKeypair(hash);
previousBlock = {
    version: 0,
    totalAmount: 0,
    totalFee: 0,
    reward: 600000000,
    payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp: 17961579,
    numberOfTransactions: 0,
    payloadLength: 0,
    previousBlock: '963238d8d372100de55fdce13d2fb9f054f11a00e94f54fde8660eb5f9f6510b',
    generatorPublicKey: 'cd12bd9d2bb7fdc58b54b332a9bfe32f075e2541f411e65054df8c66f81e5cb1',
    blockSignature: '907f237e57476fcbb6ec0159b1bee494f81ad8d5d5f5386f979d6632f329132cea4f77a3c0c431c608538c4aca4afbd30547df33f023830bc4a4a6d26fc4d909',
    id: 'b5ad296dbaa131d8d63f5569d9aa43b9fcd06d7db90e943792cdb1a10188d579',
    height: 2958
};

let newblock = block.create({
    keypair,
    timestamp: slots.getTime(),
    previousBlock,
    transactions: []
})

console.log(newblock)

let blockBytes = block.getBytes(newblock);
console.log(blockBytes)

let blockhash = block.getHash(newblock);
console.log(blockhash)

let blockid = block.getId(newblock);
console.log(blockid)

let blocksign = block.getSignature(newblock, keypair);
console.log(blocksign)
