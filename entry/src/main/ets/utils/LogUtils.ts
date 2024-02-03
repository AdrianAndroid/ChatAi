import hilog from '@ohos.hilog';

class LogUtils {
  private domain: number = 0x0000
  private prefix: string = '[AILOG]'
  private format: string = '%{public}s, %{public}s'


  debug(...args: any[]) {
    hilog.debug(this.domain, this.prefix, this.format, args)
  }

  info(...args: any[]) {
    hilog.info(this.domain, this.prefix, this.format, args)
  }

  warn(...args: any[]) {
    hilog.warn(this.domain, this.prefix, this.format, args)
  }

  error(...args: any[]) {
    hilog.error(this.domain, this.prefix, this.format, args)
  }

  log(msg: string) {
    hilog.error(0x0000, 'testTag', '%{public}s', msg);
    console.log('testTag => ' + msg);
  }
}


const Log = new LogUtils()

export default Log as LogUtils