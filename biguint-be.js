const { createCodec } = require('./lib.js')

function * encodeBytes (bigint) {
  if (bigint < 0n) {
    throw new Error(`Encoding a negative ${bigint} with big-uint-be will loose data.`)
  } else if (bigint === 0n) {
    yield 0
    return
  }
  let max = 1n
  let shift = -8n
  while (max <= bigint) {
    max = max << 8n
    shift += 8n
  }
  let mask = 255n << shift
  while (shift >= 0n) {
    const rem = bigint & mask
    bigint -= rem
    mask = mask >> 8n
    yield Number(rem >> shift)
    shift -= 8n
  }
}

function decodeBytes (bytes) {
  let result = 0n
  for (const byte of bytes) {
    result = result << 8n
    result += BigInt(byte)
  }
  return result
}

module.exports = createCodec('bigUintBE', encodeBytes, decodeBytes)
