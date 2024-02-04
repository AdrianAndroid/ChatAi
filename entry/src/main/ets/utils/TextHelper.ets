class TextHelper {
  isStringEmpty(str: string): boolean {
    return str.length === 0 || str.trim().length === 0;
  }
}

const textHelper = new TextHelper()

export default textHelper as TextHelper