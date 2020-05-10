import {Component} from '@angular/core';
import {MessagingService} from '../../../service/messaging.service';
import {MessageModel} from '../../../shared/model/message.model';
import {ContactModel} from '../../../shared/model/contact.model';
import {ContactService} from '../../../service/contact.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {MessageService} from '../../../service/message.service';
import {CallSignalingService} from '../../../service/rtc/call-signaling.service';
import {CallWebRTCService} from '../../../service/rtc/call-webrtc.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  optionsPaneExpanded = false;
  newContactModalVisible = false;

  contact: ContactModel;
  messages: Map<number, MessageModel> = new Map<number, MessageModel>();

  constructor(private auth: AuthenticationService,
              private chatService: MessagingService,
              private contactService: ContactService,
              private messageService: MessageService,
              private callSignalingService: CallSignalingService,
              private callWebRTCService: CallWebRTCService) {
    this.contact = this.contactService.getSelectedContact();

    if (this.contact !== null) {
      this.fetchMessagesByContact(this.contact);
    }

    this.contactService.getSelectedContactSubject().subscribe(contact => {
      this.contact = contact;
      this.subscribeToMessagesFromSelectedContact();
      this.fetchMessagesByContact(contact);
    });
  }

  // TODO: Test
  public send() {
    this.callWebRTCService.send('hi');
  }

  // TODO: Test
  public makeCall() {
    this.callWebRTCService.setupSignalingServer();
    this.callWebRTCService.setupPeerServer();
    this.callWebRTCService.createOffer();
  }


  private fetchMessagesByContact(contact: ContactModel) {
    this.messageService.getMessagesByContact(contact, 0).subscribe(messages => {
      this.messages = messages;
    });
  }

  public getMessages() {
    return Array.from(this.messages.values());
  }

  public messageStatusIconClass(m: MessageModel): string {
    if (m.seen) {
      return 'fas fa-circle';
    } else if (m.received) {
      return 'far fa-circle';
    } else if (m.sent) {
      return 'fas fa-circle-notch';
    }
  }

  private subscribeToMessagesFromSelectedContact() {
    this.chatService.getMessagesObservable().subscribe(message => {
      this.messages.set(message.sentTimestamp, message);
      if (message.sendTo === this.auth.getPrincipal()) {
        this.chatService.sendReceiveEvent(message);
      }
    });

    this.chatService.getMessageSentObservable().subscribe(message => this.messages.set(
      message.sentTimestamp, message
    ));

    this.chatService.getMessageReceivedObservable().subscribe(message => this.messages.set(
      message.sentTimestamp, message
    ));

    this.chatService.getMessageSeenObservable().subscribe(message => this.messages.set(
      message.sentTimestamp, message
    ));
  }
}
