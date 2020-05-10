import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {RxStomp} from '@stomp/rx-stomp';
import {MessageModel} from '../../shared/model/message.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly rxStomp: RxStomp;

  private messagesSubscription: Subscription;
  private sentSubscription: Subscription;
  private receivedSubscription: Subscription;
  private seenSubscription: Subscription;

  private messagesSubject = new Subject<any>();
  private receivedSubject = new Subject<any>();
  private sentSubject = new Subject<any>();
  private seenSubject = new Subject<any>();

  constructor(private authenticationService: AuthenticationService) {
    this.rxStomp = new RxStomp();

    this.rxStomp.configure({
      brokerURL: 'ws:' + '//' + location.hostname + ':' + 8089 + '/ws/connect',
      reconnectDelay: 5000
    });

    this.rxStomp.activate();
  }

  public send(headers: any, body: any) {
    this.rxStomp.publish({
      destination: '/ws/message', body: JSON.stringify(body)
    });
  }

  public sendReceiveEvent(body: any) {
    this.rxStomp.publish({
      destination: '/ws/message/received', body: JSON.stringify(body)
    });
  }

  public sendSeenEvent(body: any) {
    this.rxStomp.publish({
      destination: '/ws/message/seen', body: JSON.stringify(body)
    });
  }

  public getMessageSubject(): Subject<MessageModel> {
    const principal = this.authenticationService.getPrincipal();

    if (this.messagesSubscription === null || this.messagesSubscription === undefined) {
      this.messagesSubscription = this.rxStomp.watch(`/ws/message/${principal}`)
        .subscribe(response => {
          const message: MessageModel = JSON.parse(response.body);
          message.sentTimestamp = Date.parse(message.sentTimestamp) / 1000;
          this.messagesSubject.next(message);
        });
    }

    return this.messagesSubject;
  }

  public getMessageSentSubject(): Subject<MessageModel> {
    const principal = this.authenticationService.getPrincipal();

    if (this.sentSubscription === null || this.sentSubscription === undefined) {
      this.sentSubscription = this.rxStomp.watch(`/ws/message/sent/${principal}`)
        .subscribe(response => {
          const message: MessageModel = JSON.parse(response.body);
          message.sentTimestamp = Date.parse(message.sentTimestamp) / 1000;
          this.sentSubject.next(message);
        });
    }

    return this.sentSubject;
  }

  public getMessageReceivedSubject(): Subject<MessageModel> {
    const principal = this.authenticationService.getPrincipal();

    if (this.receivedSubscription === null || this.receivedSubscription === undefined) {
      this.receivedSubscription = this.rxStomp.watch(`/ws/message/received/${principal}`)
        .subscribe(response => {
          const message: MessageModel = JSON.parse(response.body);
          message.sentTimestamp = Date.parse(message.sentTimestamp) / 1000;
          this.receivedSubject.next(message);
        });
    }

    return this.receivedSubject;
  }

  public getMessageSeenSubject(): Subject<MessageModel> {
    const principal = this.authenticationService.getPrincipal();

    if (this.seenSubscription === null || this.seenSubscription === undefined) {
      this.seenSubscription = this.rxStomp.watch(`/ws/message/seen/${principal}`)
        .subscribe(response => {
          const message: MessageModel = JSON.parse(response.body);
          message.sentTimestamp = Date.parse(message.sentTimestamp) / 1000;
          this.seenSubject.next(message);
        });
    }

    return this.seenSubject;
  }
}
