const ByteBuffer = require("bytebuffer");

let byteBuffer = new ByteBuffer(1 + 4 + 32 + 32 + 8 + 8 + 64 + 64 + 0, true);

byteBuffer.writeByte(10)
byteBuffer.writeInt(1092)
byteBuffer.writeLong(30)
byteBuffer.writeString("hello world")
byteBuffer.flip();
console.log(byteBuffer.toBuffer())