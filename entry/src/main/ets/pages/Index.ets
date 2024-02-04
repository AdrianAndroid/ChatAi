import webSocket from '@ohos.net.webSocket'
import promptAction from '@ohos.promptAction'
import ChatData from '../model/ChatData'
import { WebSocketSource } from '../model/DataSource'
import { Platform } from '../platform/Platform'
import { PlatformHelper } from '../platform/PlatformHelper'
import { SparkPlatform } from '../platform/spark/SparkPlatform'
import webSocketHelper from '../platform/spark/WebSocketHelper'
import Log from '../utils/LogUtils'
import textHelper from '../utils/TextHelper'
import toast from '../utils/Toast'
import ChatsPage from '../view/ChatsPage'
import SendMessage from '../view/SendMessage'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State chatData: ChatData = new ChatData('', true)
  @State chats: WebSocketSource = new WebSocketSource([])
  @State loading: boolean = false

  sendMessage() {
    if (textHelper.isStringEmpty(this.message)) {
      toast.showToast('输入内容不能为空!')
      return;
    }
    // 发送之前,先保存上次的数据
    let lastServerChat = this.chats.pop();
    if (lastServerChat as ChatData) {
      this.chats.pushData(new ChatData(lastServerChat.message, true))
      this.chatData.message = ''
    }
    this.chats.pushData(new ChatData(this.message, false))
    this.chats.pushData(this.chatData)
    PlatformHelper.createPlatform().question(this.message, this.onMessage.bind(this), this.onOpen.bind(this), this.onClose.bind(this))
    this.message = '';
  }
  // 水浒传中108单八将,每个人的名字
  onOpen(): void {
    toast.showToast('开始回答')
    this.loading = true;
  }

  onClose(): void {
    toast.showToast('回答完毕!')
    this.loading = false;
  }

  onMessage(text: string): void {
    Log.log("text -> " + text)
    this.appendAnswer(text + "")
  }

  appendAnswer(appendString: string) {
    this.chatData.message = `${this.chatData.message}${appendString}`
    this.chats.pop()
    this.chats.pushData(this.chatData)
  }

  initData() {
    this.chats.pop();
    this.chats.pushData(new ChatData('111111', false))
    this.chats.pushData(new ChatData('111111', true))
    this.chats.pushData(new ChatData('111111', false))
    this.chats.pushData(this.chatData)
  }

  build() {
    Row() {
      Column() {
        Row() {
          Button('测试')
            .onClick(value => {
              webSocketHelper.test()
            })
          Button('初始化数据')
            .onClick(value => {
              this.initData()
            })
          Button('追加内容')
            .onClick(value => {
              this.appendAnswer('hello');
            })
        }

        ChatsPage({ chats: $chats })
        SendMessage({ loading: $loading, message: $message, sendMessage: () => {
          Log.log(this.message)
          this.sendMessage()
        } })
      }
      .width('100%')
    }
    .height('100%')
  }
}