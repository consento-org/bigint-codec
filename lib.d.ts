import { Buffer } from 'buffer'

namespace lib {
  type encodeBytes = (bigint: bigint) => Iterator<number>
  type decodeBytes = (bytes: Iterator<number>) => bigint
  function bytesIter (bytes: number[] | Uint8Array, offset?: number, size?: number): Iterator<number>
  interface Codec<Name extends string> {
    name: Name,
    encodeBytes: encodeBytes,
    decodeBytes: decodeBytes,
    encode: (bigint: bigint, offset?: number) => Buffer
    decode: (bytes: number[] | Uint8Array, offset?: number, size?: number) => bigint
  }
  function createCodec<Name extends string>(name: Name, encodeBytes: encodeBytes, decodeBytes: decodeBytes): Readonly<Codec<Name>>
}

export = lib
