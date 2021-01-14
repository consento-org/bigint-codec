const { createCodec } = require('./lib.js')

function * encodeBytes (bigint) {
  if (bigint < 0n) {
    bigint = (bigint * -1n) << 1n | 1n
  } else {
    bigint = bigint << 1n
  }
  while (bigint >= 256n) {
    yield Number(bigint & 255n)
    bigint >>= 8n
  }
  yield Number(bigint)
}

function decodeBytes (bytes) {
  let result = 0n
  let shift = 0n
  for (const byte of bytes) {
    result += BigInt(byte) << shift
    shift += 8n
  }
  if ((result & 1n) === 1n) {
    return (result >> 1n) * -1n
  }
  return result >> 1n
}

module.exports = createCodec('big-int-quick', encodeBytes, decodeBytes)
