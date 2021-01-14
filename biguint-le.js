const { createCodec } = require('./lib.js')

function * encodeBytes (bigint) {
  if (bigint < 0n) {
    throw new Error(`Encoding a negative ${bigint} with big-uint-le will loose data.`)
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
  return result
}

module.exports = createCodec('big-uint-le', encodeBytes, decodeBytes)
