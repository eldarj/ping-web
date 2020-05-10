import {Component, OnInit} from '@angular/core';
import {MessageModel} from '../../../../shared/model/message.model';
import {MessagingService} from '../../../../service/messaging.service';
import {ContactService} from '../../../../service/contact.service';

@Component({
  selector: 'app-chat-writer',
  templateUrl: './chat-writer.component.html',
  styleUrls: ['./chat-writer.component.scss']
})
export class ChatWriterComponent {
  public messageContent: string;

  constructor(private chatService: MessagingService,
              private contactService: ContactService) {
  }

  public send() {
    this.chatService.sendMessage(MessageModel.toSend(
      this.messageContent, this.contactService.getContactPhoneNumber()
    ));
  }
}
