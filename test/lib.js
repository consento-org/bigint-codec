const { test } = require('fresh-tape')
const { Buffer } = require('buffer')
const { encodeBytes, decodeBytes } = require('../biguint-le')
const { createCodec, bytesIter } = require('../lib')

function bytesStr (bytes) {
  return `<Bytes ${bytes.map(num => {
    const str = num.toString(16).toUpperCase()
    return str.length === 1 ? '0' + str : str
  }).join(' ')}>`
}

exports.bytesStr = bytesStr

test('bytesIter', t => {
  t.deepEquals(Array.from(bytesIter([0, 1, 2, 3, 4, 5])), [0, 1, 2, 3, 4, 5])
  t.deepEquals(Array.from(bytesIter([0, 1, 2, 3, 4, 5], 1)), [1, 2, 3, 4, 5])
  t.deepEquals(Array.from(bytesIter([0, 1, 2, 3, 4, 5], 1, 3)), [1, 2, 3])
  t.end()
})

test('encode to bytes', t => {
  const codec = createCodec('codec', encodeBytes, decodeBytes)
  const bytes = Buffer.alloc(5)
  t.equals(codec.encode(1n, bytes), bytes)
  t.deepEquals(bytes, Buffer.from([1, 0, 0, 0, 0]))
  bytes.fill(0)
  codec.encode(435n, bytes, 1)
  t.deepEquals(bytes, Buffer.from([0, 179, 1, 0, 0]))
  t.end()
})
