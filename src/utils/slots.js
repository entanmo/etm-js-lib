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

module.exports = {

  interval: 3,      // 出块时间

  delegates: 101,    // 代理数量（不为101时需要同步修改gegesisBlock.json）

  roundBlocks: 101 * 1,// 每轮区块的数量

  leading: 7,        // 前导位数

  powTimeOut: 2,   // pow超时时间（单位s）

  beginEpochTime() {
    var d = new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0));//月份从0开始，小时相隔8

    return d;
  },

  getTime: function (time) {
    if (time === undefined) {
      time = (new Date()).getTime();
      // const milliseconds = global.library.synctime.now();
      // time = (new Date(milliseconds)).getTime();
    }
    var d = this.beginEpochTime();
    var t = d.getTime();
    return Math.floor((time - t) / 1000);
  },

  getRealTime: function (epochTime) {
    if (epochTime === undefined) {
      epochTime = this.getTime()
    }
    var d = this.beginEpochTime();
    var t = Math.floor(d.getTime() / 1000) * 1000;
    return t + epochTime * 1000;
  },

  getSlotNumber: function (epochTime) {
    if (epochTime === undefined) {
      epochTime = this.getTime()
    }
    return Math.floor(epochTime / this.interval);
  },

  getSlotTime: function (slot) {
    return slot * this.interval;
  },

  getNextSlot: function () {
    var slot = this.getSlotNumber();

    return slot + 1;
  },

  getLastSlot: function (nextSlot) {
    return nextSlot + this.delegates;
  },

  roundTime: function (date) {
    return Math.floor(date.getTime() / 1000) * 1000
  },

  getHeightPerDay: function () {
    return Math.floor(24 * 60 * 60 / this.interval);
  },
}
