const { createCodec } = require('./lib.js')

function * encodeBytes (bigint) {
  if (bigint === 0n) {
    yield 0
    return
  }
  let neg = false
  if (bigint < 0n) {
    neg = true
    bigint = (-1n * bigint) - 1n
    if (bigint === 0n) {
      yield 0xff
      return
    }
  }
  let max = 1n
  let shift = -8n
  while (max <= bigint) {
    max = max << 8n
    shift += 8n
  }
  let mask = 255n << shift
  let first = true
  if (neg) {
    while (shift >= 0n) {
      const rem = bigint & mask
      bigint -= rem
      mask = mask >> 8n
      const result = 255 - Number(rem >> shift)
      if (first) {
        first = false
        if (result < 128) {
          yield 0xff
        }
      }
      yield result
      shift -= 8n
    }
    return
  }
  while (shift >= 0n) {
    const rem = bigint & mask
    bigint -= rem
    mask = mask >> 8n
    const result = Number(rem >> shift)
    if (first) {
      first = false
      if (result > 127) {
        yield 0
      }
    }
    yield result
    shift -= 8n
  }
}

function decodeBytes (bytes) {
  const iter = bytes[Symbol.iterator]()
  const { value: first, done: empty } = iter.next()
  if (empty) {
    return 0n
  }
  let result = 0n
  if (first === 0 || first < 128) {
    // positive
    if (first !== 0) {
      result = BigInt(first)
    } else {
      const next = iter.next()
      if (next.done) {
        return 0n
      }
      result = BigInt(next.value)
    }
    for (const byte of iter) {
      result = (result << 8n) + BigInt(byte)
    }
  } else {
    // negative
    if (first !== 255) {
      result = BigInt(255 - first)
    } else {
      const next = iter.next()
      if (next.done) {
        return -1n
      }
      result = BigInt(255 - next.value)
    }
    for (const byte of iter) {
      result = (result << 8n) + BigInt(255 - byte)
    }
    result = (result + 1n) * -1n
  }
  return result
}

module.exports = createCodec('bigIntBE', encodeBytes, decodeBytes)
