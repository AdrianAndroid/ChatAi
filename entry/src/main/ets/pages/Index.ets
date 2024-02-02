import ChatData from '../model/ChatData'
import { WebSocketSource } from '../model/DataSource'
import webSocketHelper from '../platform/spark/WebSocketHelper'
import ChatsPage from '../view/ChatsPage'
import SendMessage from '../view/SendMessage'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State chats: WebSocketSource = new WebSocketSource([])

  sendMessage() {
     let sendMessage = new ChatData(this.message, false);
    this.chats.pushData(sendMessage);
    let revMessage =new ChatData('你好', true);
    this.chats.pushData(revMessage)
    this.message = '';
  }

  build() {
    Row() {
      Column() {
        ChatsPage({ chats: $chats })
        SendMessage({ message: $message, sendMessage: () => {
          this.sendMessage()
        } })
      }
      .width('100%')
    }
    .height('100%')
  }
}