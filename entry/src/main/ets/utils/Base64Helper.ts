import { Base64 } from '@ohos/base64'
import hidebug from '@ohos.hidebug'

/**
 * 1. 加密
 * Base64.encode(input:Uint8Array)
 * Base64.encodeBytesToBytes(source: Uint8Array)
 * Base64.encodeToString(input:Uint8Array)
 * Base64.encodeBytes(bytes: Uint8Array)
 * Base64.encodeToFile(filePath: string, data: Uint8Array)
 * Base64.encodeFromFile(filePath: string)
 * 2. 解密
 * Base64.decode(input:Uint8Array|string)
 * Base64.decodeToFile(filePath: string, data: Uint8Array | string)
 * Base64.decodeFromFile(filePath: string)
 * 3. 其他
 * Base64.bytesToString(bytes:Uint8Array)
 * Base64.stringToBytes(str: string)
 */
class Base64Helper {
  encode(input: Uint8Array): Uint8Array {
    console.log('Base64Helper-encode:' + input.toLocaleString());
    var encode = Base64.encode(input);
    console.log('Base64Helper-encode: ' + encode.toLocaleString());
    //var decode = Base64.decode(encode);
    //console.log('Base64Helper-encode: ' + decode.toLocaleString());
    return encode;
  }

  encodeToString(input: Uint8Array): string {
    var encode = Base64.encodeToString(input);
    console.log('Base64Helper-encode: ' + encode.toLocaleString());
    return encode;
  }

  stringToBytes(text: string): Uint8Array {
    return Base64.stringToBytes(text)
  }
}

const base64Helper = new Base64Helper()

export default base64Helper as Base64Helper