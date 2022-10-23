export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  public getErrors() {
    return this.errors;
  }

  public addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public messages(context?: string) {
    if (context) {
      return this.errors
        .filter((error) => error.context === context)
        .map((error) => `${context}: ${error.message}`)
        .join(",");
    }

    return this.errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(",");
  }
}
