import { ALL_PERCENT } from '../common/CommonConstants'
import Log from '../utils/LogUtils'

@Preview
@Component
export default struct SendMessage {
  @Link message: string
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
        .width(100)
        .onClick(() => {
          Log.log('send')
          this.sendMessage()
        })
    }
    .height(70)
    .width(ALL_PERCENT)
  }
}