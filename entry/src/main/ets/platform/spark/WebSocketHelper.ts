import webSocket from '@ohos.net.webSocket';
import hilog from '@ohos.hilog';
import cryptoFramework from '@ohos.security.cryptoFramework';

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

  domain(): String {
    return 'generalv3.5';
  }

  wss(): String {
    return 'wss://spark-api.xf-yun.com/v3.5/chat';
  }

  host(): String {
    return 'spark-api.xf-yun.com';
  }

  date(): String {
    const curTime = new Date();
    const dateString = curTime.toUTCString();
    return dateString;
  }

  authorization() : String {
    var tmp = "host: " + "spark-api.xf-yun.com" + "\n"
    tmp += "date: " + this.date() + "\n"
    tmp += "GET " + "/v1.1/chat" + " HTTP/1.1"



    return '';
  }


  printParams() {
    var test = 'domain : ' + this.domain() + '\n'
      + 'wss : ' + this.wss() + '\n'
      + 'host : ' + this.host() + '\n'
      + 'date : ' + this.date() + '\n'
      + 'authorization : ' + this.authorization() + '\n'
    //console.log('\n'+test+'\n');
    hilog.info(0x0000, 'testTag', '%{public}s', '\n'+test+'\n');
  }

  test() {
    this.printParams();


    // date
    // const curTime = new Date();
    // const dateString = curTime.toUTCString();
    // console.log(dateString)
    // // 如果需要与 Python 的 wsgiref.handlers.format_date_time 函数输出一致的格式
    // // 可以使用以下方式格式化日期时间：
    // const formattedDateTime = curTime.toISOString().replace(/T/, ' ').substring(0, 29); // "YYYY-MM-DD HH:MM:SS GMT"
    // console.log(formattedDateTime)
  }
}

class WebSocketHelper {
  defaultIpAddress = "ws://";
  ws = webSocket.createWebSocket()
  register() {
    this.ws.on('open', (err, value) => {
      console.log("on open, status:" + JSON.stringify(value));
      // 当收到on('open')事件时，可以通过send()方法与服务器进行通信

    });
    this.ws.on('message', (err, value) => {
      console.log("on message, message:" + value);
    });
    this.ws.on('close', (err, value) => {
      console.log("on close, code is " + value.code + ", reason is " + value.reason);
    });
    this.ws.on('error', (err) => {
      console.log("on error, error:" + JSON.stringify(err));
    });
    this.ws.connect(this.defaultIpAddress, (err, value) => {
      if (!err) {
        console.log("Connected successfully");
      } else {
        console.log("Connection failed. Err:" + JSON.stringify(err));
      }
    });
  }

  test() {
    params.test();
  }

  send() {
    this.ws.send("Hello, server!", (err, value) => {
      if (!err) {
        console.log("Message sent successfully");
      } else {
        console.log("Failed to send the message. Err:" + JSON.stringify(err));
      }
    });
  }

  close() {
    this.ws.close((err, value) => {
      if (!err) {
        console.log("Connection closed successfully");
      } else {
        console.log("Failed to close the connection. Err: " + JSON.stringify(err));
      }
    });
  }
}

const params = new Params();
const webSocketHelper = new WebSocketHelper()
export default webSocketHelper as WebSocketHelper