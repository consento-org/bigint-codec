# @consento/bigint-codec

`@consento/bigint-codec` is a [codecs][codecs] compatible encode and decoder for [BigInt][bigint] numbers.

[codecs]: (https://github.com/mafintosh/codecs)
[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

## Usage

```javascript
import bigint from '@consento/bigint-codec'

bigint.decode(
  bigint.encode(256n)
)

// Advanced:
for (const byte of bigint.encodeBytes(256n)) {
  // If you need only to access the bytes and don't want to allocate a full ByteArray
}
const n256 = bigint.decodeBytes([0, 2])
```

## License

[MIT](./LICENSE)
