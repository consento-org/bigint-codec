# @consento/bigint-codec

`@consento/bigint-codec` is a [codecs][codecs] compatible encode and decoder for [BigInt][bigint] numbers.

> Turns `bigint` numbers to `Bytes` and `Bytes` to `bigint` numbers.

[codecs]: (https://github.com/mafintosh/codecs)
[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

## Usage

```javascript
const {
  bigUintLE,
  bigUintBE,
  bigIntLE,
  bigIntBE,
  bigIntQuick
} = require('@consento/bigint-codec')

bigUintLE.decode(
  bigUintLE.encode(256n)
)

// If you would like to know how many bytes are encoded, perhaps the iterator might be more useful.
for (const byte of bigUintLE.encodeBytes(256n)) {
  // If you need only to access the bytes and don't want to allocate a full ByteArray
}
const n256 = bigUintLE.decodeBytes([0, 2])
```

## Choosing byte formats

The byte formats are generally compatible with [the rust library num-bigint](https://github.com/rust-num/num-bigint).

- `biguint-le` - **only for n >= 0**; from lowest to highest bytes; **fastest!** It allows quick access and quick storage.
- `biguint-be` - **only for n >= 0**; from highest to lowest bytes; encoding slower than `le`, since we need to know first how many bytes are necessary.
- `bigint-le` - from lowest to highest bytes; will store the sign in the first byte; negative numbers will be stored inversely (255-0 instead of 0-255)
- `bigint-be` - from highest to lowest bytes; will store the sign in the last byte; slowest variant as it is very complex to map to javascript

Additionally we support a custom codec called `bigint-quick`. It is **not compatible** to other implementations but it is **the fastest signed bigint**
implementation we could find!

It will store the signature in the lowest bit of the first number and the absolute value from lowest to highest bytes - only slightly slower
than `big-uint-le`. If its okay to not be compatible to other libraries, this should be your first choice, else `big-int-le` is a fine choice.

## Smaller bundle size

Feel free to use the `require('@consento/bigint-codec/biguint-le')` access notation for smaller bundle sizes.

## License

[MIT](./LICENSE)
