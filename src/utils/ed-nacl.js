/*
 * Copyright © 2018 EnTanMo Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the EnTanMo Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

'use strict';

const nacl = require("tweetnacl");

module.exports = {
  MakeKeypair: function (hash) {
    let publicKey, privateKey;

    try {
      let keypair = nacl.sign.keyPair.fromSeed(hash);
      publicKey = Buffer.from(keypair.publicKey.buffer);
      privateKey = Buffer.from(keypair.secretKey.buffer);
    } catch (err) {
      console.log("makeKaypair:", err);
      return null;
    }

    return {
      publicKey,
      privateKey
    };
  },

  Sign: function (hash, keypair) {
    let signature;
    try {
      signature = nacl.sign.detached(hash, keypair.privateKey);
      signature = Buffer.from(signature.buffer);
    } catch (err) {
      console.log("sign:", err);
      return null;
    }

    return signature;
  },

  Verify: function (hash, signatureBuffer, publicKeyBuffer) {
    let result = false;

    try {
      result = nacl.sign.detached.verify(hash, signatureBuffer, publicKeyBuffer);
    } catch (err) {
      console.log("verify:", err);
      result = undefined;
    }

    return result;
  }
}