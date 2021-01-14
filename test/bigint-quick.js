const { test } = require('fresh-tape')
const { Buffer } = require('buffer')
const bigIntQuick = require('../bigint-quick')
const { bytesStr } = require('./lib')

test(bigIntQuick.name, t => {
  for (const [num, bytes] of [
    [0n, [0]],
    [1n, [2]],
    [-1n, [3]],
    [127n, [254]],
    [-127n, [255]],
    [128n, [0, 1]],
    [-128n, [1, 1]],
    [256n, [0, 2]],
    [-256n, [1, 2]],
    [
      74156619719791337109230812903812383810298301928301238383103810923n,
      [0xd6, 0x3a, 0x7b, 0xd0, 0x1a, 0x7b, 0xd2, 0x48, 0xbd, 0x7f, 0xfe, 0x66, 0xec, 0xd5, 0xe4, 0xd3, 0x83, 0x2a, 0xaa, 0x6e, 0x95, 0x82, 0xdd, 0x34, 0x8e, 0x87, 0x68, 0x01]
    ],
    [
      -5151512441412345551241452345234589744141230997656582893747827389n,
      [0x7b, 0xe5, 0x47, 0xb9, 0x4f, 0x2b, 0x97, 0x25, 0xa2, 0xd7, 0xb5, 0x3f, 0x95, 0x98, 0x9e, 0x1e, 0xa7, 0xde, 0x68, 0x10, 0x9d, 0xdf, 0x62, 0x8f, 0x96, 0x0b, 0x19]
    ]
  ]) {
    t.deepEquals(bigIntQuick.encode(num), Buffer.from(bytes), `encode(${num.toString()}n)`)
    t.equals(bigIntQuick.decode(Buffer.from(bytes)), num, `decode(${bytesStr(bytes)})`)
  }
  t.end()
})
