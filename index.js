let bigIntLE, bigIntBE, bigIntQuick, bigUintBE, bigUintLE, bytesIter, createCodec
module.exports = Object.freeze(Object.defineProperties({}, {
  bigIntBE: {
    enumerable: true,
    get () {
      if (bigIntBE === undefined) bigIntBE = require('./bigint-be')
      return bigIntBE
    }
  },
  bigIntLE: {
    enumerable: true,
    get () {
      if (bigIntLE === undefined) bigIntLE = require('./bigint-le')
      return bigIntLE
    }
  },
  bigIntQuick: {
    enumerable: true,
    get () {
      if (bigIntQuick === undefined) bigIntQuick = require('./bigint-quick')
      return bigIntQuick
    }
  },
  bigUintBE: {
    enumerable: true,
    get () {
      if (bigUintBE === undefined) bigUintBE = require('./biguint-be')
      return bigUintBE
    }
  },
  bigUintLE: {
    enumerable: true,
    get () {
      if (bigUintLE === undefined) bigUintLE = require('./biguint-le')
      return bigUintLE
    }
  },
  bytesIter: {
    enumerable: true,
    get () {
      if (bytesIter === undefined) bytesIter = require('./lib').bytesIter
      return bytesIter
    }
  },
  createCodec: {
    enumerable: true,
    get () {
      if (createCodec === undefined) createCodec = require('./lib').createCodec
      return createCodec
    }
  }
}))
