import webSocket from '@ohos.net.webSocket';
import hilog from '@ohos.hilog';
import cryptoJSHelper from '../../utils/CryptoJSHelper';
import Base64Helper from '../../utils/Base64Helper';
import log from '../../utils/LogUtils';

/**
 * host : 请求的主机
 * date : 当前时间戳，采用RFC1123格式，时间偏差需控制在300s内
 * GET  : 请求方式
 * authorization : base64编码的签名信息
 */
class Params {
  APPID = '6d73e094';
  APISecret = 'OGU2ZGU1MGQzYWNlZmFiZDdjMjIzOWIx';
  APIKey = 'be39b16ecdc6c71bc6a872eb7f065cfa';
  HOST = 'spark-api.xf-yun.com';
  DOMAIN = 'generalv3.5';
  VERSION = 'v3.5'

  domain(): string {
    return this.DOMAIN;
  }

  wss(): string {
    return 'wss://' + this.HOST + '/' + this.VERSION + '/chat';
  }

  host(): string {
    return this.HOST;
  }

  date(): string {
    const curTime = new Date();
    const dateString = curTime.toUTCString();
    return dateString;
  }

  authorization(date: string): string {
    var tmp = this.auth1(date);
    var tmp_sha = this.auth2(tmp);
    var signature = this.auth3(tmp_sha);
    var authorization_origin = this.auth4(signature);
    var authorization = this.auth5(authorization_origin);
    log.log('date : ' + date);
    log.log('tmp : ' + tmp);
    log.log('tmp_sha : ' + tmp_sha);
    log.log('signature : ' + signature);
    log.log('authorization_origin : ' + authorization_origin);
    log.log('authorization : ' + authorization);
    return authorization;
  }

  auth1(date: string): string {
    var tmp = "host: " + "spark-api.xf-yun.com" + "\n"
    tmp += "date: " + date + "\n"
    tmp += "GET " + "/" + this.VERSION + "/chat" + " HTTP/1.1"
    return tmp;
  }

  auth2(tmp: string): string {
    var tmp_sha = cryptoJSHelper.hMacSHA1(tmp, this.APISecret).toString()
    return tmp_sha;
  }

  auth3(tmp_sha: string): string {
    const uint8Array = new Uint8Array(tmp_sha.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    let signature = Base64Helper.encodeToString(uint8Array);
    return signature;
  }

  auth4(signature: string): string {
    var authorization_origin = "api_key='" + this.APIKey + "', algorithm='hmac-sha256', headers='host date request-line', signature='" + signature + "'"
    return authorization_origin;
  }

  // wss://spark-api.xf-yun.com/v1.1/chat
  // ?authorization=YXBpX2tleT0iYWRkZDIyNzJiNmQ4YjdjOGFiZGQ3OTUzMTQyMGNhM2IiLCBhbGdvcml0aG09ImhtYWMtc2hhMjU2IiwgaGVhZGVycz0iaG9zdCBkYXRlIHJlcXVlc3QtbGluZSIsIHNpZ25hdHVyZT0iejVnSGR1M3B4VlY0QURNeWs0Njd3T1dEUTlxNkJRelIzbmZNVGpjL0RhUT0i
  // &date=Fri%2C+05+May+2023+10%3A43%3A39+GMT
  // &host=spark-api.xf-yun.com
  url(authorization: string, date: string, host: string): string {
    var v = {
      "authorization": authorization,
      "date": date,
      "host": host
    };
    let url = `${this.wss()}?authorization=${v.authorization}&date=${v.date}&host=${v.host}`;
    console.log(url);
    //var param = URLHelper.encode(JSON.stringify(v))
    //var url = this.wss() + '?' + param;
    return url;
  }

  auth5(authorization_origin: string): string {
    const uint8Array = new Uint8Array(authorization_origin.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    var authorization = Base64Helper.encodeToString(uint8Array);
    return authorization;
  }

  bytesToHexString(bytes: Uint8Array): string {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  printParams() {
    var test = 'domain : ' + this.domain() + '\n'
    + 'wss : ' + this.wss() + '\n'
    + 'host : ' + this.host() + '\n'
    + 'date : ' + this.date() + '\n'
    + 'authorization : ' + this.authorization(this.date()) + '\n'
    hilog.info(0x0000, 'testTag', '%{public}s', '\n' + test + '\n');
  }

  test() {
    //this.printParams();
    // Base64Helper.encode()
    var date = this.date();
    var authorization = this.authorization(date);
    var host = this.host();
    var url = this.url(authorization, date, host);
    log.log('url->' + url);
  }

  getUrl(): string {
    var date = this.date();
    var authorization = this.authorization(date);
    var host = this.host();
    var url = this.url(authorization, date, host);
    log.log('url->' + url);
    return url;
  }
}

class WebSocketHelper {
  ws = webSocket.createWebSocket()

  register(defaultIpAddress: string) {
    log.log('defaultIpAddress:' + defaultIpAddress)
    this.ws.on('open', (err, value) => {
      log.log("WebSocketHelper-> on open, status:" + JSON.stringify(value));
      // 当收到on('open')事件时，可以通过send()方法与服务器进行通信

    });
    this.ws.on('message', (err, value) => {
      log.log("WebSocketHelper-> on message, message:" + value);
    });
    this.ws.on('close', (err, value) => {
      log.log("WebSocketHelper-> on close, code is " + value.code + ", reason is " + value.reason);
    });
    this.ws.on('error', (err) => {
      log.log("WebSocketHelper-> on error, error:" + JSON.stringify(err));
    });
    this.ws.connect(defaultIpAddress, (err, value) => {
      if (!err) {
        log.log("WebSocketHelper-> Connected successfully. Err:" + JSON.stringify(err));
      } else {
        log.log("WebSocketHelper-> Connection failed. Err:" + JSON.stringify(err));
      }
    });
  }

  test() {
    this.register(params.getUrl());
  }

  send() {
    this.ws.send("故宫在哪儿?", (err, value) => {
      if (!err) {
        log.log("Message sent successfully. Err:" + JSON.stringify(err));
      } else {
        log.log("Failed to send the message. Err:" + JSON.stringify(err));
      }
    });
  }

  close() {
    this.ws.close((err, value) => {
      if (!err) {
        log.log("Connection closed successfully");
      } else {
        log.log("Failed to close the connection. Err: " + JSON.stringify(err));
      }
    });
  }


  testConnect() {
    log.log('defaultIpAddress:' + '')
    this.ws.on('open', (err, value) => {
      log.log("WebSocketHelper-> on open, status:" + JSON.stringify(value));
      // 当收到on('open')事件时，可以通过send()方法与服务器进行通信

    });
    this.ws.on('message', (err, value) => {
      log.log("WebSocketHelper-> on message, message:" + value);
    });
    this.ws.on('close', (err, value) => {
      log.log("WebSocketHelper-> on close, code is " + value.code + ", reason is " + value.reason);
    });
    this.ws.on('error', (err) => {
      log.log("WebSocketHelper-> on error, error:" + JSON.stringify(err));
    });
    this.ws.connect('192.168.0.12', (err, value) => {
      if (!err) {
        log.log("WebSocketHelper-> Connected successfully. Err:" + JSON.stringify(err));
      } else {
        log.log("WebSocketHelper-> Connection failed. Err:" + JSON.stringify(err));
      }
      this.send()
    });
  }
}

const params = new Params();
const webSocketHelper = new WebSocketHelper()

export default webSocketHelper as WebSocketHelper