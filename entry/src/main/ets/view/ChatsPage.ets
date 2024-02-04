import { ALL_PERCENT } from '../common/CommonConstants';
import ChatData from '../model/ChatData';
import { WebSocketSource } from '../model/DataSource'

@Preview
@Component
export default struct ChatsPage {
  @Link chats: WebSocketSource

  // chats: WebSocketSource = new WebSocketSource([
  //   new ChatData('123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789', false),
  //   new ChatData('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', true),
  //   new ChatData('123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789', false),
  //   new ChatData('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', true),
  //   ]);

  @Builder
  ChatsMessage(name: Resource, message: string, direction: Direction) {
    Row() {
      Text(name)
        .width(40)
        .height(40)
        .padding(5)
        .fontSize(20)
        .borderRadius(20)
        .margin({ left: 10, right: 10 })
        .backgroundColor('#e5e5e5')
        .textAlign(TextAlign.Center)
      Text(message)
        .textOverflow({ overflow: TextOverflow.Clip })
        .padding(10)
        .width('80%')
        // .maxLines(5)
        .fontSize(10)
        .borderRadius(10)
        .alignSelf(ItemAlign.Start)
        .backgroundColor('#ff78dd4d')
    }
    .width(ALL_PERCENT)
    .direction(direction)
    .alignItems(VerticalAlign.Top)
    .margin({top: 5, bottom: 10})
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.chats, (item: ChatData) => {
          ListItem() {
            if (item.isServer as boolean) {
              this.ChatsMessage($r('app.string.server'), item.message, Direction.Ltr)
            } else {
              this.ChatsMessage($r('app.string.me'), item.message, Direction.Rtl)
            }
          }
          .width('100%')
        }, (item: ChatData, index?: number) => item.message + index)
      }.width('100%').height('100%')
    }
    .width('100%')
    .layoutWeight(1)
    .backgroundColor(Color.White)
  }
}