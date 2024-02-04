import promptAction from '@ohos.promptAction';

class Toast {
  showToast(msg: string) {
    try {
      promptAction.showToast({ message: msg, duration: 800, });
    } catch (error) {
      console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
    }
    ;
  }
}

const toast = new Toast()

export default toast as Toast