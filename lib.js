const { Buffer } = require('buffer')

function * bytesIter (bytes, offset = 0, size) {
  const max = typeof size === 'number' ? offset + size : bytes.length
  while (offset < max) {
    yield bytes[offset++]
  }
}

function createCodec (name, encodeBytes, decodeBytes) {
  return Object.freeze({
    name,
    encodeBytes,
    decodeBytes,
    encode (bigint, byob = [], offset = 0) {
      for (const byte of encodeBytes(bigint)) {
        byob[offset++] = byte
      }
      return Buffer.isBuffer(byob) ? byob : Buffer.from(byob)
    },
    decode (bytes, offset, size) {
      return decodeBytes(bytesIter(bytes, offset, size))
    }
  })
}

module.exports = {
  createCodec,
  bytesIter
}
