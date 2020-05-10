import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import {ContactModel} from '../../shared/model/contact.model';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  public loading = true;
  public contactsSidebarExpanded = true;

  public contacts: ContactModel[] = [];

  constructor(private contactService: ContactService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.loading = false;
      this.contacts = contacts;
    });
  }

  public selectContact(contact: ContactModel) {
    this.contactService.setSelectedContact(contact);
  }
}
