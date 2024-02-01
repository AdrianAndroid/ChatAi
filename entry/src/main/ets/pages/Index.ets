import webSocketHelper from '../platform/spark/WebSocketHelper'
import ChatsPage from '../view/ChatsPage'
import SendMessage from '../view/SendMessage'
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        ChatsPage()
        SendMessage()
      }
      .width('100%')
    }
    .height('100%')
  }
}