import webSocket from '@ohos.net.webSocket';
import hilog from '@ohos.hilog';
import cryptoJSHelper from '../../utils/CryptoJSHelper';
import Base64Helper from '../../utils/Base64Helper';
import Log from '../../utils/LogUtils';
import promptAction from '@ohos.promptAction';
import util from '@ohos.util';


/**
 * host : 请求的主机
 * date : 当前时间戳，采用RFC1123格式，时间偏差需控制在300s内
 * GET  : 请求方式
 * authorization : base64编码的签名信息
 */
class Params {
  // APPID = '6d73e094';
  // APISecret = 'OGU2ZGU1MGQzYWNlZmFiZDdjMjIzOWIx';
  // APIKey = 'be39b16ecdc6c71bc6a872eb7f065cfa';
  // HOST = 'spark-api.xf-yun.com';
  // DOMAIN = 'generalv3.5';
  // VERSION = 'v3.5'

  APPID = '6d73e094';
  APISecret = 'OGU2ZGU1MGQzYWNlZmFiZDdjMjIzOWIx';
  APIKey = 'be39b16ecdc6c71bc6a872eb7f065cfa';
  HOST = 'spark-api.xf-yun.com';
  DOMAIN = 'general'; //'generalv3.5';
  VERSION = 'v1.1'

  // APPID = '6d73e094'
  // APISecret = 'MjlmNzkzNmZkMDQ2OTc0ZDdmNGE2ZTZi'
  // APIKey = 'addd2272b6d8b7c8abdd79531420ca3b'
  // HOST = 'spark-api.xf-yun.com'
  // DOMAIN = 'generalv3.5'
  // VERSION = 'v1.1'

  wss(): string {
    return 'wss://' + this.HOST + '/' + this.VERSION + '/chat';
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
    Log.log('date : ' + date);
    Log.log('tmp : ' + tmp);
    Log.log('tmp_sha : ' + tmp_sha);
    Log.log('signature : ' + signature);
    Log.log('authorization_origin : ' + authorization_origin);
    Log.log('authorization : ' + authorization);
    return authorization;
  }

  auth1(date: string): string {
    var tmp = "host: " + "spark-api.xf-yun.com" + "\n"
    tmp += "date: " + date + "\n"
    tmp += "GET " + "/" + this.VERSION + "/chat" + " HTTP/1.1"
    return tmp;
  }

  auth2(tmp: string): string {
    var tmp_sha = cryptoJSHelper.HmacSHA256(tmp, this.APISecret)
    return tmp_sha.toString();
  }

