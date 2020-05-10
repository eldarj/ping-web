export class MessageModel {
  public id: string;
  public text: string;
  public sentFrom: string;
  public sendTo: string;

  public sent: boolean;
  public received: boolean;
  public seen: boolean;

  public sentTimestamp: any;

  public static toSend(text: string, sendTo: string): MessageModel {
    const message = new MessageModel();

    message.text = text;
    message.sendTo = sendTo;

    message.sent = false;
    message.received = false;
    message.seen = false;
    message.sentTimestamp = Date.now() / 1000; // epoch millis to epoch seconds because java's Instant serializes to/from epoch seconds

    return message;
  }
}
