import { AliyunPlatform } from './aliyun/AliyunPlatform'
import { Platform } from './Platform'
export class PlatformHelper {
  public static createPlatform(): Platform {
    return new AliyunPlatform()
  }
}