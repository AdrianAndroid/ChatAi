import hilog from '@ohos.hilog';

class LogUtils {
  log(msg: string) {
    hilog.info(0x0000, 'testTag', '%{public}s', msg);
  }
}


const log = new LogUtils()

export default log as LogUtils