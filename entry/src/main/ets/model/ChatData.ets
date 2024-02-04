export default class ChatData {
  public message: string
  public isServer: Boolean

  constructor(message: string, isServer: Boolean) {
    this.message = message;
    this.isServer = isServer;
  }

}