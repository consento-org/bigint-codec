const { createCodec } = require('./lib.js')

function * encodeBytes (bigint) {
  if (bigint < 0n) {
    if (bigint === -1n) {
      yield 0xff
      return
    }
    bigint = (bigint * -1n) - 1n
    while (bigint >= 256n) {
      yield (255 - Number(bigint % 256n))
      bigint >>= 8n
    }
    const last = 255 - Number(bigint)
    yield last
    if (last < 128) {
      yield 0xff
    }
    return
  }
  while (bigint >= 256n) {
    yield Number(bigint & 255n)
    bigint >>= 8n
  }
  yield Number(bigint)
  if (bigint > 127n) {
    yield 0
  }
}

function decodeBytes (bytes) {
  let result = 0n
  let last = 0
  let shift = 0n
  let mask = 255n
  for (const byte of bytes) {
    last = byte
    result |= BigInt(byte) << shift
    mask |= 255n << shift
    shift += 8n
  }
  if (last >= 128) {
    result = ((mask ^ result) * -1n) - 1n
  }
  return result
}

module.exports = createCodec('bigIntLE', encodeBytes, decodeBytes)
