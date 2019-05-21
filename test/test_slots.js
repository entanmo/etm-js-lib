const slots = require("../src/utils/slots")

// let t1 = (new Date()).getTime();
// let t2 = new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0)).getTime();
// let t3 = new Date("2018-10-12 20:00:00").getTime();

// console.log(t1)
// console.log(t2)
// console.log(t3)

console.log(slots.beginEpochTime(), slots.beginEpochTime().getTime())
console.log(slots.getTime())
console.log(slots.getRealTime())
console.log(slots.getSlotNumber())
console.log(slots.getSlotTime(slots.getSlotNumber()))
console.log(slots.getNextSlot())
console.log(slots.getHeightPerDay())