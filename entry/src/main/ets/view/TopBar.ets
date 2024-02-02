import { ALL_PERCENT } from '../common/CommonConstants'
@Component
export default struct TopBar {
  build() {
    Row() {
      Text($r('app.string.server'))
        .width('20%')
        .fontSize(20)
        .margin({ left: '40%' })
        .textAlign(TextAlign.Center)
    }
    .height(50)
    .width(ALL_PERCENT)
    .backgroundColor('#e5e5e5')
  }
}