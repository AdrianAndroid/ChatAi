import { ALL_PERCENT } from '../common/CommonConstants'
import Log from '../utils/LogUtils'

@Preview
@Component
export default struct SendMessage {
  @Link message: string
  @Link loading: boolean
  private sendMessage: () => void = () => {
  }

  build() {
    Row() {
      TextArea({ placeholder: this.message, text: this.message })
        .height(50)
        .onChange((value: string) => {
          Log.log(value)
          this.message = value
        })
        .layoutWeight(1)
      Button('Send')
        .enabled(!this.loading)
        .width(100)
        .backgroundColor(this.loading ? '#f1f3f3' : '#0d74ee')
        .onClick(() => {
          Log.log('send')
          this.sendMessage()
        })
    }
    .height(70)
    .width(ALL_PERCENT)
  }
}