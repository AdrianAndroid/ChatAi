import hilog from '@ohos.hilog';

class LogUtils {
  log(msg: string) {
    hilog.info(0x0000, 'testTag', '%{public}s', msg);
  }
}


const Log = new LogUtils()

export default Log as LogUtils