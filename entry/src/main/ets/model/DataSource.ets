import Log from '../utils/LogUtils';
import ChatData from './ChatData';

class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = []

  public totalCount(): number {
    return 0;
  }

  public getData(index: number) {
    throw new Error('Method not implemented.');
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos = this.listeners.indexOf(listener);
    if (pos >= 0) {
      Log.log('remove listener')
      this.listeners.splice(pos, 1);
    }
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      Log.log('add listener')
      this.listeners.push(listener);
    }
  }

  notifyDataReload(): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataReloaded()
    })
  }

  notifyDataAdd(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataAdd(index)
    })
  }

  notifyDataChange(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataChange(index)
    })
  }

  notifyDataDelete(index: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataDelete(index)
    })
  }

  notifyDataMove(from: number, to: number): void {
    this.listeners.forEach((listener: DataChangeListener) => {
      listener.onDataMove(from, to)
    })
  }
}

export class WebSocketSource extends BasicDataSource {
  public chatsData: Array<string | ChatData>

  constructor(chatsData: Array<string|ChatData>) {
    super();
    this.chatsData = chatsData;
  }

  totalCount(): number {
    return this.chatsData.length;
  }

  getData(index: number): string | ChatData {
    return this.chatsData[index];
  }

  addData(index: number, data: string | ChatData): void {
    this.chatsData.splice(index, 0, data)
    this.notifyDataAdd(index)
  }

  pushData(data: string | ChatData): void {
    this.chatsData.push(data)
    this.notifyDataAdd(this.chatsData.length - 1)
  }
}