import { ALL_PERCENT } from '../common/CommonConstants'
import Log from '../utils/LogUtils'

@Preview
@Component
export default struct SendMessage {
  build() {
    Row() {
      TextArea({ placeholder: 'hello', text: 'hello' })
        .height(50)
        .onChange((value: string) => {
          Log.log(value)
        })
        .layoutWeight(1)
      Button('Send')
        .width(100)
        .onClick(()=>{
          Log.log('send')
        })
    }
    .height(70)
    .width(ALL_PERCENT)
  }
}