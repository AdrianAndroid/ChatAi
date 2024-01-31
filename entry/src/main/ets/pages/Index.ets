import webSocketHelper from '../platform/spark/WebSocketHelper'
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button('测试')
          .width('100%')
          .onClick((ev) => {
            webSocketHelper.test()
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}