const { test } = require('fresh-tape')
const bigIntBE = require('../bigint-be')
const bigIntLE = require('../bigint-le')
const bigIntQuick = require('../bigint-quick')
const bigUintBE = require('../biguint-be')
const bigUintLE = require('../biguint-le')
const { createCodec, bytesIter } = require('../lib')
const api = require('../')

test('api', t => {
  t.deepEquals(api, {
    bigIntBE,
    bigIntLE,
    bigIntQuick,
    bigUintBE,
    bigUintLE,
    createCodec,
    bytesIter
  })
  t.end()
})
