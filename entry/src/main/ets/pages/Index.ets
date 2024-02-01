import webSocketHelper from '../platform/spark/WebSocketHelper'
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Button('测试websocket')
          .onClick(event=>{
            webSocketHelper.testConnect()
          })
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button('测试')
          .width('100%')
          .onClick((ev) => {
            webSocketHelper.test()
          })
        TextInput({text: '输入文本'})
          .backgroundColor('#F0F')
        Button('故宫在哪儿?')
          .onClick(value => {
            webSocketHelper.send()
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}