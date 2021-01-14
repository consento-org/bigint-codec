const { test } = require('fresh-tape')
const { Buffer } = require('buffer')
const bigUintBE = require('../biguint-be')
const { bytesStr } = require('./lib')

test(bigUintBE.name, t => {
  t.throws(() => {
    bigUintBE.encode(-1)
  })
  for (let [num, bytes] of [
    [0, [0]],
    [1, [1]],
    [127, [127]],
    [128, [128]],
    [129, [129]],
    [255, [255]],
    [256, [1, 0]],
    [257, [1, 1]],
    [382, [1, 126]],
    [383, [1, 127]],
    [65535, [255, 255]],
    [65536, [1, 0, 0]],
    [65537, [1, 0, 1]],
    [65538, [1, 0, 2]],
    [16777215, [255, 255, 255]],
    [
      74156619719791337109230812903812383810298301928301238383103810923n,
      [0xb4, 0x43, 0xc7, 0x1a, 0x6e, 0xc1, 0x4a, 0xb7, 0x55, 0x15, 0x41, 0xe9, 0xf2, 0x6a, 0xf6, 0x33, 0x7f, 0x3f, 0xde, 0xa4, 0x69, 0x3d, 0x8d, 0x68, 0x3d, 0x9d, 0x6b]
    ]
  ]) {
    num = BigInt(num)
    t.deepEquals(bigUintBE.encode(num), Buffer.from(bytes), `encode(${num.toString()}n)`)
    t.equals(bigUintBE.decode(Buffer.from(bytes)), num, `decode(${bytesStr(bytes)})`)
  }
  t.end()
})
