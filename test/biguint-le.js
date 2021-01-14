const { test } = require('fresh-tape')
const { Buffer } = require('buffer')
const bigUintLE = require('../biguint-le')
const { bytesStr } = require('./lib')

test(bigUintLE.name, t => {
  t.throws(() => {
    bigUintLE.encode(-1)
  })
  for (let [num, bytes] of [
    [0, [0]],
    [1, [1]],
    [127, [127]],
    [128, [128]],
    [129, [129]],
    [255, [255]],
    [256, [0, 1]],
    [257, [1, 1]],
    [382, [126, 1]],
    [383, [127, 1]],
    [384, [128, 1]],
    [512, [0, 2]],
    [513, [1, 2]],
    [65535, [255, 255]],
    [65536, [0, 0, 1]],
    [65537, [1, 0, 1]],
    [65538, [2, 0, 1]],
    [16777215, [255, 255, 255]],
    [
      74156619719791337109230812903812383810298301928301238383103810923n,
      [0x6b, 0x9d, 0x3d, 0x68, 0x8d, 0x3d, 0x69, 0xa4, 0xde, 0x3f, 0x7f, 0x33, 0xf6, 0x6a, 0xf2, 0xe9, 0x41, 0x15, 0x55, 0xb7, 0x4a, 0xc1, 0x6e, 0x1a, 0xc7, 0x43, 0xb4]
    ]
  ]) {
    num = BigInt(num)
    t.deepEquals(bigUintLE.encode(num), Buffer.from(bytes), `encode(${num.toString()}n)`)
    t.equals(bigUintLE.decode(Buffer.from(bytes)), num, `decode(${bytesStr(bytes)})`)
  }
  t.end()
})