  auth3(tmp_sha: string): string {
    const uint8Array = new Uint8Array(tmp_sha.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    let signature = Base64Helper.encodeToString(uint8Array);
    return signature;
  }

  auth4(signature: string): string {
    let authorization_origin = `api_key="${this.APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
    //let authorization_origin = `api_key="${this.APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
    //let authorization_origin = encodeURIComponent(url)
    return authorization_origin
  }

  // wss://spark-api.xf-yun.com/v1.1/chat
  // ?authorization=YXBpX2tleT0iYWRkZDIyNzJiNmQ4YjdjOGFiZGQ3OTUzMTQyMGNhM2IiLCBhbGdvcml0aG09ImhtYWMtc2hhMjU2IiwgaGVhZGVycz0iaG9zdCBkYXRlIHJlcXVlc3QtbGluZSIsIHNpZ25hdHVyZT0iejVnSGR1M3B4VlY0QURNeWs0Njd3T1dEUTlxNkJRelIzbmZNVGpjL0RhUT0i
  // &date=Fri%2C+05+May+2023+10%3A43%3A39+GMT
  // &host=spark-api.xf-yun.com
  url(authorization: string, date: string, host: string): string {
    let url = `${this.wss()}?` + encodeURI(`authorization=${authorization}&date=${date}&host=${host}`);
    Log.log(url);
    //var param = URLHelper.encode(JSON.stringify(v))
    //var url = this.wss() + '?' + param;
    return url;
  }

  auth5(authorization_origin: string): string {
    let tmp = `api_key="addd2272b6d8b7c8abdd79531420ca3b", algorithm="hmac-sha256", headers="host date request-line", signature="z5gHdu3pxVV4ADMyk467wOWDQ9q6BQzR3nfMTjc/DaQ="`
    // const uint8Array = new Uint8Array(tmp.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const uint8Array = Base64Helper.stringToBytes(authorization_origin)
    var authorization = Base64Helper.encodeToString(uint8Array);
    return authorization;
  }

  bytesToHexString(bytes: Uint8Array): string {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  printParams() {
    var test = 'domain : ' + this.DOMAIN + '\n'
    + 'wss : ' + this.wss() + '\n'
    + 'host : ' + this.HOST + '\n'
    + 'date : ' + this.date() + '\n'
    + 'authorization : ' + this.authorization(this.date()) + '\n'
    hilog.info(0x0000, 'testTag', '%{public}s', '\n' + test + '\n');
  }

  test() {
    //this.printParams();
    // Base64Helper.encode()
    var date = 'Fri, 05 May 2023 10:43:39 GMT' //this.date();
    var authorization = this.authorization(date);
    var host = this.HOST;
    var url = this.url(authorization, date, host);
    Log.log('url->' + url);
  }

  getUrl(): string {
    var date = this.date(); // 'Fri, 05 May 2023 10:43:39 GMT' ; //
    var authorization = this.authorization(date);
    var host = this.HOST;
    var url = this.url(authorization, date, host);
    Log.log('url->' + url);
    // let uri = encodeURIComponent(url)
    return url;
  }
}

class WebSocketHelper {
  register(defaultIpAddress: string) {
    let ws = webSocket.createWebSocket();
    Log.log('defaultIpAddress: ' + defaultIpAddress);
    ws.on('open', (err, value) => {
      Log.log("on open, status:" + JSON.stringify(value));
      // 当收到on('open')事件时，可以通过send()方法与服务器进行通信
      let v = '{"header":{"app_id":"6d73e094","uid":"12345ddd"},"parameter":{"chat":{"domain":"general","temperature":1,"max_tokens":1024}},"payload":{"message":{"text":[{"role":"user","content":"怎样学习鸿蒙开发"}]}}}'

      ws.send(v, (err, value) => {
        if (!err) {
          Log.log("Message sent successfully");
        } else {
          Log.log("Failed to send the message. Err:" + JSON.stringify(err));
        }
      });
    });
    ws.on('message', (err, value) => {
      Log.log("on message, message:" + value);
      // 当收到服务器的`bye`消息时（此消息字段仅为示意，具体字段需要与服务器协商），主动断开连接
      if (value === 'bye') {
        ws.close((err, value) => {
          if (!err) {
            Log.log("Connection closed successfully");
          } else {
            Log.log("Failed to close the connection. Err: " + JSON.stringify(err));
          }
        });
      }
    });
    ws.on('close', (err, value) => {
      Log.log("on close, code is " + value.code + ", reason is " + value.reason);
    });
    ws.on('error', (err) => {
      Log.log("on error, error:" + JSON.stringify(err));
    });
    ws.connect(defaultIpAddress, (err, value) => {
      if (!err) {
        Log.log("Connected successfully Err:" + JSON.stringify(err) + " , value: " + JSON.stringify(value));
      } else {
        Log.log("Connection failed. Err:" + JSON.stringify(err) + " , value: " + JSON.stringify(value));
      }
    });
  }

  // 日志
  // on open, status:{"status":101,"message":""}
  // Message sent successfully
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":0},"payload":{"choices":{"status":0,"seq":0,"text":[{"content":"您","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":1},"payload":{"choices":{"status":1,"seq":1,"text":[{"content":"可以通过以下","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":1},"payload":{"choices":{"status":1,"seq":2,"text":[{"content":"方式学习鸿","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":1},"payload":{"choices":{"status":1,"seq":3,"text":[{"content":"蒙开发：\n","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":1},"payload":{"choices":{"status":1,"seq":4,"text":[{"content":"\n1. 阅读华为官网提供的开发者文档、API参考、示例代码、Codelabs、视频教程等。这些资料可以帮助您快速掌握HarmonyOS应用开发的基础知识和技能。\n\n2.","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":1},"payload":{"choices":{"status":1,"seq":5,"text":[{"content":" 观看HarmonyOS第一课，这是一个提供ArkTS语言声明式开发范式的应用开发视频教程，适合无经验和有经验的开发者学习。课程涵盖了应用程序框架、 ArkUI、 ArkUI之属性动画、从简单页面开始到实践课等多个主题。\n\n","role":"assistant","index":0}]}}}
  // on message, message:{"header":{"code":0,"message":"Success","sid":"cht000b702a@dx18d6fb9d758b894540","status":2},"payload":{"choices":{"status":2,"seq":6,"text":[{"content":"3. 使用DevEco Studio进行开发，这是华为官方推荐的开发工具之一。DevEco Studio提供了丰富的开发工具和环境搭建，以及如何使用DevEco Studio开发应用的详细介绍。","role":"assistant","index":0}]},"usage":{"text":{"question_tokens":37,"prompt_tokens":37,"completion_tokens":169,"total_tokens":206}}}}
  // on close, code is 1000, reason is close this ws conn

  test() {
    this.register(params.getUrl());
  }

  send(ws) {
    let v = '{"header":{"app_id":"6d73e094","uid":"12345ddd"},"parameter":{"chat":{"domain":"general","temperature":1,"max_tokens":1024}},"payload":{"message":{"text":[{"role":"user","content":"怎样学习鸿蒙开发"}]}}}'
    ws.send(v, (err, value) => {
      if (!err) {
        Log.log("Message sent successfully. Err:" + JSON.stringify(err) + ', ' + JSON.stringify(value));
      } else {
        Log.log("Failed to send the message. Err:" + JSON.stringify(err) + ', ' + JSON.stringify(value));
      }
    });
  }

  close() {
    // this.ws.close((err, value) => {
    //   if (!err) {
    //     Log.log("Connection closed successfully");
    //   } else {
    //     Log.log("Failed to close the connection. Err: " + JSON.stringify(err));
    //   }
    // });
  }


  testConnect() {
    // let promise = this.ws.connect('192.168.0.12:8181')
    // promise.then(() => {
    //   promptAction.showToast({ message: 'connect success！', duration: 1500 })
    // }).catch((err: Error) => {
    //   promptAction.showToast({ message: `connect fail, error:${JSON.stringify(err)}`, duration: 1500 })
    // })
    // this.ws.on('open', () => {
    //   promptAction.showToast({ message: '连接成功,可以聊天了！', duration: 1500 })
    //   this.send()
    // })
    // this.ws.on('message', (err: Error, value: Object) => {
    //   Log.info(`on message, value = ${value}`)
    //   promptAction.showToast({ message: JSON.stringify(value), duration: 1500 })
    //   //this.close()
    // })
  }
}

const params = new Params();
const webSocketHelper = new WebSocketHelper()

export default webSocketHelper as WebSocketHelper