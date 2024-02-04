import http from '@ohos.net.http'
import Log from '../../utils/LogUtils';

export class HttpHelper {
  question(msg: string, onMessage: (text: string) => void, onOpen: () => void, onClose: () => void) {
    let headers = {
      "Authorization":"Bearer sk-129390f5e4e34ce7a6f63ef650891cf4",
      "Content-Type": "application/json"
    }
    let body = {
      "model": "qwen-turbo",
      "input": {
        "messages": [
          // {
          //   "role": "system",
          //   "content": "You are a helpful assistant."
          // },
          {
            "role": "user",
            "content": msg
          }
        ]
      },
      "parameters": {}
    }
    let httpRequest = http.createHttp();
    onOpen()
    httpRequest
      .request(
        'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        {
          method: http.RequestMethod.POST,
          header: headers,
          extraData: body
        }
      )
      .then((resp: http.HttpResponse) => {
        // {"output":{"finish_reason":"stop","text":"为了提供准确的信息，我需要知道您所在的位置。请告诉我在哪个城市或地区，以及您的大致经纬度坐标，或者附近明显的地标。"},"usage":{"total_tokens":46,"output_tokens":32,"input_tokens":14},"request_id":"b1f59977-6634-9e6f-a123-bbfde5f88094"}
        Log.log('resp => ' + Log.log(JSON.stringify(resp)));
        if (resp.responseCode === 200) {
          let data = JSON.parse(resp.result as string)
          onMessage(data.output.text)
        }
        onClose()
      })
      .catch((err: Error) => {
        Log.log('err => ' + JSON.stringify(err))
        onClose()
      });
  }
}