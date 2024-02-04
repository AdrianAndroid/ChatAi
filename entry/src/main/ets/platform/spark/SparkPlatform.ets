import { Platform } from '../Platform';
import webSocketHelper from './WebSocketHelper';
export class SparkPlatform extends Platform{
  question(msg: string, onMessage: (text: string) => void, onOpen: () => void, onClose: () => void) {
    webSocketHelper.question(msg, onMessage, onOpen, onClose)
  }
}