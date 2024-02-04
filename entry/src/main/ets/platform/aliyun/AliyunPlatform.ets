import { Platform } from '../Platform';
import { HttpHelper } from './HttpHelper';

export class AliyunPlatform extends Platform {
  question(msg: string, onMessage: (text: string) => void, onOpen: () => void, onClose: () => void) {
    let http = new HttpHelper()
    http.question(msg, onMessage, onOpen, onClose)
  }
}