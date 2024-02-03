import CryptoJS from '@ohos/crypto-js'


/**
 * https://ohpm.openharmony.cn/#/cn/detail/@ohos%2Fcrypto-js
 * var hash = CryptoJS.SHA3("Message", { outputLength: 512 });
 * var hash = CryptoJS.SHA3("Message", { outputLength: 384 });
 * var hash = CryptoJS.SHA3("Message", { outputLength: 256 });
 * var hash = CryptoJS.SHA3("Message", { outputLength: 224 });
 * var hash = CryptoJS.RIPEMD160("Message");
 * var hash = CryptoJS.SHA256("Message");
 * var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
 * var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
 * var hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
 * var hash = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
 */
class CryptoJSHelper {
  md5(text: string): string {
    return CryptoJS.MD5(text);
  }

  HmacSHA256(message: string, secretPassphrase: string): string {
    return CryptoJS.HmacSHA256(message, secretPassphrase);
  }
}

const cryptoJSHelper = new CryptoJSHelper()
export default cryptoJSHelper as CryptoJSHelper