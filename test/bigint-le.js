const { test } = require('fresh-tape')
const { Buffer } = require('buffer')
const bigIntLE = require('../bigint-le')
const { bytesStr } = require('./lib')

test(bigIntLE.name, t => {
  for (let [num, bytes] of [
    [0, [0]],
    [1, [1]],
    [127, [127]],
    [128, [128, 0]],
    [129, [129, 0]],
    [255, [255, 0]],
    [256, [0, 1]],
    [257, [1, 1]],
    [382, [126, 1]],
    [383, [127, 1]],
    [384, [128, 1]],
    [512, [0, 2]],
    [513, [1, 2]],
    [65535, [255, 255, 0]],
    [65536, [0, 0, 1]],
    [65537, [1, 0, 1]],
    [65538, [2, 0, 1]],
    [16777215, [255, 255, 255, 0]],
    [
      74156619719791337109230812903812383810298301928301238383103810923n,
      [0x6b, 0x9d, 0x3d, 0x68, 0x8d, 0x3d, 0x69, 0xa4, 0xde, 0x3f, 0x7f, 0x33, 0xf6, 0x6a, 0xf2, 0xe9, 0x41, 0x15, 0x55, 0xb7, 0x4a, 0xc1, 0x6e, 0x1a, 0xc7, 0x43, 0xb4, 0x00]
    ],
    [-1, [255]],
    [-127, [129]],
    [-128, [128]],
    [-129, [127, 255]],
    [-255, [1, 255]],
    [-256, [0, 255]],
    [-257, [255, 254]],
    [-382, [130, 254]],
    [-383, [129, 254]],
    [-384, [128, 254]],
    [-512, [0, 254]],
    [-513, [255, 253]],
    [-65535, [1, 0, 255]],
    [-65536, [0, 0, 255]],
    [-65537, [255, 255, 254]],
    [-65538, [254, 255, 254]],
    [-16777215, [1, 0, 0, 255]],
    [
      -74156619719791337109230812903812383810298301928301238383103810923n,
      [0x95, 0x62, 0xc2, 0x97, 0x72, 0xc2, 0x96, 0x5b, 0x21, 0xc0, 0x80, 0xcc, 0x09, 0x95, 0x0d, 0x16, 0xbe, 0xea, 0xaa, 0x48, 0xb5, 0x3e, 0x91, 0xe5, 0x38, 0xbc, 0x4b, 0xff]
    ]
  ]) {
    num = BigInt(num)
    t.deepEquals(bigIntLE.encode(num), Buffer.from(bytes), `encode(${num.toString()}n)`)
    t.equals(bigIntLE.decode(Buffer.from(bytes)), num, `decode(${bytesStr(bytes)})`)
  }
  t.end()
})