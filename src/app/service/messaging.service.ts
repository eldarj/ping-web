import {Injectable, OnDestroy} from '@angular/core';
import {MessageModel} from '../shared/model/message.model';
import {SocketService} from './ws/socket.service';
import {Observable, Subject} from 'rxjs';
import {ContactModel} from '../shared/model/contact.model';

@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnDestroy {
  private messageSubject: Subject<MessageModel> = undefined;
  private sentSubject: Subject<MessageModel> = undefined;
  private receivedSubject: Subject<MessageModel> = undefined;
  private seenSubject: Subject<MessageModel> = undefined;

  constructor(private socketService: SocketService) {
    this.messageSubject = this.socketService.getMessageSubject();
    this.sentSubject = this.socketService.getMessageSentSubject();
    this.receivedSubject = this.socketService.getMessageReceivedSubject();
    this.seenSubject = this.socketService.getMessageSeenSubject();
  }

  ngOnDestroy(): void {
    this.messageSubject.unsubscribe();
    this.sentSubject.unsubscribe();
    this.receivedSubject.unsubscribe();
    this.seenSubject.unsubscribe();
  }

  public sendMessage(message: MessageModel) {
    this.messageSubject.next(message);
    this.socketService.send({}, message);
  }

  public sendReceiveEvent(message: MessageModel) {
    this.socketService.sendReceiveEvent(message);
  }

  public getMessagesObservable(): Observable<MessageModel> {
    return this.messageSubject;
  }

  public getMessageSentObservable(): Observable<MessageModel> {
    return this.sentSubject;
  }

  public getMessageReceivedObservable(): Observable<MessageModel> {
    return this.receivedSubject;
  }

  public getMessageSeenObservable(): Observable<MessageModel> {
    return this.receivedSubject;
    // return this.seenSubject.pipe(
    //   filter(message => sentFromFilter === message.sentFrom)
    // );
  }
}
